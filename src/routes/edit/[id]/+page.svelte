<script lang="ts">
  // Dependencies
  import Divider from "$lib/Divider.svelte";
  import AddEditQ from "$lib/AddEditQ.svelte";
  import type { PageData } from "./$types";
  import { ArrowRightIcon } from "$lib/icons";
  import { goto } from "$app/navigation";

  // Props
  export let data: PageData;
  const { id, name, items, showCounter } = data;
</script>

<Divider />

<div class="flex justify-between">
  <h2>Edit Queue</h2>
  <button class="flex items-center gap-2" on:click={() => goto(`/use/${id}`)}>
    Use {@html ArrowRightIcon}
  </button>
</div>

<AddEditQ
  editMode={true}
  queueId={id}
  queueName={name}
  queueItems={items}
  queueShowCounter={showCounter}
/>
