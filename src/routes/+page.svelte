<script>  
    export let data;  
    let videos = data.videos || [];  
    let currentIndex = 0;  

    function nextVideo() {  
        if (currentIndex < videos.length - 1) {  
            currentIndex++;  
        }  
    }  

    function prevVideo() {  
        if (currentIndex > 0) {  
            currentIndex--;  
        }  
    }  
</script>  

<style>  
    :global(body) {  
        display: flex;  
        flex-direction: column;  
        justify-content: center;  
        align-items: center;  
        height: 100vh;  
        margin: 0;  
        background: linear-gradient(135deg, #788bb0, #2a5298);  
        text-align: center;  
        font-family: Arial, sans-serif;  
        color: white;  
    }  

    h1 {  
        font-size: 2.5rem;  
        margin-bottom: 15px;  
        font-weight: bold;  
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);  
    }  

    .video-container {  
        position: relative;  
        width: 85%;  
        max-width: 800px;  
    }  

    video {  
        width: 100%;  
        border-radius: 15px;  
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);  
        background-color: black;  
    }  

    .controls {  
        position: absolute;  
        top: 50%;  
        width: 100%;  
        display: flex;  
        justify-content: space-between;  
        transform: translateY(-50%);  
        opacity: 0;  
        transition: opacity 0.3s ease;  
    }  

    .video-container:hover .controls {  
        opacity: 1;  
    }  

    .control-button {  
        background: rgba(255, 255, 255, 0.7);  
        border: none;  
        border-radius: 50%;  
        width: 40px;  
        height: 40px;  
        cursor: pointer;  
        display: flex;  
        justify-content: center;  
        align-items: center;  
        font-size: 1.5rem;  
        color: black;  
        transition: background 0.3s ease;  
    }  

    .control-button:hover {  
        background: rgba(255, 255, 255, 1);  
    }  

    button:disabled {  
        background: #777;  
        cursor: not-allowed;  
        box-shadow: none;  
    }  

    @media (max-width: 600px) {  
        h1 {  
            font-size: 2rem;  
        }  
    }  
</style>  

<h1>BexhetiLive</h1>  

{#if videos.length > 0}  
    <div class="video-container">  
        <video src={videos[currentIndex].url} controls autoplay></video>  
        <div class="controls">  
            <button class="control-button" on:click={prevVideo} disabled={currentIndex === 0}>&lt;</button>  
            <button class="control-button" on:click={nextVideo} disabled={currentIndex === videos.length - 1}>&gt;</button>  
        </div>  
    </div>  
{:else}  
    <p>Loading videos...</p>  
{/if}