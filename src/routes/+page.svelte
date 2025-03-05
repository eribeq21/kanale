<script>
    import { onMount } from 'svelte';
    import "../app.css";

    let channels = [
        "Top Channel", "Filma Aksion", "Filma Drame", "Filma Fantastik", "Comedy Club", "Horror Nights",
        "Sci-Fi World", "Classic Movies", "Kids Zone", "Documentaries", "Reality Shows", "Sports Hub",
        "Music Vibes", "Travel & Adventure", "Anime Kingdom", "Crime & Mystery", "Romantic Hits", "Bollywood Fever",
        "Hollywood Hits", "War & History", "Short Films", "Stand-up Comedy", "Cooking Shows", "Tech & Science",
        "Wildlife & Nature", "Fashion & Lifestyle", "Gamer's Paradise", "E-Sports Arena", "K-Drama Universe",
        "Turkish Series", "Spanish Telenovelas", "Indie Films", "Festival Movies", "Black & White Classics",
        "Superhero Zone", "Thriller Time", "Fantasy World", "Biographies & Legends", "Talk Shows", "Daily News",
        "Fitness & Yoga", "Motivational Talks", "DIY & Craft", "Business & Finance", "Paranormal & Myths",
        "Space & Astronomy", "History Uncovered", "Art & Culture", "Live Concerts", "Celebrity Gossip"
    ];

    onMount(() => {
        console.log("UltraOTT page loaded.");
    });
</script>

<div class="min-h-screen bg-gray-900 text-white w-full font-sans">
    <!-- Hero Section -->
    <div class="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center shadow-lg overflow-hidden">
        <!-- Animated Gradient Background -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 animate-gradient-x"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        <h1 class="relative z-10 text-5xl font-extrabold uppercase tracking-wider drop-shadow-lg text-white">Welcome to UltraOTT!</h1>
    </div>

    <!-- Channel Categories -->
    <div class="px-8 py-20 max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold mb-12 text-center text-white tracking-wide">Explore Channels</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {#each channels as channel}
                <a href= "/top_chaneel" 
                   class="relative group overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <!-- Channel Thumbnail -->
                    <div class="w-full h-56 bg-cover bg-center rounded-2xl"></div>
                    <!-- Overlay with Text -->
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:bg-opacity-60">
                        <h3 class="text-lg font-semibold text-white text-center z-10 transform transition-all duration-300 group-hover:scale-110">{channel}</h3>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>

<style>
    /* Add a custom animation for the gradient background */
    @keyframes gradient-x {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 10s ease infinite;
    }
</style>