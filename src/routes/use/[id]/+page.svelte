<script lang="ts">
  // Dependencies
  import type { PageData } from "./$types";
  import type { CheckedCountersType, ItemType, QueueType } from "$lib/types";
  import { browser } from "$app/environment";
  import Divider from "$lib/Divider.svelte";
  import { BarsArrowDownIcon } from "$lib/icons";

  // Props
  export let data: PageData;

  // State
  let { id, name, items = [], counters } = data as QueueType;
  $: checkedCounters = {
    [items[0]?.id]: [],
    [items[1]?.id]: [],
  } as CheckedCountersType;

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

  const handleCounterClick = (id: string, counter: number) => {
    const currentCounters = checkedCounters[id];
    if (currentCounters.includes(counter)) return;
    currentCounters.push(counter);
    checkedCounters[id] = currentCounters;
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
            <span class="flex gap-2">
              {#each [1, 2, 3] as counter}
                <span
                  class="cursor-pointer {checkedCounters[id].includes(counter)
                    ? 'filled border-4 border-orange-600 cursor-not-allowed'
                    : 'outlined'}"
                  role="checkbox"
                  aria-checked={checkedCounters[id].includes(counter)}
                  on:click={() => handleCounterClick(id, counter)}
                  on:keypress={({ code }) =>
                    code === "Space" && handleCounterClick(id, counter)}
                />
              {/each}
            </span>
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
