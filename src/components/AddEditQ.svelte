<script lang="ts">
  // Dependencies
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import type { ItemType, QueueType } from "src/types";
  import { slide } from "svelte/transition";

  // Props
  export let editMode = false;
  export let editId: string = "";
  export let editName = "";
  export let editItems: ItemType[] = [];

  // State
  let qNameInput: HTMLInputElement;
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
  class="p-4 bg-transparent border-4 border-orange-600 focus:outline-none rounded-xl text-orange-600"
  type="text"
  placeholder="Enter Queue Name"
  bind:this={qNameInput}
  bind:value={qName}
  on:keypress={({ key }) => key === "Enter" && newItemInput.focus()}
/>

<ul class="flex flex-col gap-2">
  {#each qItems as { id, value } (id)}
    <li
      class="text-xl text-orange-600 text-center font-semibold p-4 border-orange-600 border-2 rounded-xl flex items-center justify-between"
      transition:slide|local
    >
      {value}
      <button on:click={() => handleItemDelete(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </li>
  {/each}
</ul>

<div class="flex gap-2">
  <input
    class="w-full p-4 bg-transparent border-4 border-orange-600 focus:outline-none rounded-xl text-orange-600"
    type="text"
    placeholder="Enter Item"
    bind:this={newItemInput}
    bind:value={newItemValue}
    on:keypress={({ key }) => key === "Enter" && handleItemAdd()}
  />
  <button
    class="inline-block w-fit text-center text-xl bg-orange-600 text-orange-50 rounded-xl px-4 font-bold"
    on:click={handleItemAdd}>Add&nbsp;+</button
  >
</div>

<button
  class="inline-block w-full text-center text-xl bg-orange-600 text-orange-50 rounded-xl py-3 font-bold"
  on:click={handleQueueSave}>Save</button
>
{#if error}
  <p class="text-red-500 capitalize text-center">{error}</p>
{/if}
