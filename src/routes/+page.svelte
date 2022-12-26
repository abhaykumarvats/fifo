<script>
  let queues = [
    {
      id: 0,
      name: "q1",
      items: [
        {
          name: "hello",
          order: 0,
        },
      ],
    },
    {
      id: 1,
      name: "q2",
      items: [
        {
          name: "world",
          order: 0,
        },
      ],
    },
  ];
</script>

<a href="/new">+ create new</a>

<h3>my queues</h3>
<ul>
  {#each queues as { id, name } (id)}
    <li>
      {name}
    </li>
  {/each}
</ul>
