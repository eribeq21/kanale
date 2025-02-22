<script>
    import { onMount } from 'svelte';
    import Hls from 'hls.js';

    let videoElement;
    let streamURL = "http://spt.securedirect.org/skyatlantic/index.m3u8";
    let isFullscreen = false;
    let isHovered = false;

    function toggleFullscreen() {
        if (videoElement) {
            if (!isFullscreen) {
                videoElement.requestFullscreen().catch(err => console.error("Fullscreen error:", err));
            } else {
                document.exitFullscreen();
            }
        }
    }

    onMount(() => {
        if (videoElement && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamURL);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play().catch(err => console.error("Autoplay failed:", err));
            });

            hls.on(Hls.Events.BUFFER_EOS, () => {
                videoElement.currentTime = videoElement.duration;
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS error:", data);
            });
        } else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = streamURL;
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.play().catch(err => console.error("Autoplay failed:", err));
            });
        }

        document.addEventListener('fullscreenchange', () => {
            isFullscreen = !!document.fullscreenElement;
        });
    });
</script>

<div class="video-container" onmouseenter={() => isHovered = true} onmouseleave={() => isHovered = false}>
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
    max-width: 100%;  
    margin: auto;  
    overflow: hidden;  
    border-radius: 10px; /* Rounded corners for a softer look */  
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */  
    background: rgba(0, 0, 0, 0.8); /* Dark background for contrast */  
}  

video {  
    width: 100%;  
    height: auto;  
    object-fit: cover;  
    pointer-events: none;  
    border-radius: 10px; /* Match the container's border radius */  
}  

.live-badge {  
    position: absolute;  
    top: 10px;  
    left: 10px;  
    background: rgba(255, 0, 0, 0.85); /* Slightly more opaque */  
    color: white;  
    padding: 8px 12px; /* Increased padding for a better touch target */  
    font-weight: bold;  
    font-size: 16px; /* Slightly larger font for visibility */  
    border-radius: 5px;  
    opacity: 0;  
    transition: opacity 0.3s, transform 0.3s; /* Add transform for a smoother effect */  
}  

.live-badge.show-live {  
    opacity: 1;  
    transform: scale(1.1); /* Slightly scale up when visible */  
}  

.fullscreen-btn {  
    position: absolute;  
    bottom: 15px;  
    right: 15px;  
    background: rgba(0, 0, 0, 0.85); /* Darker button for contrast */  
    color: white;  
    border: none;  
    padding: 10px 15px; /* Increased padding for better touch target */  
    cursor: pointer;  
    font-size: 16px; /* Larger font for readability */  
    border-radius: 5px;  
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */  
    transition: background 0.3s, transform 0.3s; /* Smooth transition for hover effect */  
}  

.fullscreen-btn:hover {  
    background: rgba(0, 0, 0, 0.95);  
    transform: scale(1.05); /* Slightly scale up on hover */  
}  

/* Hover effect */  
.video-container:hover .live-badge {  
    opacity: 1;  
}  

/* Mobile styles */  
@media (max-width: 768px) {  
    .fullscreen-btn {  
        font-size: 14px; /* Adjusted for better readability */  
        padding: 8px 12px; /* Adjusted padding */  
    }  

    .live-badge {  
        font-size: 14px; /* Adjusted for better readability */  
        top: 12px; /* Slightly adjusted position */  
        left: 12px; /* Slightly adjusted position */  
        padding: 6px 10px; /* Adjusted padding */  
    }  
}  

/* Small mobile devices */  
@media (max-width: 480px) {  
    .fullscreen-btn {  
        font-size: 12px; /* Smaller font for small devices */  
        padding: 6px 10px; /* Adjusted padding */  
    }  

    .live-badge {  
        font-size: 12px; /* Smaller font for small devices */  
        top: 8px; /* Adjusted position */  
        left: 8px; /* Adjusted position */  
        padding: 4px 8px; /* Adjusted padding */  
    }  
}
</style>