<script lang="ts">
  // Dependencies
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import type { ItemType, QueueType } from "$lib/types";
  import { slide } from "svelte/transition";
  import { CrossIcon, PlusIcon, SaveIcon } from "./icons";

  // Props
  export let editMode = false;
  export let editId: string = "";
  export let editName = "";
  export let editItems: ItemType[] = [];

  // State
  let qName = editName;
  let qItems: ItemType[] = editItems;
  let newItemInput: HTMLInputElement;
  let newItemValue = "";
  let error = "";
  $: if (qName || qItems.length) error = "";

  // Utils
  const syncWithLocalStorage = () => {
    const qId = editId || crypto.randomUUID();
    const newQ = { id: qId, name: qName, items: qItems };
    const currentState = window.localStorage.getItem("fifo");

    if (currentState) {
      let newState = JSON.parse(currentState);

      if (editMode)
        newState = newState.map((q: QueueType) => (q.id === qId ? newQ : q));
      else newState = [...newState, newQ];

      window.localStorage.setItem("fifo", JSON.stringify(newState));
    } else window.localStorage.setItem("fifo", JSON.stringify([newQ]));
  };

  // Handlers
  const handleItemAdd = () => {
    if (!newItemValue) return;

    const newItem = {
      id: crypto.randomUUID(),
      value: newItemValue,
    };

    qItems = [...qItems, newItem];
    newItemValue = "";
    newItemInput.focus();
  };

  const handleItemDelete = (id: string) => {
    qItems = qItems.filter((item) => item.id !== id);
  };

  const handleQueueSave = () => {
    if (!qName) {
      error = "please enter queue name";
      return;
    }

    if (!qItems.length) {
      error = "please add atleast one item";
      return;
    }

    browser && syncWithLocalStorage();
    goto("/");
  };
</script>

<input
  class="outlined focus:outline-none text-left py-1"
  type="text"
  placeholder="Enter Queue Name"
  bind:value={qName}
  on:keypress={({ key }) => key === "Enter" && newItemInput.focus()}
/>

{#if qItems.length}
  <ul class="flex flex-col gap-2 ml-8" transition:slide|local>
    {#each qItems as { id, value } (id)}
      <li
        class="outlined flex items-center justify-between"
        transition:slide|local
      >
        <span class="font-bold">{value}</span>
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

<button
  class="filled w-full flex items-center justify-center gap-2"
  on:click={handleQueueSave}
>
  Save {@html SaveIcon}
</button>
{#if error}
  <p class="text-red-500 capitalize text-center">{error}</p>
{/if}
