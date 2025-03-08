<script>
    import { onMount } from 'svelte';
    import "../app.css";

    let channels = [
        "KOMBËTARE", "RTSH TANI", "SPORT", "FILMA", "VOD", "DOKUMENTARË",
        "FËMJË", "MUZIKË", "LOKALE", "WORLD TV", "CRAZY TV", "RADIO FM",
        "MP3 SHQIP", "PORTALE", "INFO"
    ];
    onMount(() => {
        console.log("UltraOTT page loaded.");
    });
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-700 to-indigo-900 text-white font-sans flex flex-col items-center">
    <!-- Hero Section -->
<div class="relative w-full h-[300px] md:h-[500px] flex items-center justify-center text-center hidden md:block">
    <div class="absolute inset-0 bg-cover bg-center"></div>
    <div class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-4 md:px-6 rounded-lg shadow-lg">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg">UltraOTT</h1>
        <p class="mt-2 md:mt-4 text-base md:text-lg text-gray-300 max-w-xl">Your gateway to unlimited entertainment.</p>
    </div>
</div>

    
<!-- Channel Categories -->
<div class="py-12 px-4 md:px-6 w-full max-w-6xl">
    <div class="grid grid-cols-3 gap-2 md:gap-8">
        {#each channels as channel}
            <div class="relative group bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-3xl overflow-hidden shadow-xl transition-transform transform hover:scale-105 flex items-center justify-center p-2 md:p-4 aspect-square rounded-2xl">
                <!-- Category Name -->
                <div class="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-0">
                    <h3 class="text-sm md:text-2xl font-semibold text-white tracking-wide text-center">{channel}</h3>
                </div>
                <!-- Watch Now Button -->
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
                    <a href="/top_chaneel" class="bg-pink-500 px-2 py-1 md:px-6 md:py-3 rounded-full text-white font-semibold hover:bg-pink-600 shadow-lg">Watch Now</a>
                </div>
            </div>
        {/each}
    </div>
</div>
</div>