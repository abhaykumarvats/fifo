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

<h3>{name ?? "loading..."}</h3>
<ul>
  {#each items as { id, value }, index (id)}
    <li class="flex items-center">
      {value}
      {#if [0, 1].includes(index)}
        <button on:click={() => handleClick(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5 "
          >
            <path
              fill-rule="evenodd"
              d="M14.77 4.21a.75.75 0 01.02 1.06l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 011.08-1.04L10 8.168l3.71-3.938a.75.75 0 011.06-.02zm0 6a.75.75 0 01.02 1.06l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 111.08-1.04L10 14.168l3.71-3.938a.75.75 0 011.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      {/if}
    </li>
  {/each}
</ul>
