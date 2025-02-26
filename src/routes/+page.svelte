<script>
    import { onMount } from 'svelte';
    import Hls from 'hls.js';
    let {data} = $props();
   

        

    let videoElement;
    let streamURL = data.link;
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

<a href="/top_chaneel" class="top-chanel">UltraOTT</a>

<div class="video-container" onmouseenter={() => isHovered = true} onmouseleave={() => isHovered = false} onclick={unmute}>
    <video bind:this={videoElement} autoplay playsinline disablePictureInPicture oncontextmenu={(e) => e.preventDefault()}></video>
    <div class="live-badge" class:show-live={isHovered}>LIVE 🔴</div>
    <button class="fullscreen-btn" onclick={toggleFullscreen}>{isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}</button>
</div>

<style>
    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: #f5f5f5;
        font-family: 'Arial', sans-serif;
    }

    .top-chanel {
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: white;
        text-decoration: none;
        padding: 15px 20px;
        background: #ff6f61;
        border-radius: 0;
        transition: background 0.3s ease, transform 0.2s ease;
    }

    .top-chanel:hover {
        background: #e64a47;
        transform: scale(1.05);
    }

    .video-container {
        position: relative;
        width: 100%;
        max-width: 800px;
        margin: 20px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        background: #000;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .video-container:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
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
        background: rgb(181, 110, 110);
        color: white;
        padding: 8px 15px;
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
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 8px;
        transition: background 0.3s ease;
    }

    .fullscreen-btn:hover {
        background: rgba(0, 0, 0, 0.9);
    }

    @media (max-width: 600px) {
        .top-chanel {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 16px;
            padding: 12px;
            z-index: 1000;
        }

        .video-container {
            margin-top: 60px;
            max-width: 100%;
            border-radius: 8px;
        }
    }
</style>
