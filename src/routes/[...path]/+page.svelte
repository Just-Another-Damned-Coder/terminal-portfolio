<script lang="ts">
  import { Dialog, Separator } from 'bits-ui';
  import { X } from '@lucide/svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  $: component = data.component;
  $: meta = data.meta ?? {};
</script>

<svelte:head>
  <title>{meta.title ?? 'Document'}</title>
</svelte:head>

<Dialog.Root open={true}>
  <Dialog.Portal>
    <Dialog.Overlay class="page-overlay" />
    <Dialog.Content class="page-content">
      <header class="page-header">
        <Dialog.Title class="page-title">
          {meta.title ?? 'Document'}
        </Dialog.Title>
        <Dialog.Close class="page-close" aria-label="Close">
          <a href="/">
            <X size={20} />
          </a>
        </Dialog.Close>
      </header>
      <Separator.Root />
      <Dialog.Description class="page-body">
        {#if component}
          <div class="prose">
            <svelte:component this={component} />
          </div>
        {/if}
      </Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.page-overlay) {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.7);
  }

  :global(.page-content) {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
  }

  :global(.page-title) {
    font-size: 1.25rem;
    font-weight: 600;
  }

  :global(.page-close) {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
  }

  :global(.page-body) {
    padding: 1rem 1.5rem;
    overflow-y: auto;
    flex: 1;
  }
</style>