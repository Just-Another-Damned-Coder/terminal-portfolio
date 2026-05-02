<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";
  import { onMount } from "svelte";
  import { X} from '@lucide/svelte';
  
  export let triggerText;
  export let doc; 

  let MdComponent: any = null;

  onMount(async () => {
      if (doc) {
          // Assuming all files are .svx and located in src/lib/docs/
          const module = await import(`../../../lib/docs/${doc}.svx`);
          console.log(module);
          MdComponent = module.default;
      }
  });
</script>

<Dialog.Root>
  <Dialog.Trigger class="doc-trigger">
      {triggerText}
  </Dialog.Trigger>
  <Dialog.Portal>
      <Dialog.Overlay class="dialog-overlay" />
      <Dialog.Content class="dialog-content">
          <div class="dialog-desc">
            {#if MdComponent}
              <div class="md">
                <svelte:component this={MdComponent} />
              </div>
            {:else}
                <!-- <p>Loading...</p> -->
            {/if}
          </div>

          <Dialog.Close class="dialog-close"><X /></Dialog.Close>
      </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.doc-trigger) {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
  }
  
  :global(.doc-trigger:hover) {
    text-decoration: none;
  }

  :global(.fullscreen-overlay) {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      background-color: var(--background);
  }

  :global(.fullscreen-content) {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      justify-content: flex-start; /* changed from center so top content isn't cut off */
      align-items: center;     
      overflow: auto;
      padding: 3rem 1rem;
      background-color: var(--background);
  }

  :global(.doc-close) {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--foreground);
      padding: 0.5rem;
  }

</style>
