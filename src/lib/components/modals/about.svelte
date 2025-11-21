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
                <div class="md">
                  <RenderMarkdown {content} />
                </div>
                
              {/if}
            </Dialog.Description>
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

</style>