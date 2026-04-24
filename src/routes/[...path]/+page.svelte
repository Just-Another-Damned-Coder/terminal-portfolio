<script lang="ts">
  import { X } from '@lucide/svelte';
  import { COLORS, scheme } from '$lib/js/constants';
  import { applyTheme } from '$lib/js/utils/SVG';

  /** @type {import('./$types').PageData} */
  export let data;

  $: component = data.component;
  $: meta = data.meta ?? {};

  $: {
    // Ensures global CSS variables like var(--background) are injected into the root on this standalone page
    if (typeof document !== 'undefined') {
      applyTheme(COLORS[$scheme]);
    }
  }
</script>

<svelte:head>
  <title>{meta.title ?? 'Document'}</title>
</svelte:head>

<div class="fullscreen-content">
  <a href="/" class="doc-close" aria-label="Back to Terminal">
    <X size={24} />
  </a>
  
  <div class="dialog-desc">
    {#if component}
      <div class="md">
        <svelte:component this={component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Mirror exact classes from modal.css for 1:1 parity */
  
  .fullscreen-content {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;     
      overflow: auto;
      padding: 3rem 1rem;
      background-color: var(--background);
      color: var(--foreground);
  }

  .doc-close {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--foreground);
      padding: 0.5rem;
      text-decoration: none;
  }

  .doc-close:hover {
      opacity: 0.7;
  }
</style>