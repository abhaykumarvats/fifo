<script lang="ts">
  import { browser } from "$app/environment";

  // Local dependencies
  import type { QueuesType } from "../types";

  // State
  let queues: QueuesType = [];
  if (browser) {
    const localState = window.localStorage.getItem("fifo");
    if (localState) queues = JSON.parse(localState);
  }
</script>

<a href="/new">+ create new</a>

<h3>my queues</h3>
<ul>
  {#each queues as { id, name } (id)}
    <li>
      {name}
    </li>
  {:else}
    <li>no queues found</li>
  {/each}
</ul>
