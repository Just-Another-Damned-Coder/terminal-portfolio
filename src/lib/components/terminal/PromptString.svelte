<script>
    import {COLORS, scheme, username, pwd, history, past_commands} from '$lib/js/constants.js';
    import {echo} from '$lib/js/parser/parser.js'
    import {add} from '$lib/js/parser/terminal.js';
    import {onMount, tick} from 'svelte';
    let area, prompt, input;
    let editable = true;
    onMount (async () => {
        await tick();
        if (prompt) prompt.addEventListener('click', () => {
            area.focus();
        });
        area.addEventListener('keydown', (event) => {
            if (event.key == "Enter") {
                event.preventDefault();
                const content = event.target.innerText.trim();
                const result = echo(content)
                add(content, result);
                console.log("Input", $history, $past_commands);
                event.target.contentEditable = "false";
            }
        });
    })

    
</script>

<span class="prompt-string" contenteditable="false" bind:this={prompt}>
  <span style="color:{COLORS[$scheme].green}">{$username}@morisjohnson.in</span>
  <span style="color:{COLORS[$scheme].brightBlue}">:{$pwd}</span>
  <span style="color:{COLORS[$scheme].brightBlack}">$</span>
  <span bind:this={area} contenteditable="{editable ? "true" : undefined}" class="command"></span>
   <!-- <input
        bind:this={area}
        readonly={!editable}
        class="command"
        value={input}
        on:input={(e) => input = e.target.value}
    /> -->
</span>

<style>
  .prompt-string {
    margin-top: 1%;
    margin-right: 2%;
    margin-left: 2%;
    font-size: calc(1vw);
    justify-content: left;
    align-items: baseline;
    outline: none;
    box-shadow: none;
    word-break: break-word;
    overflow-wrap: break-word;

  }
  .command {
    margin-left: 1%;
    overflow-wrap: break-word; 
    white-space: pre-wrap; 
    height: 1em;
    word-break: break-word;
    overflow-wrap: break-word;
    cursor: pointer;
    max-width: 100%;
  }

  .command:focus {
    /* Remove any default focus styling */
    outline: none;
    box-shadow: none;
    border-color: inherit
  }

/* Mobile Screen CSS */
@media (max-width: 599px) {
    .prompt-string {
      font-size: 2vw;
    }
}
/* Tab Screen CSS */
@media (min-width: 600px) and (max-width: 899px) {
    .prompt-string {
        font-size: 2vw;
    }
}
</style>