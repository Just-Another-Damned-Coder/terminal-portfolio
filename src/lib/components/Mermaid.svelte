<script>
  import { onMount } from 'svelte';

  let { code } = $props();
  let error = $state(false);
  let svg = $state('');

  onMount(async () => {
    try {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      const result = await mermaid.render(id, code);
      svg = result.svg;
    } catch (e) {
      console.error('Mermaid rendering failed', e);
      error = true;
    }
  });
</script>

{#if error}
  <div class="mermaid-error">
    <p>Error rendering diagram.</p>
    <pre>{code}</pre>
  </div>
{:else if svg}
  <div class="mermaid-wrapper">
    {@html svg}
  </div>
{:else}
  <div class="mermaid-loading">Loading diagram…</div>
{/if}

<style>
  .mermaid-wrapper {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  .mermaid-wrapper :global(svg) {
    max-width: 100%;
    height: auto;
  }
  .mermaid-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6rem;
    color: var(--bright-black);
    font-family: monospace;
  }
  .mermaid-error {
    padding: 1rem;
    color: var(--red);
    font-family: monospace;
  }
</style>
