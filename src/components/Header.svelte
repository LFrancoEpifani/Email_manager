<script>
  import { theme } from '../store/store.js';
  
  function toggleTheme() {
    theme.update(current => current === 'light' ? 'dark' : 'light');
  }
</script>

<header class="bg-white dark:bg-gray-800 shadow-md">
  <div class="flex justify-between items-center p-4">
    <button class="text-2xl font-bold text-gray-900 dark:text-white px-4 py-2 focus:outline-none">
      Email Manager
    </button>
    <form class="w-[800px]">
      <div class="flex">
        <div class="relative w-full max-w-2xl mr-4">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <i class="fa-solid fa-magnifying-glass text-gray-600"></i>
          </div>
          <input 
            type="search" 
            id="default-search" 
            class="w-full py-3 pl-12 text-lg text-gray-900 border border-gray-300 rounded-lg bg-transparent dark:text-white dark:border-gray-700 dark:bg-gray-800 focus:outline-none" 
            placeholder="Search..." 
            required
          />
        </div>
        <div class="relative">
          <button class="flex items-center justify-between gap-2 w-full py-3 text-lg text-gray-900 border border-gray-300 rounded-lg px-4 bg-transparent dark:text-white dark:border-gray-700 dark:bg-gray-800 focus:outline-none">
            <span>Filter</span>
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>
      </div>
    </form>
    <div class="flex gap-4 items-center">
      <button 
        on:click={toggleTheme} 
        class="text-2xl text-gray-900 dark:text-white focus:outline-none"
        aria-label="Toggle Theme"
      >
        {#if $theme === 'light'}
          <i class="fa-solid fa-sun"></i>
        {:else}
          <i class="fa-solid fa-moon"></i>
        {/if}
      </button>
      <button 
        class="text-2xl text-gray-900 dark:text-white focus:outline-none"
        aria-label="User Profile"
      >
        <i class="fa-solid fa-user-circle"></i>
      </button>
    </div>
  </div>
</header>
