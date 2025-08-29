<script>
    import {COLORS, scheme, username, pwd} from '$lib/js/constants.js';
    import {onMount, tick} from 'svelte';
    let area, prompt;
    onMount (async () => {
        await tick();
        if (prompt) prompt.addEventListener('click', () => {
            area.focus();
        });
        area.addEventListener('keydown', (event) => {
            if (event.key == "Enter") {
                event.preventDefault();
                const content = event.target.innerText.trim();
            }
        });
    })

    
</script>

<span class="prompt-string" bind:this={prompt}>
  <span contenteditable="false" style="color:{COLORS[$scheme].green}">{$username}@morisjohnson.in</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlue}">:{$pwd}</span>
  <span contenteditable="false" style="color:{COLORS[$scheme].brightBlack}">$</span>
  <span bind:this={area} contenteditable="true" class="command"></span>
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