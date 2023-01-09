// Dependencies
import { derived, writable, type Readable } from "svelte/store";
import { LABELS } from "./constants";

// Stores
export const appLanguage = writable("EN");

export const labels: Readable<{ [x: string]: string }> = derived(
  appLanguage,
  ($appLanguage) =>
    Object.keys(LABELS).reduce((acc, curr) => {
      const labelObject = LABELS[curr];
      return {
        ...acc,
        [curr]: labelObject[$appLanguage as keyof typeof labelObject],
      };
    }, {})
);
