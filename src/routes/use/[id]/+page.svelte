<script lang="ts">
  // Dependencies
  import type { PageData } from "./$types";
  import type { ItemType, QueueType } from "$lib/types";
  import { browser } from "$app/environment";
  import Divider from "$lib/Divider.svelte";
  import { BarsArrowDownIcon, RoundArrowUpIcon } from "$lib/icons";

  // Props
  export let data: PageData;

  // State
  let { id, name, items = [] } = data;

  // Utils
  const syncWithLocalStorage = () => {
    const newQ = { id, name, items };
    const currentState = window.localStorage.getItem("fifo");

    if (currentState) {
      let newState = JSON.parse(currentState);
      newState = newState.map((q: QueueType) => (q.id === id ? newQ : q));
      window.localStorage.setItem("fifo", JSON.stringify(newState));
    }
  };

  // Handlers
  const handleClick = (index: number) => {
    const newItems = items.filter((_: ItemType, i: number) => i !== index);
    items = [...newItems, items[index]];
    browser && syncWithLocalStorage();
  };
</script>

<Divider />

<h2>{name ?? "loading..."}</h2>

<ul class="flex flex-col gap-2">
  {#each items as { id, value }, index (id)}
    <li class="outlined flex items-center justify-between">
      <span class="font-bold">{value}</span>
      {#if [0, 1].includes(index)}
        <button
          class="filled py-1 text-sm flex items-center gap-2"
          on:click={() => handleClick(index)}
        >
          Send to Last {@html BarsArrowDownIcon}
        </button>
      {:else if index === 2}
        <span class="text-sm italic mr-2">Up Next</span>
      {/if}
    </li>

    {#if [1, 2].includes(index)}
      <li class="my-4 w-1/2 m-auto"><Divider /></li>
    {/if}
  {/each}
</ul>
