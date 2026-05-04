<script lang="ts">
    export let command_history: any[]= [];
    console.log("Command history:", command_history);
</script>

<div class="command-list">
    {#each command_history as cmd, i}
        {#if cmd[2] && cmd[2].trim() !== ""}
            <div class="docs-column">
                <!-- Render the timestamp -->
                <div class="cmd timestamp">{cmd[5]}</div>
                <div class="sep">&nbsp;</div>
                <div class="desc">{cmd[2]}</div>
            </div>
        {/if}
    {/each}

</div>


<style>
    .command-list {
        font-size: var(--font-size); /* match your terminal font size */
        margin-left: 2%;
        color: var(--foreground);
    }
    .docs-column {
        display: flex;
        flex-direction: row;
    }
    .cmd, .sep, .desc {
        white-space: nowrap;
    }
    .cmd {
        min-width: 15vw;
        flex-shrink: 0;
    }
    .timestamp {
        color: var(--muted-foreground);
        opacity: 0.6;
    }
</style>