<script lang="ts">
    import { past_commands, history, clear, empty, username, pwd} from '$lib/js/constants';
	import { LIMIT_HISTORY, LIMIT_PAST } from '$lib/js/constants';
    import {PromptString, Help, Ls, ErrorCodes, History, Modal} from '$lib/components';
	const mapping = {
		'ErrorCodes': ErrorCodes,
		"Help" : Help,
		"Ls": Ls,
		"History": History,
		"Modal": Modal
	};
    $: {
		if ($clear){
			let date = new Date().toISOString().replace('T', ' ').slice(0, 19);
			past_commands.set([[$username, $pwd, '', empty, true, date]]);
			history.set([]);
			let text = document.querySelector(".command");
			if (text !== null) text.textContent = "";
			clear.set(false);
		}
		// limit on past_commands
		if ($past_commands.length > LIMIT_PAST) {
			let date = new Date().toISOString().replace('T', ' ').slice(0, 19);
			past_commands.set([[$username, $pwd, '', empty, true, date]]);
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
    editable={data[4] ? "false" : "true"}
	latest_username={data[0]}
	latest_pwd={data[1]}
  />

  <!-- type App.CommandOutput = {
    type: string;
    name: string | null;
    parameters: string[] | null;
} -->
	{#if data[3] && (data[3] as App.CommandOutput).type === 'component'}
    <!-- Render the mapped component -->
		{#if data[3].name && data[3].name in mapping}
			<svelte:component this={mapping[data[3].name]} {...data[3].parameters} />
		{/if}
			{#if data[3] && ((data[3] as App.CommandOutput).parameters as { codeType?: string })?.codeType === 'ERROR'}
				<div class="prompt-output">
					💡 Type 'help' to find more about available commands and use cases.
				</div>
			{/if}
		{:else}
			<div class="prompt-output">
				{data[3] ? (data[3] as App.CommandOutput).parameters : ''}
			</div>
	{/if}
{/each}