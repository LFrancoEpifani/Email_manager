<script>
  import { format, isToday, isThisWeek, isYesterday } from 'date-fns';
  import ExpandableText from './ExpandableText.svelte';
  import { onMount } from 'svelte';
  import { selectedEmails } from '../store/store.js';

  export let data;
  let tableElement;
  let notes = {};

  async function fetchNotes(emailId) {
    try {
      const response = await fetch(`/api/notes?emailId=${emailId}`);
      const result = await response.json();
      notes = {
        ...notes,
        [emailId]: result.notes || []
      };
    } catch (error) {
      console.error(`Error fetching notes for emailId ${emailId}:`, error);
    }
  }

  async function addNoteToEmail(emailId, note) {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId, note })
      });
      const result = await response.json();
      if (result.success) {
        notes = {
          ...notes,
          [emailId]: [...(notes[emailId] || []), result.note]
        };
      }
    } catch (error) {
      console.error(`Error adding note to emailId ${emailId}:`, error);
    }
  }

  async function deleteNoteFromEmail(emailId, noteId) {
    try {
      const response = await fetch(`/api/notes?noteId=${noteId}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        notes = {
          ...notes,
          [emailId]: notes[emailId].filter(note => note.id !== noteId)
        };
      }
    } catch (error) {
      console.error(`Error deleting note from emailId ${emailId}:`, error);
    }
  }

  function sortEmailsDate(emails) {
    return emails.sort((a, b) => new Date(b.emlDate) - new Date(a.emlDate));
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isToday(date)) return `Today ${format(date, 'HH:mm')}`;
    if (isYesterday(date)) return `Yesterday ${format(date, 'HH:mm')}`;
    if (isThisWeek(date)) return format(date, 'EEEE HH:mm');
    return format(date, 'MMM dd');
  }

  let sortedEmails = sortEmailsDate(data.data);
  let totalEmails = data.data.length;

  function toggleEmailSelection(id) {
    selectedEmails.update(selected => selected.includes(id) ? selected.filter(emailId => emailId !== id) : [...selected, id]);
  }

  $: selectedEmailIds = $selectedEmails;

  onMount(() => {
    if (tableElement) tableElement.classList.remove('hidden');
    sortedEmails.forEach(email => fetchNotes(email.id));
  });
</script>

<main class="h-full w-full shadow-xl">
  <div class="overflow-y-auto h-full w-full">
    <table class="bg-white dark:bg-[#08243f] w-full hidden rounded-lg " bind:this={tableElement}>
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
          <tr class="border-b border-gray-200 hover:bg-[#f0f0f0] hover:dark:bg-[#242424]">
            <td class="px-4 py-2 text-lg">{email.emlFrom}</td>
            <td class="px-4 py-2 text-xl font-bold text-[#106cbd]">{email.emlSubject}</td>
            <td class="px-4 py-2 text-lg">
              <ExpandableText text={email.automaticComments} maxLength={35} />
            </td>
            <td class="px-4 py-2">{email.manualTags}</td>
            <td class="px-4 py-2 text-lg">{formatDate(email.emlDate)}</td>
            <td class="px-4 py-2">
              <input class="p-2 mx-3 border-b border-gray-300 bg-transparent" type="text" on:keydown={(e) => { if (e.key === 'Enter' && e.target.value.trim() !== '') { addNoteToEmail(email.id, e.target.value.trim()); e.target.value=''; } }}>
              <ul>
                {#if notes[email.id]}
                  {#each notes[email.id] as note (note.id)}
                    <li class="flex m-3 gap-3">
                      <p>{note.note}</p>
                      <button on:click={() => deleteNoteFromEmail(email.id, note.id)}>
                        <i class="fa-solid fa-trash cursor-pointer"></i>
                      </button>
                    </li>
                  {/each}
                {/if}
              </ul>
            </td>
            <td class="px-4 py-2">
              <div class="flex gap-2 text-xl items-center">
                <button class:btn-red={selectedEmailIds.includes(email.id)} on:click={() => toggleEmailSelection(email.id)}>
                  <i class="fa-solid fa-flag cursor-pointer"></i>
                </button>
                <button>
                  <i class="fa-solid fa-refresh"></i>
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>