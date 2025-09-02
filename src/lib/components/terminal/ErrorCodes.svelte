<script lang="ts">
    import { COLORS, scheme } from "$lib/js/constants";
    export let codeType: string;
    export let message: string;
</script>

<div class="row prompt-output">
    <span style="color:{COLORS[$scheme].green};margin-right:1%">{codeType}</span><span>{message}</span>
</div>


<style>

</style>