<script lang="ts">
  // Dependencies
  import Divider from "$lib/Divider.svelte";
  import AddEditQ from "$lib/AddEditQ.svelte";
  import type { PageData } from "./$types";
  import { ArrowRightIcon, DangerIcon } from "$lib/icons";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import type { QueueType } from "$lib/types";
  import { labels } from "$lib/stores";

  // Props
  export let data: PageData;
  const { id, name, items, showCounter } = data;

  // State
  let deleteButtonLabel = "";

  // Utils
  const syncWithLocalStorage = () => {
    const currentState = localStorage.getItem("fifo");

    if (currentState) {
      const newState = JSON.parse(currentState).filter(
        (queue: QueueType) => queue.id !== id
      );

      localStorage.setItem("fifo", JSON.stringify(newState));
    }

    goto("/");
  };

  // Handlers
  const handleDelete = () => {
    if (!deleteButtonLabel) {
      deleteButtonLabel = $labels.SURE;
      return;
    }

    browser && syncWithLocalStorage();
  };
</script>

<Divider />

<div class="flex justify-between">
  <div class="flex gap-2">
    <h2>{$labels.EDIT_QUEUE}</h2>
    <button class="flex items-center gap-2" on:click={() => goto(`/use/${id}`)}>
      {@html ArrowRightIcon}
    </button>
  </div>
  <button
    class="filled flex items-center gap-2 py-0 text-base"
    on:click={handleDelete}
  >
    {deleteButtonLabel || $labels.DELETE}
    {@html DangerIcon}
  </button>
</div>

<AddEditQ
  editMode={true}
  queueId={id}
  queueName={name}
  queueItems={items}
  queueShowCounter={showCounter}
/>
