<script lang="ts">
  // Dependencies
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import type { ItemType, QueueType } from "$lib/types";
  import { slide } from "svelte/transition";
  import { CrossIcon, PlusIcon, SaveIcon, ThreeBarsIcon } from "./icons";

  // Props
  export let editMode = false;
  export let queueId = "";
  export let queueName = "";
  export let queueItems: ItemType[] = [];
  export let queueShowCounter = false;

  // State
  let name = queueName;
  let items = queueItems;
  let showCounter = queueShowCounter;
  let newItemInput: HTMLInputElement;
  let newItemValue = "";
  let error = "";

  // Reactive state
  $: if (name || items.length) error = "";

  // Utils
  const syncWithLocalStorage = () => {
    const id = queueId || crypto.randomUUID();
    const newQueue = { id, name, items, showCounter };
    const currentState = window.localStorage.getItem("fifo");

    if (currentState) {
      let newState = JSON.parse(currentState);

      if (editMode)
        newState = newState.map((queue: QueueType) =>
          queue.id === id ? newQueue : queue
        );
      else newState = [...newState, newQueue];

      window.localStorage.setItem("fifo", JSON.stringify(newState));
    } else window.localStorage.setItem("fifo", JSON.stringify([newQueue]));
  };

  // Handlers
  const handleItemAdd = () => {
    if (!newItemValue) return;

    if (newItemValue.length > 10) {
      error = "item name must be less than 10 characters";
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      value: newItemValue,
      count: 0,
    };

    items = [...items, newItem];
    newItemValue = "";
    newItemInput.focus();
  };

  const handleItemDelete = (id: string) => {
    items = items.filter((item) => item.id !== id);
  };

  const handleQueueSave = () => {
    if (!name) {
      error = "please enter queue name";
      return;
    }

    if (name.length > 10) {
      error = "queue name must be less than 10 characters";
      return;
    }

    if (!items.length) {
      error = "please add atleast one item";
      return;
    }

    browser && syncWithLocalStorage();
    goto("/");
  };

  const handleDrag = (event: DragEvent, startIndex: number) => {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData("text/plain", `${startIndex}`);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event: DragEvent, targetIndex: number) => {
    if (!event.dataTransfer) return;
    const startIndex = parseInt(event.dataTransfer.getData("text/plain"));
    if (startIndex === targetIndex) return;

    const newItems = items;
    if (startIndex < targetIndex) {
      newItems.splice(targetIndex + 1, 0, newItems[startIndex]);
      newItems.splice(startIndex, 1);
    } else {
      newItems.splice(targetIndex, 0, newItems[startIndex]);
      newItems.splice(startIndex + 1, 1);
    }

    items = newItems;
  };
</script>

<input
  class="outlined focus:outline-none text-left py-1"
  type="text"
  placeholder="Enter Queue Name"
  bind:value={name}
  on:keypress={({ key }) => key === "Enter" && newItemInput.focus()}
/>

{#if items.length}
  <ul class="flex flex-col gap-2 ml-8" transition:slide|local>
    {#each items as { id, value }, index (id)}
      <li
        class="outlined flex items-center justify-between"
        draggable="true"
        on:dragstart={(event) => handleDrag(event, index)}
        on:dragover={(event) => event.preventDefault()}
        on:drop={(event) => handleDrop(event, index)}
        transition:slide|local
      >
        <span class="font-bold flex items-center gap-2">
          <span class="cursor-move" data-icon>{@html ThreeBarsIcon}</span>
          {value}
        </span>
        <button
          class="flex items-center gap-2"
          on:click={() => handleItemDelete(id)}
        >
          Remove {@html CrossIcon}
        </button>
      </li>
    {/each}
  </ul>
{/if}

<div class="flex gap-2">
  <input
    class="outlined w-full focus:outline-none text-left py-1"
    type="text"
    placeholder="Enter Item"
    bind:this={newItemInput}
    bind:value={newItemValue}
    on:keypress={({ key }) => key === "Enter" && handleItemAdd()}
  />
  <button
    class="filled w-fit py-1 flex items-center gap-2"
    on:click={handleItemAdd}
  >
    Add {@html PlusIcon}
  </button>
</div>

<label class="text-xl flex items-center gap-2 cursor-pointer">
  <input
    class="appearance-none outlined checked:filled p-2 checked:p-2"
    type="checkbox"
    bind:checked={showCounter}
  />
  Add Counter
</label>

<button
  class="filled w-full flex items-center justify-center gap-2"
  on:click={handleQueueSave}
>
  Save {@html SaveIcon}
</button>
{#if error}
  <p class="text-red-500 capitalize text-center">{error}</p>
{/if}
