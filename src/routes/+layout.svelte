<!-- src/routes/+layout.svelte -->
<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import '../app.css';
  
    // Redirect to the login page on load (client-side)
    onMount(() => {
      goto('/login');
    });
  </script>
  
  
  <!-- Render children here, as part of the layout -->
  <slot />
  