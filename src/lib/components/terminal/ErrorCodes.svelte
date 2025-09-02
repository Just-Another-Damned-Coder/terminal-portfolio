<script lang="ts">
    import { COLORS, scheme } from "$lib/js/constants";
    export let codeType: string;
    export let message: string;
    export let code: string;
    let color: string;
    if (codeType == 'SUCCESS') {
        color = COLORS[$scheme].green;
    }
    else {
        color = COLORS[$scheme].red;
    }
</script>

<div class="row prompt-output">
    {#if code}
        <span style="color:{color};margin-right:1%">{codeType}:{code}</span><span>{message}</span>
    {:else}
        <span style="color:{color};margin-right:1%">{codeType}</span><span>{message}</span>
    {/if}
</div>


<style>

</style>