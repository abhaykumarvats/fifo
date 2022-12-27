<script lang="ts">
  // Dependencies
  import AddEditQ from "../../../components/AddEditQ.svelte";
  import type { PageData } from "./$types";

  // Props
  export let data: PageData;
  const { id, name, items } = data;
</script>

<h3>edit queue</h3>
<AddEditQ editMode={true} editId={id} editName={name} editItems={items} />
