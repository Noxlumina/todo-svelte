<script>
    import { goto } from "$app/navigation";
    import { darkMode } from "$lib/store";
    import { onMount } from "svelte";
    
 // Rediriger vers /todo après le chargement de la page
 onMount(() => {
    if (location.pathname === '/') {
      goto('/todo');
    }
  });
  </script>
  
    <div class="title"><h1>Redirection en cours</h1></div>
  
  
  
  
  