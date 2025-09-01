<script lang='ts'>
    import {COLORS, scheme, tableHeightStore} from '$lib/js/constants'
    import type {SchemeType} from '$lib/js/constants';
    import { applyTheme } from '$lib/js/utils/SVG';
    const themeKeys = Object.keys(COLORS) as SchemeType[];
    $: {
        applyTheme(COLORS[$scheme]);
        console.log($scheme)
    }

</script>

<div>
    {#each themeKeys as key}
        <button
            class="color-square"
            style="background-color: {COLORS[key].cyan}; width:{$tableHeightStore/9}px;height:{$tableHeightStore/9}px"
            aria-label="Select theme {key}"
            class:selected={$scheme === key}
            on:click={() => (scheme.set(key))}
        ></button>
    {/each}
</div>

<style>
.color-square{
    margin: 0%;
    margin-top: 2%;
    margin-bottom: 5%;
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