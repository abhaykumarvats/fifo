<script lang="ts">
  // Dependencies
  import type { PageData } from "./$types";
  import type { ItemType, QueueType } from "src/types";
  import { browser } from "$app/environment";

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

<div class="w-full h-1 border-dashed border-t-4 border-orange-200" />
<h2 class="text-orange-600 text-2xl font-bold">{name ?? "loading..."}</h2>
<ul class="flex flex-col gap-2">
  {#each items as { id, value }, index (id)}
    <li
      class="flex items-center text-xl text-orange-600 text-center font-semibold p-4 border-orange-600 border-4 rounded-xl justify-between"
    >
      {value}
      {#if [0, 1].includes(index)}
        <button on:click={() => handleClick(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      {:else if index === 2}
        <span
          class="text-xs bg-orange-600 text-orange-50 rounded-full px-2 py-1"
        >
          Next
        </span>
      {/if}
    </li>
  {/each}
</ul>
