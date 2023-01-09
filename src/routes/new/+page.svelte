<script lang="ts">
  import Divider from "$lib/Divider.svelte";
  import AddEditQ from "$lib/AddEditQ.svelte";
  import { labels } from "$lib/stores";
</script>

<Divider />
<h2>{$labels.CREATE_NEW_QUEUE}</h2>
<AddEditQ />
