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

            console.log("🚀 API Response:", data); // Debugging

            if (data.link) {
                streamURL = data.link;
                console.log("✅ Valid Stream URL:", streamURL);
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

<a href="/"
    class="block w-full text-center text-xl font-extrabold text-white py-4 bg-gradient-to-r from-purple-700 to-indigo-900 shadow-lg transition hover:scale-105 hover:shadow-xl">
    🚀 UltraOTT
</a>

<div role="region" aria-label="Video container" 
     class="relative w-full max-w-4xl mx-auto mt-8 rounded-xl overflow-hidden shadow-2xl bg-black group" 
     onmouseenter={() => isHovered = true} 
     onmouseleave={() => isHovered = false}>

    <video bind:this={videoElement} autoplay playsinline>
        <track kind="captions" src="/captions.vtt" srclang="en" label="English">
    </video>

    <button type="button" onclick={unmute} onkeydown={(e) => e.key === 'Enter' && unmute()} 
        class="absolute inset-0 w-full h-full bg-transparent">
    </button>

    <div class="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-bold rounded-lg shadow-lg 
                transition-opacity duration-300 backdrop-blur-md bg-opacity-80" 
        class:opacity-100={isHovered} class:opacity-0={!isHovered}>
        LIVE 🔴
    </div>

    <button class="absolute bottom-4 right-4 bg-gradient-to-r from-indigo-700 to-purple-900 text-white px-5 py-2 text-sm font-semibold rounded-lg 
                   shadow-md transition transform hover:scale-110 hover:shadow-xl active:scale-95"
        onclick={toggleFullscreen}>
        {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
    </button>
</div>
