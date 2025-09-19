<script lang="ts">
    import { Dialog, Label, Separator } from "bits-ui";
    import { onMount } from "svelte";
    import { X} from '@lucide/svelte';
    // import HelpMd from '../lib/docs/help.md';
    export let trigger;
    export let mdPath; // e.g. "../../posts/example.md"

    let MdComponent = null;

    onMount(async () => {
        if (mdPath) {
            const module = await import(mdPath);
            console.log(module);
            MdComponent = module.default;
        }
    });
</script>

<Dialog.Root>
    <Dialog.Trigger>
        {trigger}
    </Dialog.Trigger>
    <Dialog.Portal>
        <Dialog.Overlay class="fullscreen-overlay" />
        <Dialog.Content class="fullscreen-content">
            <Dialog.Title />
            <Dialog.Description />
            {#if MdComponent}
                <svelte:component this={MdComponent} />
            {:else}
                <!-- <p>Loading...</p> -->
            {/if}

            <Dialog.Close><X /></Dialog.Close>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>

<style>
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
        justify-content: center; /* adjust as needed */
        align-items: center;     /* adjust as needed */ 
        overflow: auto;
    }
</style>