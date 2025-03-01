<script>
    import { onMount } from 'svelte';

    let message = "Welcome to Top Chanel!";

    onMount(() => {
        console.log("Top Chanel page loaded.");
    });
</script>

<h1>{message}</h1>

<a href="/">Back to Home</a>

<style>
    h1 {
        color: #ff6f61;
        text-align: center;
        margin-top: 50px;
    }
    a {
        display: block;
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        color: #007bff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
