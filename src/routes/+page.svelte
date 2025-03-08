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
        <div class="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-4">
            {#each channels as channel}
                {#if channel === "KOMBËTARE"}
                    <!-- Mobile View (Quadratic Blocks, 3 Columns, Teal-to-Indigo Gradient) -->
                    <a href="/top_chaneel" class="sm:hidden bg-gradient-to-br from-teal-500 to-indigo-600 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center aspect-square transform hover:scale-105 transition-transform duration-300">
                        <h3 class="text-sm font-bold text-white text-center">{channel}</h3>
                    </a>

                    <!-- PC View (Unchanged: Rectangular Blocks, Teal-to-Indigo Gradient, "Explore more" Text) -->
                    <a href="/top_chaneel" class="hidden sm:block bg-gradient-to-br from-teal-500 to-indigo-600 p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center aspect-w-1 aspect-h-1 transform hover:scale-105 transition-transform duration-300">
                        <h3 class="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 text-center">{channel}</h3>
                        <p class="text-xs text-gray-200 text-center">Explore more</p>
                    </a>
                {:else}
                    <!-- Mobile View (Quadratic Blocks, 3 Columns, Teal-to-Indigo Gradient) -->
                    <div class="sm:hidden bg-gradient-to-br from-teal-500 to-indigo-600 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center aspect-square transform hover:scale-105 transition-transform duration-300">
                        <h3 class="text-sm font-bold text-white text-center">{channel}</h3>
                    </div>

                    <!-- PC View (Unchanged: Rectangular Blocks, Teal-to-Indigo Gradient, "Explore more" Text) -->
                    <div class="hidden sm:block bg-gradient-to-br from-teal-500 to-indigo-600 p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center aspect-w-1 aspect-h-1 transform hover:scale-105 transition-transform duration-300">
                        <h3 class="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 text-center">{channel}</h3>
                        <p class="text-xs text-gray-200 text-center">Explore more</p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>