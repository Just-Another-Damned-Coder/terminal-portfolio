<script>
    import { past_commands, history, clear, ls_home } from '$lib/js/constants';
	import { LIMIT_HISTORY, LIMIT_PAST } from '$lib/js/constants';
    import {PromptString, Help, Ls, ErrorCodes} from '$lib/components';

    $: {
		if ($clear){
			past_commands.set([['', null, true]]);
			history.set([]);
			let text = document.querySelector(".command");
			if (text !== null) text.textContent = "";
			clear.set(false);
		}
		// limit on past_commands (clear if > LIMIT_PAST)
		if ($past_commands.length > LIMIT_PAST) {
			past_commands.set([['', null, true]]);
			console.log("clearing past commands", $past_commands) ;
			let text = document.querySelector(".command");
			if (text !== null) text.textContent = "";
		}

		// max size of LIMIT_HISTORY for history
		if ($history.length > LIMIT_HISTORY) {
			// Keep last LIMIT_HISTORY entries
			history.set($history.slice(-LIMIT_HISTORY));
			console.log("history reset.", $history) ;
		}
      }
</script>

{#each $past_commands as data, i (i)}
  <PromptString
    editable={data[2] ? "false" : "true"}
  />
  {#if data[1]}
	{#if data[1] == 'help'}
		<Help />
	{:else if data[1] == 'ls'}
		<Ls list={ls_home} />
		<ErrorCodes codeType="SUCESSS" message="Executed Sucessfully" />
	{:else}
		<div class="prompt-output">
			{data[1]}
		</div>
	{/if}
  {/if}
{/each}