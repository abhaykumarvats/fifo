<script>
  import "../app.css";
</script>

<header class="p-4">
  <h1><a href="/">f • i • f • o</a></h1>
</header>

<main class="p-4 max-w-md m-auto flex flex-col gap-4 pb-8">
  <slot />
</main>

<footer class="py-2 fixed bottom-0 bg-orange-50 w-full text-center text-xs">
  Made with
  <span
    class="cursor-help underline"
    title="🧡 = SvelteKit + Tailwind + TypeScript"
  >
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
</footer>
