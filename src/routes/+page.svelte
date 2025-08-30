<script>
    import {Avatar, Title, ThemeSelector, DisplayInfo, Terminal} from "$lib/components";
    import {tableHeightStore} from '$lib/js/constants.js';
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

<Terminal />