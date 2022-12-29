<script lang="ts">
  // Dependencies
  import { browser } from "$app/environment";
  import type { QueuesType } from "../types";

  // State
  let queues: QueuesType = [];
  if (browser) {
    const localState = window.localStorage.getItem("fifo");
    if (localState) queues = JSON.parse(localState);
  }

  // Handlers
  const handleClearAll = () => {
    if (browser) {
      queues = [];
      localStorage.removeItem("fifo");
    }
  };
</script>

<a
  class="inline-block w-full text-center text-xl bg-orange-600 text-orange-50 rounded-xl py-3 font-bold"
  href="/new"
>
  New +
</a>

<div class="w-full h-1 border-dashed border-t-4 border-orange-200" />

<div class="flex flex-col gap-2">
  <h2
    class="text-2xl font-semibold text-orange-600 flex justify-between items-center"
  >
    My Queues
    <button
      class="border-4 border-orange-600 rounded-xl px-2"
      on:click={handleClearAll}>Clear All</button
    >
  </h2>
  <ul>
    {#each queues as { id, name } (id)}
      <li
        class="flex items-center justify-between p-4 border-orange-600 border-solid border-4 rounded-xl text-orange-600 mb-4 font-semibold text-xl"
      >
        <a href="/edit/{id}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
            />
            <path
              d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
            />
          </svg>
        </a>

        {name}

        <a href="/use/{id}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
    {:else}
      <li
        class="text-xl text-orange-600 text-center font-semibold p-4 border-orange-600 border-4 rounded-xl"
      >
        No Queues Found
      </li>
    {/each}
  </ul>
</div>
