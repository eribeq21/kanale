<script>
    import { onMount } from 'svelte';

    let message = "Welcome to Top Chanel!";

    onMount(() => {
        console.log("Top Chanel page loaded.");
    });
</script>

<h1 class="text-3xl text-center text-red-500 mt-12">{message}</h1>

<a href="/" class="block text-center mt-5 text-lg text-blue-500 hover:underline hover:text-red-500">
    Back to Home
</a>
