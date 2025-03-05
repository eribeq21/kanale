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


<a href="/">Back to Home</a>

<style>
    h1 {
        color: #ff6f61;
        text-align: center;
        margin-top: 50px;
    }
    a {
        display: block;
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        color: #007bff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
        color:#ff6f61
    }
</style>
