<script>
    import {Avatar, Title, ThemeSelector, DisplayInfo, PromptString} from "$lib/components";
    import {tableHeightStore, past_commands} from '$lib/js/constants.js';
    let tableHeight;
    $: if (tableHeight) {
        tableHeightStore.set(tableHeight);
    }
</script>



<div class="column">
    <Title />
    <div class="row">
        <Avatar />
        <div class="column" bind:clientHeight={tableHeight}>
            <DisplayInfo />
            <ThemeSelector />
        </div>
    </div>
</div>
{#each $past_commands as data}
  <PromptString
    input={data[0]}
    readonly={data[2] ? "true" : "false"}
  />
  {#if data[1]}
    <div>
        {data[1]}
    </div>
  {/if}
{/each}