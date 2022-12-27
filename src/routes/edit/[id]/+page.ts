// External dependencies
import { browser } from "$app/environment"
import type { PageLoad } from "./$types";

// Local dependencies
import type { QueueType } from "src/types";

export const load = (({ params:{ id } }) => {
  if (browser) {
    const localState = window.localStorage.getItem('fifo');

    if (localState) {
      const parsedLocalState = JSON.parse(localState);
      return parsedLocalState.find((q: QueueType) => q.id === id);
    }
  }
}) satisfies PageLoad;