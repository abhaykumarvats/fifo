<script lang="ts">
  // Dependencies
  import Divider from "$lib/Divider.svelte";
  import AddEditQ from "$lib/AddEditQ.svelte";
  import type { PageData } from "./$types";

  // Props
  export let data: PageData;
  const { id, name, items, counters } = data;
</script>

<Divider />
<h2>Edit Queue</h2>
<AddEditQ
  editMode={true}
  editId={id}
  editName={name}
  editItems={items}
  editCounters={counters}
/>
