<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  onMount(() => {
      if (browser) {
          const sessionExists = document.cookie.includes('session=');
          if (!sessionExists) {
              goto('/login');
          }
      }
  });
</script>
<slot/>