<script lang="ts">
    export let list: string[];
    import { Dialog, Label, Separator } from "bits-ui";
    import { X, Lock} from '@lucide/svelte';
</script>

<div class="row prompt-output ls">
    {#each list as key}
		<div>
            {#if (key[1] == "link")}
                <!-- <a href="blog">{key[0]}</a> -->
                 <Dialog.Root>
                    <Dialog.Trigger>
                    {key[0]} Hi
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                        <Dialog.Title />
                        <Dialog.Description />
                        <Dialog.Close />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            {:else}
                {key[0]}
            {/if}
        </div>
    {/each}
</div>

<style>
    .ls {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 5%;
    }
</style>