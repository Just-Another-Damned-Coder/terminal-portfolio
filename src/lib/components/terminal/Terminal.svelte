<script lang="ts">
    import { past_commands, history, clear, empty } from '$lib/js/constants';
	import { LIMIT_HISTORY, LIMIT_PAST } from '$lib/js/constants';
    import {PromptString, Help, Ls, ErrorCodes} from '$lib/components';
	const mapping = {
		'ErrorCodes': ErrorCodes,
		"Help" : Help,
		"Ls": Ls
	};
    $: {
		if ($clear){
			past_commands.set([['', empty, true]]);
			history.set([]);
			let text = document.querySelector(".command");
			if (text !== null) text.textContent = "";
			clear.set(false);
		}
		// limit on past_commands (clear if > LIMIT_PAST)
		if ($past_commands.length > LIMIT_PAST) {
			past_commands.set([['', empty, true]]);
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

{#each $past_commands as data: App.PastCommands}
  <PromptString
    editable={data[2] ? "false" : "true"}
  />

  <!-- type App.CommandOutput = {
    type: string;
    name: string | null;
    parameters: string[] | null;
} -->
	{#if (data[1] as App.CommandOutput).type === 'component'}
		<!-- Render the mapped component -->
		{#if data[1]?.name && data[1]?.name in mapping}
			<svelte:component this={mapping[data[1].name]} {...data[1].parameters} />
		{/if}
		{#if ((data[1] as App.CommandOutput).parameters as { codeType: string }).codeType == 'ERROR'}
			<div class="prompt-output">
				💡 Type 'help' to find more about available commands and use cases.
			</div>
		{/if}
	{:else}
		<div class="prompt-output">
			{(data[1] as App.CommandOutput).parameters}
		</div>
	{/if}
{/each}