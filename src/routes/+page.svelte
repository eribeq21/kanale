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
        background: linear-gradient(135deg, #1e3c72, #2a5298);
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

    video {
        width: 85%;
        max-width: 800px;
        border-radius: 15px;
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
        background-color: black;
    }

    .controls {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    button {
        font-size: 1.3rem;
        padding: 10px 20px;
        border: none;
        background: linear-gradient(135deg, #ff512f, #dd2476);
        color: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }

    button:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
    }

    button:disabled {
        background: #777;
        cursor: not-allowed;
        box-shadow: none;
    }

    @media (max-width: 600px) {
        video {
            width: 95%;
            max-width: 350px;
        }

        h1 {
            font-size: 2rem;
        }
    }
</style>

<h1>BexhetiLive</h1>

{#if videos.length > 0}
    <video src={videos[currentIndex].url} controls></video>

    <div class="controls">
        <button on:click={prevVideo} disabled={currentIndex === 0}>&lt; Prev</button>
        <button on:click={nextVideo} disabled={currentIndex === videos.length - 1}>Next &gt;</button>
    </div>
{:else}
    <p>Loading videos...</p>
{/if}
