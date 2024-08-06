<script>
  import Header from '../components/Header.svelte';
  import Inbox from '../components/Inbox.svelte';
  import { theme } from '../store/store.js';
  import { onMount } from 'svelte';

  export let emails = [];
  let errorMessage = '';

  async function handleAnalyzeEmails() {
    try {
      const response = await fetch('/api/run_script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ scriptName: 'analyze_emails.py' })
      });

      const result = await response.json();

      if (response.ok) {
        window.location.reload(); 
      } else {
        errorMessage = result.message;
      }
    } catch (error) {
      errorMessage = error.message;
    }
  }

  onMount(() => {
    if (typeof document !== 'undefined') {
      if ($theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
</script>

<main class="contenedor bg-white dark:bg-[#222222] text-black dark:text-white">
  <Header />
  <section class="inbox-container flex-grow overflow-hidden p-3">
    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
    <Inbox {emails} {handleAnalyzeEmails}/>
  </section>
</main>

<style>
  .contenedor {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .inbox-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;
  }
</style>
