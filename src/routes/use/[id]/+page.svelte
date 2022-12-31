<script lang="ts">
  // Dependencies
  import type { PageData } from "./$types";
  import type { ItemType, QueueType, ValuesType } from "$lib/types";
  import { browser } from "$app/environment";
  import Divider from "$lib/Divider.svelte";
  import { BarsArrowDownIcon } from "$lib/icons";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  // Props
  export let data: PageData;

  // State
  let { id, name, items = [], counters } = data as QueueType;
  $: values = {
    [items[0]?.id]: 0,
    [items[1]?.id]: 0,
  } as ValuesType;
  $: activeItems = items.filter((_, index) => [0, 1].includes(index));
  $: inactiveItems = items.filter((_, index) => ![0, 1].includes(index));

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

  const [send, receive] = crossfade({
    duration: 1000,
    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 1000,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

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

<h2>{name ?? "Loading..."}</h2>

<ul class="flex flex-col gap-2">
  {#each activeItems as { id, value }, index (id)}
    <li
      class="outlined flex items-center justify-between"
      in:receive|local={{ key: id }}
      out:send|local={{ key: id }}
      animate:flip
    >
      <span class="font-bold">{value}</span>

      <span class="flex gap-4">
        {#if counters}
          <button
            class="filled py-1 w-7 h-7 flex justify-center items-center text-sm"
            on:click={() => handleCounterClick(id)}
          >
            {values[id]}
          </button>
        {/if}

        {#if items.length > 2}
          <button
            class="filled py-1 text-sm flex items-center gap-2"
            on:click={() => handleSendLast(index)}
          >
            Send to Last {@html BarsArrowDownIcon}
          </button>
        {/if}
      </span>
    </li>
  {/each}
</ul>

{#if items.length > 2}
  <div class="my-4 w-1/2 m-auto"><Divider /></div>
{/if}

<ul class="flex flex-col gap-2">
  {#each inactiveItems as { id, value }, index (id)}
    <li
      class="outlined flex items-center justify-between"
      in:receive|local={{ key: id }}
      out:send|local={{ key: id }}
      animate:flip
    >
      <span class="font-bold">{value}</span>

      {#if index === 0}
        <span class="text-sm italic mr-2">Up Next</span>
      {/if}
    </li>
  {/each}
</ul>
