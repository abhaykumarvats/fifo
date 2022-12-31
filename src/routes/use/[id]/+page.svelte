<script lang="ts">
  // Dependencies
  import type { PageData } from "./$types";
  import type { ItemType, QueueType, ValuesType } from "$lib/types";
  import { browser } from "$app/environment";
  import Divider from "$lib/Divider.svelte";
  import { BarsArrowDownIcon } from "$lib/icons";

  // Props
  export let data: PageData;

  // State
  let { id, name, items = [], counters } = data as QueueType;
  $: values = {
    [items[0]?.id]: 0,
    [items[1]?.id]: 0,
  } as ValuesType;

  // Utils
  const syncWithLocalStorage = () => {
    const newQ = { id, name, items, counters };
    const currentState = window.localStorage.getItem("fifo");

    if (currentState) {
      let newState = JSON.parse(currentState);
      newState = newState.map((q: QueueType) => (q.id === id ? newQ : q));
      window.localStorage.setItem("fifo", JSON.stringify(newState));
    }
  };

  // Handlers
  const handleSendLast = (index: number) => {
    const newItems = items.filter((_: ItemType, i: number) => i !== index);
    items = [...newItems, items[index]];
    browser && syncWithLocalStorage();
  };

  const handleCounterClick = (id: string) => {
    values[id] = values[id] + 1;
  };
</script>

<Divider />

<h2>{name ?? "loading..."}</h2>

<ul class="flex flex-col gap-2">
  {#each items as { id, value }, index (id)}
    <li class="outlined flex items-center justify-between">
      <span class="font-bold">{value}</span>

      {#if [0, 1].includes(index)}
        <span class="flex gap-4">
          {#if counters}
            <button
              class="filled py-1 w-7 h-7 flex justify-center items-center text-sm"
              on:click={() => handleCounterClick(id)}
            >
              {values[id]}
            </button>
          {/if}

          <button
            class="filled py-1 text-sm flex items-center gap-2"
            on:click={() => handleSendLast(index)}
          >
            Send to Last {@html BarsArrowDownIcon}
          </button>
        </span>
      {:else if index === 2}
        <span class="text-sm italic mr-2">Up Next</span>
      {/if}
    </li>

    {#if [1, 2].includes(index)}
      <li class="my-4 w-1/2 m-auto"><Divider /></li>
    {/if}
  {/each}
</ul>
