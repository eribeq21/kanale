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
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (videoElement.webkitExitFullscreen) {
                    videoElement.webkitExitFullscreen();
                }
            } else {
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if (videoElement.webkitRequestFullscreen) {
                    videoElement.webkitRequestFullscreen();
                } else if (videoElement.webkitEnterFullscreen) {
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
    });
</script>

<div class="video-container" onmouseenter={() => isHovered = true} onmouseleave={() => isHovered = false} onclick={unmute}>
    <video bind:this={videoElement} autoplay playsinline disablePictureInPicture oncontextmenu={(e) => e.preventDefault()}></video>
    <div class="live-badge" class:show-live={isHovered}>LIVE 🔴</div>
    <button class="fullscreen-btn" onclick={toggleFullscreen}>{isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}</button>
</div>

<style>
    :global(body) {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: #f0f0f0;
    }

    .video-container {
        position: relative;
        width: 100%;
        max-width: 800px;
        margin: auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        background: #000;
    }

    video {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 12px;
    }

    .live-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgb(161, 83, 83);
        color: white;
        padding: 6px 12px;
        font-weight: bold;
        font-size: 14px;
        border-radius: 5px;
        display: none;
    }

    .show-live {
        display: block;
    }

    .fullscreen-btn {
        position: absolute;
        bottom: 15px;
        right: 15px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 8px;
        transition: background 0.3s;
    }

    .fullscreen-btn:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    /* Mobile Responsive */
    @media (max-width: 600px) {
        .video-container {
            max-width: 100%;
            border-radius: 0;
        }

        .fullscreen-btn {
            padding: 8px 12px;
            font-size: 12px;
        }

        .live-badge {
            font-size: 10px;
            padding: 4px 8px;
        }
    }

    /* Additional Styling for Shadows */
    .video-container {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }

    .fullscreen-btn {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    }

    .fullscreen-btn:hover {
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
    }
</style>
