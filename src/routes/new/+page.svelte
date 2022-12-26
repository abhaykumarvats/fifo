<script lang="ts">
  // External dependencies
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  // Types
  type ItemType = {
    id: string;
    value: string;
  };

  // State
  let qNameInput: HTMLInputElement;
  let qName = "";
  let qItems: ItemType[] = [];
  let newItemInput: HTMLInputElement;
  let newItemValue = "";
  let error = "";
  $: if (qName || qItems.length) error = "";

  // Utils
  const syncWithLocalStorage = () => {
    const id = crypto.randomUUID();
    const newQ = { id, name: qName, items: qItems };
    const currentState = window.localStorage.getItem("fifo");

    if (currentState) {
      const newState = [...JSON.parse(currentState), newQ];
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

<h1>create new queue</h1>

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
