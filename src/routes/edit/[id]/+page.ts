// Dependencies
import { browser } from "$app/environment"
import type { PageLoad } from "./$types";
import type { QueueType } from "$lib/types";

export const load = (({ params: { id } }) => {
  if (browser) {
    const currentState = window.localStorage.getItem('fifo');

    if (currentState) {
      const parsedState = JSON.parse(currentState);
      return parsedState.find((q: QueueType) => q.id === id);
    }
  }
}) satisfies PageLoad;