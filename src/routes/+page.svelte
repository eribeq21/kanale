<script>
    import { onMount } from 'svelte';
    import Hls from 'hls.js';

    let videoElement;
    let streamURL = "https://spt.securedirect.org/skyatlantic/index.m3u8";
    let isFullscreen = false;
    let isHovered = false;
    let isMuted = true;

    function toggleFullscreen() {
        if (videoElement) {
            if (isFullscreen) {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (videoElement.webkitExitFullscreen) { // iOS special case
                    videoElement.webkitExitFullscreen();
                }
            } else {
                // Enter fullscreen
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if (videoElement.webkitRequestFullscreen) {
                    videoElement.webkitRequestFullscreen();
                } else if (videoElement.webkitEnterFullscreen) { // iOS Safari
                    videoElement.webkitEnterFullscreen();
                }
            }
        }
    }

    function unmute() {
        videoElement.muted = false;
        isMuted = false;
    }

    onMount(() => {
        const hls = new Hls();
        if (videoElement && Hls.isSupported()) {
            hls.loadSource(streamURL);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.muted = true; 
                setTimeout(() => {
                    videoElement.play().catch(err => console.error("Autoplay failed:", err));
                }, 500);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS.js error:", data);
            });
        } else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = streamURL;
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.muted = true;
                setTimeout(() => {
                    videoElement.play().catch(err => console.error("Autoplay failed:", err));
                }, 500);
            });
        }

        document.addEventListener('fullscreenchange', () => {
            isFullscreen = !!document.fullscreenElement;
        });

        document.addEventListener('webkitfullscreenchange', () => {
            isFullscreen = !!document.webkitFullscreenElement;
        });

        videoElement.addEventListener('webkitbeginfullscreen', () => {
            isFullscreen = true;
        });

        videoElement.addEventListener('webkitendfullscreen', () => {
            isFullscreen = false;
        });
    });
</script>

<div class="video-container" onmouseenter={() => isHovered = true} onmouseleave={() => isHovered = false} onclick={unmute}>
    <video bind:this={videoElement} autoplay playsinline disablePictureInPicture oncontextmenu={(e) => e.preventDefault()}></video>
    <div class="live-badge" class:show-live={isHovered}>LIVE 🔴</div>
    {#if isHovered && isFullscreen}
        <button class="fullscreen-btn" onclick={toggleFullscreen}>⛶ Exit Fullscreen</button>
    {:else}
        <button class="fullscreen-btn" onclick={toggleFullscreen}>⛶ Fullscreen</button>
    {/if}
</div>

<style>
    .video-container {
        position: relative;
        width: 100%;
        max-width: 800px;
        margin: auto;
    }

    video {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .live-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background: red;
        color: white;
        padding: 5px 10px;
        font-weight: bold;
        font-size: 14px;
        border-radius: 5px;
        display: none;
    }

    .live-badge.show-live {
        display: block;
    }

    .fullscreen-btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 5px;
    }

    .fullscreen-btn:hover {
        background: rgba(0, 0, 0, 0.9);
    }
</style>
