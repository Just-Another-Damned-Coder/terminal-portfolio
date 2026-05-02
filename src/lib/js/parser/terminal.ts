import { get } from "svelte/store";
import { history, past_commands, username, pwd, empty } from "$lib/js/constants.js";
import { command_parser } from "$lib/js/parser/parser.js";

export function add(input: string, output: App.CommandOutput): void {
  // 1. Update the plain text history for up/down arrow usage
  history.update(h => [...h, input]);

  past_commands.update(pc => {
    const lastIndex = pc.length - 1;
    const next = [...pc];
    
    // 2. Extract the user and path that were active when this line started.
    // This prevents "visitor" from changing to "mors" on the same line.
    const [originalUser, originalPath] = next[lastIndex];

    // 3. Close the previous line using its original metadata
    next[lastIndex] = [originalUser, originalPath, input, output, false];

    // 4. Push the new line using the CURRENT store values (which the parser may have changed)
    next.push([get(username), get(pwd), '', empty, true]);

    return next;
  });
}

export function handler(element: HTMLElement, params: {active: boolean}) {
  element.setAttribute('contenteditable', params?.active ? 'true' : 'false');
  if (params.active) element.focus();

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault(); // avoid newline in contenteditable
      const content = element.innerText.trim();
      const result = command_parser.parse(content);
      add(content, result?? empty);
      console.log(result);
      element.contentEditable = 'false';
      element.removeEventListener('keydown', onKeydown);
      element.blur();
    }
  }

  element.addEventListener('keydown', onKeydown);

  return {
    update(params: {active: boolean}) {
      element.setAttribute('contenteditable', params.active ? 'true' : 'false');
      if (params.active) element.focus();
      element.addEventListener('keydown', onKeydown);
    },
    destroy() {
      element.removeEventListener('keydown', onKeydown);
    }
  };
}
