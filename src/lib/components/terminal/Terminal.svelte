<script>
    import { past_commands } from '$lib/js/constants.js';
    import {PromptString} from '$lib/components';
</script>

{#each $past_commands as data}
  <PromptString
    input={data[0]}
    readonly={data[2] ? "true" : "false"}
  />
  {#if data[1]}
    <div class="prompt-output">
        {data[1]}
    </div>
  {/if}
{/each}