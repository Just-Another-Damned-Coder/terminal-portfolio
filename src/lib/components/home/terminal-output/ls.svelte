<script lang="ts">
    export let list: string[];
</script>

<div class="row prompt-output ls">
    {#each list as key}
		<div>
            {key}
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