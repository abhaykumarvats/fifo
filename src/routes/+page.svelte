<script lang="ts">
  // Dependencies
  import { browser } from "$app/environment";
  import Divider from "$lib/Divider.svelte";
  import { ArrowRightIcon, DangerIcon, EditIcon, PlusIcon } from "$lib/icons";
  import { labels } from "$lib/stores";
  import type { QueuesType } from "$lib/types";

  // State
  let queues: QueuesType = [];
  if (browser) {
    const localState = window.localStorage.getItem("fifo");
    if (localState) queues = JSON.parse(localState);
  }
  let deleteButtonLabel = "";

  // Handlers
  const handleDeleteAll = () => {
    if (!deleteButtonLabel.length) {
      deleteButtonLabel = $labels.SURE;
      return;
    }

    if (browser) {
      queues = [];
      deleteButtonLabel = "";
      localStorage.removeItem("fifo");
    }
  };
</script>

<a class="filled w-full flex items-center gap-2 justify-center" href="/new">
  {$labels.NEW}
  {@html PlusIcon}
</a>

<Divider />

<h2 class="flex justify-between items-center">
  {$labels.MY_QUEUES}
  {#if queues.length}
    <button
      class="filled py-1 text-base font-normal flex items-center gap-2"
      on:click={handleDeleteAll}
    >
      {deleteButtonLabel || $labels.DELETE_ALL}
      {@html DangerIcon}
    </button>
  {/if}
</h2>

<ul>
  {#each queues as { id, name } (id)}
    <li class="outlined flex items-center justify-between mb-4">
      <a class="flex items-center gap-2" href="/edit/{id}">
        {@html EditIcon}
        {$labels.EDIT}
      </a>

      <span class="font-bold">{name}</span>

      <a class="flex items-center gap-2" href="/use/{id}">
        {$labels.USE}
        {@html ArrowRightIcon}
      </a>
    </li>
  {:else}
    <li class="outlined w-full italic">{$labels.NO_QUEUES_FOUND}</li>
  {/each}
</ul>
