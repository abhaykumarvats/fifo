<script lang="ts">
  // Dependencies
  import AddEditQ from "../../../components/AddEditQ.svelte";
  import type { PageData } from "./$types";

  // Props
  export let data: PageData;
  const { id, name, items } = data;
</script>

<div class="w-full h-1 border-dashed border-t-4 border-orange-200" />
<h2 class="text-orange-600 text-2xl font-bold">Edit Queue</h2>
<AddEditQ editMode={true} editId={id} editName={name} editItems={items} />
