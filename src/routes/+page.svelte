<script>
    import { onMount } from 'svelte';
    import Hls from 'hls.js';

    let videoElement;
    let streamURL = "";
    let isFullscreen = false;
    let isHovered = false;
    let isMuted = true;
    let hls;

    async function fetchStreamLink() {
        try {
            const response = await fetch('/api/stream-link');
            const data = await response.json();

            if (data.link) {
                streamURL = data.link;
                console.log("✅ Stream URL:", streamURL);
                initializeHLS();
            } else {
                console.error("❌ No valid stream link received.");
            }
        } catch (error) {
            console.error("❌ Failed to fetch stream link:", error);
        }
    }

    function initializeHLS() {
        if (!streamURL || !videoElement) return;

        if (hls) hls.destroy();

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(streamURL);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.muted = true;
                setTimeout(() => {
                    videoElement.play().catch(err => console.error("Autoplay failed:", err));
                }, 500);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("❌ HLS.js error:", data);
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = streamURL;
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.muted = true;
                setTimeout(() => {
                    videoElement.play().catch(err => console.error("Autoplay failed:", err));
                }, 500);
            });
        } else {
            console.error("❌ HLS is not supported.");
        }
    }

    onMount(() => {
        fetchStreamLink();

        document.addEventListener('fullscreenchange', () => {
            isFullscreen = !!document.fullscreenElement;
        });

        document.addEventListener('webkitfullscreenchange', () => {
            isFullscreen = !!document.webkitFullscreenElement;
        });
    });

    function toggleFullscreen() {
        if (videoElement) {
            if (isFullscreen) {
                document.exitFullscreen?.() || document.webkitExitFullscreen?.();
            } else {
                videoElement.requestFullscreen?.() || videoElement.webkitRequestFullscreen?.();
            }
        }
    }

    function unmute() {
        if (videoElement) {
            videoElement.muted = false;
            isMuted = false;
        }
    }
</script>

<a href="/top_chaneel" class="top-chanel">UltraOTT</a>

<div class="video-container"  onmouseenter={() => isHovered = true} onmouseleave={() => isHovered = false} onclick={unmute}>
    <video bind:this={videoElement} autoplay  playsinline disablePictureInPicture oncontextmenu={(e) => e.preventDefault()}></video>
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
</style>
