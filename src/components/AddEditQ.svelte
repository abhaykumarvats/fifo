<script lang="ts">
  // Dependencies
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import type { ItemType, QueueType } from "src/types";

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

  // Lifecycle
  onMount(() => qNameInput.focus());

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
  type="text"
  placeholder="enter queue name"
  bind:this={qNameInput}
  bind:value={qName}
  on:keypress={({ key }) => key === "Enter" && newItemInput.focus()}
/>

<ul>
  {#each qItems as { id, value } (id)}
    <li>
      {value} <button on:click={() => handleItemDelete(id)}>x</button>
    </li>
  {/each}
</ul>

<div class="flex">
  <input
    type="text"
    placeholder="enter item"
    bind:this={newItemInput}
    bind:value={newItemValue}
    on:keypress={({ key }) => key === "Enter" && handleItemAdd()}
  />
  <button on:click={handleItemAdd}>+ add item</button>
</div>

<div class="flex">
  <button on:click={handleQueueSave}>save</button>
  {#if error}
    <p class="text-red-500">{error}</p>
  {/if}
</div>
