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

 <!-- Modern Channel Categories -->
<div class="py-12 px-4 md:px-6 w-full max-w-6xl">
    <div class="grid grid-cols-3 gap-4 md:gap-6">
        {#each channels as channel}
        <div class="relative group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center p-4 md:p-6">

            <!-- Category Name -->
            <div class="w-full h-full flex items-center justify-center bg-gray-100 transition-opacity duration-300 group-hover:opacity-0">
                <h3 class="text-base md:text-xl font-semibold text-gray-800 tracking-wide text-center">{channel}</h3>
            </div>
            
            <!-- Watch Now Button -->
            <div class="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <a href="/top_channel" class="bg-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-full text-white font-medium hover:bg-blue-700 shadow-md">Watch Now</a>
            </div>
        </div>
        {/each}
    </div>
</div>

</div>