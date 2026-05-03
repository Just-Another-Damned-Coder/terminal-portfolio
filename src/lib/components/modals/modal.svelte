<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";
  import { onMount } from "svelte";
  import { X } from '@lucide/svelte';
  import { marked } from 'marked';
  import fm from 'front-matter';
  import { readMarkdownFile } from '$lib/js/markdown';
  import {Blog, ModalTitle} from '$lib/components';

  export let triggerText;
  export let doc; 
  export let docPath: string;// Added to receive docPath from ls.svelte
  
  let MdComponent: any = null;
  let errorMsg: string | null = null;
  let isSvx = false;
  let blogProps: any = null;

  const svxModules = import.meta.glob('/src/lib/docs/**/*.svx');

  onMount(async () => {
      if (!doc) return;

      // Determine if it's an SVX based on whether docPath exists and ends with .svx
      isSvx = Boolean(docPath && docPath.endsWith('.svx'));

      if (isSvx) {
          // --- ROUTE A: Handle Interactive .svx Components ---
          if (svxModules[docPath]) {
              try {
                  const module: any = await svxModules[docPath]();
                  MdComponent = module.default;
                  
                  // Extract mdsvex frontmatter from the exported metadata object
                  const metadata = module.metadata || {}; 
                  
                  blogProps = {
                      title: metadata.title || doc,
                      author: metadata.author || "Unknown",
                      date: metadata.date || "",
                      rawText: "", // .svx components handle their own rendering
                      contentHtml: "" 
                  };
                  
                  console.log(`[Terminal] Metadata captured for .svx:`, metadata);
              } catch (error) {
                  console.error(`[Terminal Error] Failed to load .svx at ${docPath}:`, error);
                  errorMsg = "Error 500: Interactive component failed to mount.";
              }
          } else {
              console.error(`[Terminal Error] .svx path '${docPath}' not found.`);
              errorMsg = "Error 404: Component not found in Vite bundle.";
          }
      } else {
          // --- ROUTE B: Handle Raw .md Files ---
            try {
                const rawText = await readMarkdownFile(doc);
                console.log(`[Terminal] Raw markdown loaded for ${doc}:`, rawText);
                if (rawText && !rawText.startsWith("ERROR")) {
                    // 1. Extract frontmatter and body
                    // Remove Byte Order Mark (\uFEFF) and trim leading/trailing invisible newlines/spaces
                    const cleanedText = rawText.replace(/^\uFEFF/, '').trim();
                    const parsedData: { attributes: any; body: string } = fm(cleanedText);
                    console.log(`[Terminal] Frontmatter parsed for ${doc}:`, parsedData.attributes);
                    // 2. Parse the body markdown to HTML
                    const htmlContent = await marked.parse(parsedData.body);
                    
                    // 3. Package everything up into an object for the Blog component
                    blogProps = {
                        title: parsedData.attributes.title || doc, // Fallback to filename
                        author: parsedData.attributes.author || "Unknown",
                        date: parsedData.attributes.date || "",
                        rawText: parsedData.body, // Used for word count
                        contentHtml: htmlContent
                    };
                } else {
                    throw new Error("File not found");
                }
            } catch (error) {
                console.error(`[Terminal Error] Failed to load markdown file at ${doc}`, error);
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
          <!-- 1. The Title Bar: Fixed at the top -->
           {#if isSvx && blogProps?.title}
            <div class="dialog-header">
                <Dialog.Title>
                        <ModalTitle title={blogProps.title} />
                </Dialog.Title>
                
            </div>
            {/if}
            <Dialog.Close class="dialog-close"><X /></Dialog.Close>
          <!-- 2. The Content Body: Scrollable area -->
          <Dialog.Description class="dialog-desc">
            {#if errorMsg}
               <p class="error-text">{errorMsg}</p>
               
            {:else if isSvx && MdComponent}
               <div id="markdown-content" class="markdown-body">
                 <svelte:component this={MdComponent} />
               </div>
               
            {:else if !isSvx && blogProps}
               <div id="markdown-content" class="md">
                    <!-- Assuming your Blog component handles the rest of the layout -->
                    <Blog {...blogProps} />
                </div>
               
            {:else}
               <p class="loading-text">Fetching {doc}...</p>
            {/if}
          </Dialog.Description>
          
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
