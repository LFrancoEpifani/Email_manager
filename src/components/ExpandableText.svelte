<script>
    export let text = "";
    export let maxLength = 100;
    let isExpanded = false;
  
    function toggleExpand() {
      isExpanded = !isExpanded;
    }
  </script>
 
  
  <div>
    <div class="text-container">
        {#if isExpanded}
          {text}
        {:else}
          {text.slice(0, maxLength)}{text.length > maxLength ? '...' : ''}
        {/if}
      </div>
      {#if text.length > maxLength}
        <button class="text-[#0000ff] dark:text-[#F7E7DC]" on:click={toggleExpand}>
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      {/if}
  </div>
  
   
  <style>
    .text-container {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
   
  </style>