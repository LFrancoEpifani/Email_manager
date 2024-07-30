<script>
  import { format, isToday, isThisWeek, isYesterday } from 'date-fns';
  import ExpandableText from './ExpandableText.svelte';
  import { onMount } from 'svelte';
  import { selectedEmails } from '../store/store.js';


  export let data;
  let tableElement;

  function sortEmailsByDate(emails) {
    return emails.sort((a, b) => new Date(b.emlDate) - new Date(a.emlDate));
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isToday(date)) {
      return `Today ${format(date, 'HH:mm')}`;
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, 'HH:mm')}`;
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE HH:mm'); 
    } else {
      return format(date, 'MMM dd'); 
    }
  }

  function countEmails(emails) {
    return emails.length;
  }

  let sortedEmails = sortEmailsByDate(data.data);
  let totalEmails = countEmails(data.data);

  function toggleEmailSelection(id) {
    selectedEmails.update(selected => {
      if (selected.includes(id)) {
        return selected.filter(emailId => emailId !== id);
      } else {
        return [...selected, id];
      }
    });
  }

  $: selectedEmailIds = $selectedEmails;

  onMount(() => {
    if (tableElement) {
      tableElement.classList.remove('hidden');
    }
  });
</script>

<main class="h-full w-full">
  <div class="overflow-y-auto h-full w-full">
    <table class="bg-white dark:bg-[#08243f] w-full hidden" bind:this={tableElement}>
      <thead class="text-black dark:text-white border-b">
        <tr class="text-xl">
          <th class="w-2/12 p-4 text-left">From</th>
          <th class="w-5/12 p-4 text-left">Subject</th>
          <th class="w-2/12 p-4 text-left">Text</th>
          <th class="w-1/12 p-4 text-left">Tags</th>
          <th class="w-1/12 p-4 text-left">Date</th>
          <th class="w-1/12 p-4 text-left">Notes</th>
        </tr>
      </thead>
      <tbody class="text-gray-700 dark:text-white">
        {#each sortedEmails as email}
          <tr class="border-b border-gray-200">
            <td class="px-4 py-2 text-lg">{email.emlFrom}</td>
            <td class="px-4 py-2 text-xl font-bold text-[#106cbd]">{email.emlSubject}</td>
            <td class="px-4 py-2 text-lg">
              <ExpandableText text={email.automaticComments} maxLength={35} />
            </td>
            <td class="px-4 py-2">{email.manualTags}</td>
            <td class="px-4 py-2 text-lg">{formatDate(email.emlDate)}</td>
            <td class="px-4 py-2">
              <input class="p-2 mx-3 border-b border-gray-300" type="text">
            </td>
            <td class="px-4 py-2">
              <div class="flex gap-2 text-lg items-center">
                <button class:btn-red={selectedEmailIds.includes(email.id)} on:click={() => toggleEmailSelection(email.id)}>
                  <i class="fa-solid fa-flag cursor-pointer"></i>
                </button>
                <button>
                  <i class="fa-solid fa-refresh cursor-pointer"></i>
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  .hidden {
    visibility: hidden;
  }
  .btn-red {
    color: red;
  }
  tr:hover {
    background-color: #f0f0f0;
  }
</style>
