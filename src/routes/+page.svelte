<script>
  import Header from '../components/Header.svelte';
  import Inbox from '../components/Inbox.svelte';
import { theme } from '../store/store.js';
  import { onMount } from 'svelte';


  export let data;

  // Asegurarse de aplicar el tema al montar el componente
  onMount(() => {
    if (typeof document !== 'undefined') {
      if ($theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  // Escuchar los cambios en el tema para actualizar la clase
  $: {
    if (typeof document !== 'undefined') {
      if ($theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
</script>

<main class="min-h-screen bg-white dark:bg-[#08243f] text-black dark:text-white">
  <Header/>
  <section class="p-4">
    <Inbox {data} />
  </section>
</main>
