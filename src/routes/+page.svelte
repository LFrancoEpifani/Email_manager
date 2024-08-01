<script>
  import Header from '../components/Header.svelte';
  import Inbox from '../components/Inbox.svelte';
  import { theme } from '../store/store.js';
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    if (typeof document !== 'undefined') {
      if ($theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

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

<main class="min-h-screen bg-[#f3f3f3] dark:bg-[#0a2b4b] text-black dark:text-white contenedor">
  <Header/>
  <section class="p-4 h-full">
    <Inbox {data} />
  </section>
</main>
