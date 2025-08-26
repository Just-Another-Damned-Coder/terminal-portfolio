<script>
    import {COLORS, scheme} from '$lib/js/constants.js';
    const themeKeys = Object.keys(COLORS);

    function setTheme(key) {
        scheme.set(key)
    }

</script>

<div>
    {#each themeKeys as key}
        <button
            class="color-square"
            style="background-color: {COLORS[key].cyan}"
            aria-label="Select theme {key}"
            class:selected={$scheme === key}
            on:click={() => setTheme(key)}
        ></button>
    {/each}
</div>

<style>
.color-square{
    margin: 0%;
    margin-top: 2%;
    margin-bottom: 5%;
    width: 3rem;
    height: 3rem;
    border: none;
    cursor: pointer;
    border-radius: 0;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s, box-shadow 0.2s;
}
.color-square:hover,
.color-square.selected {
    opacity: 1;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
}

</style>