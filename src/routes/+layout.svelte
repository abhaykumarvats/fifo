<script>
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { LANGUAGES } from "$lib/constants";
  import { appLanguage } from "$lib/stores";
  import nProgress from "nprogress";

  // Styles
  import "nprogress/nprogress.css";
  import "../app.css";

  // Lifecycle
  beforeNavigate(() => nProgress.start());
  afterNavigate(() => nProgress.done());
</script>

<header class="p-4 max-w-md m-auto grid grid-cols-4 justify-items-start">
  <select bind:value={$appLanguage}>
    {#each LANGUAGES as lang}
      <option value={lang}>{lang}</option>
    {/each}
  </select>
  <h1 class="col-span-2 justify-self-center">
    <a href="/">f • i • f • o</a>
  </h1>
</header>

<main class="p-4 max-w-md m-auto flex flex-col gap-4 pb-8">
  <slot />
</main>

<footer class="py-2 fixed bottom-0 bg-orange-50 w-full text-center text-xs">
  {#if $appLanguage === "EN"}
    Made with
    <span class="cursor-help" title="🧡 = SvelteKit + Tailwind + TypeScript">
      🧡
    </span>
    in India by
    <a
      class="underline"
      href="https://github.com/abhaykv04"
      target="_blank"
      rel="noreferrer"
    >
      Abhay
    </a>
  {:else}
    भारत में
    <span class="cursor-help" title="🧡 = SvelteKit + Tailwind + TypeScript">
      🧡
    </span>
    सहित
    <a
      class="underline"
      href="https://github.com/abhaykv04"
      target="_blank"
      rel="noreferrer"
    >
      अभय
    </a>
    द्वारा विकसित
  {/if}
</footer>
