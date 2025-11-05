<script lang="ts">
  import { Dialog, Separator } from 'bits-ui';
  import { X } from '@lucide/svelte';
  import Content from '$lib/docs/about.md';
</script>

<Dialog.Root>
  <Dialog.Trigger>data</Dialog.Trigger>

  <Dialog.Portal disabled>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="dialog-content">
      <div class="dialog-panel">
        <Dialog.Title class="dialog-title">Create API key</Dialog.Title>
        <Separator.Root />
        <Dialog.Description class="dialog-desc">
          <Content />
        </Dialog.Description>
        <div class="dialog-actions">
          <Dialog.Close class="btn">Save</Dialog.Close>
        </div>
        <Dialog.Close class="dialog-close" aria-label="Close">
          <X />
        </Dialog.Close>
      </div>
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
