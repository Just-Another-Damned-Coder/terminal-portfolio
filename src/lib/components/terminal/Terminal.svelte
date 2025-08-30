<script>
    import { past_commands, history, clear } from '$lib/js/constants.js';
    import {PromptString} from '$lib/components';
    // Log past_commands whenever it changes
    $: if ($clear){
      past_commands.set([['', null, true]]);
      history.set([]);
      let text = document.querySelector(".command");
      text.textContent = "";
      text.innerHTML = text.innerHTML.replace(/<br>/g, ''); // Remove all <br> tags
      console.log(text.innerHTML);
      clear.set(false);
    }
</script>

{#each $past_commands as data, i (i)}
  <PromptString
    editable={data[2] ? "false" : "true"}
  />
  {#if data[1]}
    <div class="prompt-output">
        {data[1]}
    </div>
  {/if}
{/each}