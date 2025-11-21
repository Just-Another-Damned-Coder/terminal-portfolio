<script lang="ts">
  import { Dialog, Separator } from 'bits-ui';
  let open = false;
</script>

<Dialog.Root bind:open={open}>
  <Dialog.Trigger class="btn">Open fullscreen</Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay class="overlay" />

    <Dialog.Content
      class="content"
      preventScroll={true}
      trapFocus={true}
      aria-label="Fullscreen modal"
    >
      <header class="header">
        <Dialog.Title class="title">Fullscreen modal</Dialog.Title>
        <Dialog.Close class="close">Close</Dialog.Close>
      </header>

      <Dialog.Description class="desc">
        Put long content below to verify scrolling inside the modal.
      </Dialog.Description>

      <div class="body">
        {#each Array(60) as _, i}
          <p>Line {i + 1}</p>
        {/each}
      </div>

      <footer class="footer">
        <button class="primary" on:click={() => (open = false)}>Done</button>
      </footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  .btn {
    padding: 0.5rem 0.875rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #f6f6f6;
    cursor: pointer;
  }

  /* Dimmed background */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
  }

  /* Fullscreen content with internal scroll */
  .content {
    position: fixed;
    inset: 0;            /* top:0 right:0 bottom:0 left:0 */
    z-index: 50;
    display: flex;
    flex-direction: column;
    background: #fff;

    /* Padding for edges; adjust as desired */
    padding: 16px 16px 16px 16px;

    /* Allow internal scroll for long content */
    overflow-y: auto;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .title {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .close {
    padding: 6px 10px;
    background: #e5e7eb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
  }

  .desc {
    color: #4b5563;
    font-size: 0.9rem;
    margin-bottom: 12px;
  }

  /* Grow to fill and keep scrolling smooth */
  .body {
    flex: 1;
    display: block;
  }

  .footer {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
    background: #fff; /* prevents overlay bleed when scrolled */
  }

  .primary {
    padding: 8px 16px;
    border-radius: 6px;
    border: 0;
    background: #111;
    color: #fff;
    cursor: pointer;
  }
</style>
