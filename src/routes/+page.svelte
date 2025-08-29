<script>
    import {Avatar, Title, ThemeSelector, DisplayInfo, PromptString} from "$lib/components";
    import {tableHeightStore} from '$lib/js/constants.js';
    let tableHeight;
    $: if (tableHeight) {
        tableHeightStore.set(tableHeight);
        console.log("Table Height changed", tableHeight);
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
<div>
    <PromptString />
</div>