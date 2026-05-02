<script lang="ts">
    import { Modal } from '$lib/components';
    export let list: Record<string, { type: string; href?: string; doc?: string }>;
    const entries = Object.entries(list);
</script>

<div class="row prompt-output ls">
    
    {#each entries as [key, value]}
        {#if value.type === 'link'}
            <div>
                <a href={value.href} target="_blank" rel="noopener">
                    {key}
                </a>
            </div>
        {:else if value.type === 'modal' && value.doc}
            <div>
                <Modal doc={value.doc} docPath={value.docPath} triggerText={key} />
            </div>
        {:else if value.type === 'directory'}
            <div>
                {key}
            </div>
        {/if}
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