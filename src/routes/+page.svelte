<script lang="ts">
  // Dependencies
  import { browser } from "$app/environment";
  import Divider from "$lib/Divider.svelte";
  import { ArrowRightIcon, DangerIcon, EditIcon, PlusIcon } from "$lib/icons";
  import type { QueuesType } from "$lib/types";

  // State
  let queues: QueuesType = [];
  if (browser) {
    const localState = window.localStorage.getItem("fifo");
    if (localState) queues = JSON.parse(localState);
  }

  // Handlers
  const handleDeleteAll = () => {
    if (browser) {
      queues = [];
      localStorage.removeItem("fifo");
    }
  };
</script>

<a class="filled w-full flex items-center gap-2 justify-center" href="/new">
  New {@html PlusIcon}
</a>

<Divider />

<h2 class="flex justify-between items-center">
  My Queues
  <button
    class="filled py-1 text-base font-normal flex items-center gap-2"
    on:click={handleDeleteAll}
  >
    Delete All {@html DangerIcon}
  </button>
</h2>

<ul>
  {#each queues as { id, name } (id)}
    <li class="outlined flex items-center justify-between mb-4">
      <a class="flex items-center gap-2" href="/edit/{id}">
        {@html EditIcon} Edit
      </a>

      <span class="font-bold">{name}</span>

      <a class="flex items-center gap-2" href="/use/{id}">
        Use {@html ArrowRightIcon}
      </a>
    </li>
  {:else}
    <li class="outlined w-full italic">No Queues Found</li>
  {/each}
</ul>
