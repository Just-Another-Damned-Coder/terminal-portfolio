<script lang="ts">
  import { Dialog, Separator } from 'bits-ui';
  import RenderMarkdown from '$lib/components/modals/markdown.svelte';
  import { X } from '@lucide/svelte';
  import { onDestroy } from 'svelte';

  export let link: string; // e.g. "/api/about"
  export let triggerText = 'Open';

  let open = false;
  let loading = false;
  let error: string | null = null;
  let content = '';
  let metadata: Record<string, any> = {};
  let controller: AbortController | null = null;

  async function loadIfNeeded() {
    if (!open || !link || loading) return;
    loading = true;
    error = null;
    controller?.abort();
    controller = new AbortController();
    try {
      const res = await fetch(link, { signal: controller.signal });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();
      // Expect shape: { content: string, metadata?: object }
      content = data.content ?? '';
      metadata = data.metadata ?? {};
      console.log('Loaded modal content:', { content, metadata });
    } catch (e: any) {
      if (e?.name !== 'AbortError') error = e?.message ?? 'Unknown error';
    } finally {
      loading = false;
    }
  }

  // If you want to refetch each time it opens, call loadIfNeeded when open toggles
  $: if (open) loadIfNeeded();

  onDestroy(() => controller?.abort());
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>{triggerText}</Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="dialog-content" forceMount>
      {#snippet child({ props, open: isOpen })}
        {#if isOpen}
          <div class="dialog-panel" {...props}>
            <Dialog.Title class="dialog-title">
              {metadata.title ?? 'Content'}
            </Dialog.Title>
            <Separator.Root />

            <Dialog.Description class="dialog-desc">
              {#if loading}
                Loading...
              {:else if error}
                {error}
              {:else}
                {#if metadata.description}
                  <p class="mb-3">{metadata.description}</p>
                {/if}
                <!-- Render Markdown content -->
                <RenderMarkdown {content} />
              {/if}
            </Dialog.Description>

            <div class="dialog-actions">
              <Dialog.Close class="btn">Close</Dialog.Close>
            </div>
            <Dialog.Close class="dialog-close" aria-label="Close">
              <X />
            </Dialog.Close>
          </div>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>


<style>
  /* Full-viewport overlay */
  .dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
  }

  /* Full-viewport centering layer */
  .dialog-content {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 1rem;
    z-index: 101;
  }

  /* The modal panel */
  .dialog-panel {
    width: 100%;
    max-width: 32rem;           /* ≈ 512px */
    color: var(--panel-fg, #fff);
    /* border-radius: 0.5rem; */
    box-shadow:
      0 10px 15px -3px rgba(0,0,0,0.1),
      0 4px 6px -4px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
  }

  .dialog-title {
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
  }

  .dialog-desc {
    padding: 0.75rem 1rem;
  }

  .dialog-actions {
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .dialog-close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: inline-flex;
    cursor: pointer;
    border: none;
    background: transparent;
    color: inherit;
  }

  /* Example button baseline */
  .btn {
    padding: 0.5rem 0.875rem;
    border-radius: 0.375rem;
    border: 1px solid transparent;
    background: var(--btn-bg, #2563eb);
    color: var(--btn-fg, #fff);
  }
  .btn:hover { filter: brightness(0.95); }
</style>
