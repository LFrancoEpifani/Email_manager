<script>
    import { theme } from '../store/store.js';
   
  
  
    function toggleTheme() {
      theme.update(current => current === 'light' ? 'dark' : 'light');
    }
  
    
  </script>
  
  <header class="border-b border-gray-300 shadow-md">
    <div class="flex justify-between items-center p-2">
      <button class="text-[28px] px-2 py-2">
        Email Manager
      </button>
      <form class="w-[500px]">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="default-search" class="block w-full p-2 ps-12 text-[18px] text-gray-900 border border-gray-300 rounded-full bg-gray-200" placeholder="Search..." required />
        </div>
      </form>
  
   
      <div class="flex gap-2 p-2 items-center">
          <button on:click={toggleTheme} class="text-[24px]">
            {#if $theme === 'light'}
              <i class="fa-solid fa-sun"></i>
            {:else}
              <i class="fa-solid fa-moon"></i>
            {/if}
          </button>
          <button class="text-[32px]">
            <i class="fa-solid fa-user-circle"></i>
        </button>
        </div>
      </div>
  </header>
  

  