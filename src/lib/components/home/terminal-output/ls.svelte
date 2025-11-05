<script lang="ts">
    import {About} from '$lib/components';
    export let list: Record<string, { type: string; href?: string }>;
    const entries = Object.entries(list);
    function openModal(filename: string) {
        alert(`Open modal: ${filename}`);
    }
</script>

<div class="row prompt-output ls">
    
    {#each entries as [key, value]}
        {#if value.type === 'link'}
            <div>
                <a href={value.href} target="_blank" rel="noopener">
                    {key}
                </a>
            </div>
        {:else if value.type === 'modal'}
            <div>
                <About/>
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