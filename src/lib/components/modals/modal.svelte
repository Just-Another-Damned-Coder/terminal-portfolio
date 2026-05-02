<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";
  import { onMount } from "svelte";
  import { X } from '@lucide/svelte';
  import { marked } from 'marked';
  import { readMarkdownFile } from '$lib/js/markdown';
  
  export let triggerText;
  export let doc; 
  export let docPath = null; // Added to receive docPath from ls.svelte
  
  let MdComponent: any = null;
  let errorMsg: string | null = null;
  let isSvx = false;
  let parsedHtml: string = ""; // Added to store raw markdown HTML

  const svxModules = import.meta.glob('/src/lib/docs/**/*.svx');

  onMount(async () => {
      if (!doc) return;

      // Determine if it's an SVX based on whether docPath exists and ends with .svx
      isSvx = Boolean(docPath && docPath.endsWith('.svx'));

      if (isSvx) {
          // --- ROUTE A: Handle Interactive .svx Components ---
          if (svxModules[docPath]) { // Use docPath to grab the correct module key
              try {
                  const module: any = await svxModules[docPath]();
                  MdComponent = module.default;
              } catch (error) {
                  console.error(`[Terminal Error] Failed to load .svx at ${docPath}:`, error);
                  errorMsg = "Error 500: Interactive component failed to mount.";
              }
          } else {
              console.error(`[Terminal Error] .svx path '${docPath}' not found. Available:`, Object.keys(svxModules));
              errorMsg = "Error 404: Component not found in Vite bundle.";
          }
      } else {
          // --- ROUTE B: Handle Raw .md Files (from static folder) ---
            try {
                const rawText = await readMarkdownFile(doc);
                // Ensure rawText isn't your custom "ERROR: File not found." string
                if (rawText && !rawText.startsWith("ERROR")) {
                    parsedHtml = await marked.parse(rawText);
                } else {
                    throw new Error("File not found");
                }
            } catch {
                errorMsg = "Error 404: Text file could not be loaded.";
            }
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
            {#if errorMsg}
               <p class="text-red-500 font-mono">{errorMsg}</p>
               
            {:else if isSvx && MdComponent}
               <!-- Render the Interactive Svelte Component -->
               <div id="terminal-md-render" class="svx-container md">
                 <svelte:component this={MdComponent} />
               </div>
               
            {:else if !isSvx && parsedHtml}
               <!-- Render the Parsed Raw Text -->
               <div id="terminal-md-render" class="md">
                    {@html parsedHtml}
                </div>
               
            {:else}
               <p>Loading {doc}...</p>
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
