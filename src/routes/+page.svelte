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

<div class="w-full min-h-screen bg-gray-900 text-white p-4">
    <!-- Hero Section (Hidden on Mobile) -->
    <div class="hidden md:flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 h-64 rounded-lg shadow-lg p-6">
        <div class="text-center">
            <h1 class="text-4xl font-bold">UltraOTT</h1>
            <p class="text-lg text-gray-200">Your gateway to unlimited entertainment.</p>
        </div>
    </div>

    <!-- Channel Categories -->
    <div class="mt-6">
        <div class="grid grid-cols-3 gap-1 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {#each channels as channel}
            <div class="bg-gray-800 p-2 sm:p-4 rounded-lg shadow-md flex flex-col items-center">
                <h3 class="text-xs sm:text-lg font-semibold mb-1 sm:mb-2">{channel}</h3>
            </div>
            {/each}
        </div>
    </div>
</div>
