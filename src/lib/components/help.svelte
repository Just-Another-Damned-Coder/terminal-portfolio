<script lang="ts">
    import { command_docs, type CommandType } from "$lib/js/constants";
    const keys = Object.keys(command_docs) as CommandType[];
</script>

<div class="command-list">
    <div>
        Here is a list of commands you can try/type.
        <hr style="color:var(--background);margin:1vh">
    </div>
    {#each keys as key}
		<div class="docs-column">
            <div class="cmd">{key}</div>
            <div class="sep">--&nbsp;</div>
            <div class="desc">{command_docs[key]}</div>
        </div>
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

</style>