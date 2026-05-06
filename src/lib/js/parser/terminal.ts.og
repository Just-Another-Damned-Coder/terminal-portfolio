import { get } from "svelte/store";
import { history, past_commands, username, pwd, empty, COMMANDS } from "$lib/js/constants.js";
import { command_parser } from "$lib/js/parser/parser.js";

export function add(input: string, output: App.CommandOutput): void {
  // 1. Update the plain text history for up/down arrow usage
  history.update(h => [...h, input]);

  past_commands.update(pc => {
    const lastIndex = pc.length - 1;
    const next = [...pc];
    
    const [originalUser, originalPath, _c, _o, _e, originalTime] = next[lastIndex];

    // Close the previous line using its original metadata
    next[lastIndex] = [originalUser, originalPath, input, output, false, originalTime];

    // new line using the CURRENT store values (which the parser may have changed)
    let date = new Date().toISOString().replace('T', ' ').slice(0, 19);
    next.push([get(username), get(pwd), '', empty, true, date]);

    return next;
  });
}

export function handler(element: HTMLElement, params: {active: boolean}) {
  element.setAttribute('contenteditable', params?.active ? 'true' : 'false');
  if (params.active) element.focus();

  let historyIndex = -1;
  const availableCommands = Object.keys(COMMANDS);

  function onKeydown(e: KeyboardEvent) {

    const historyList = get(history);

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyList.length > 0) {
        // Move back in history
        if (historyIndex === -1) {
          historyIndex = historyList.length - 1;
        } else if (historyIndex > 0) {
          historyIndex--;
        }
        element.innerText = historyList[historyIndex];
        placeCaretAtEnd(element);
      }
    } 
    
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        if (historyIndex < historyList.length - 1) {
          // Move forward in history
          historyIndex++;
          element.innerText = historyList[historyIndex];
        } else {
          // Reached end; return ''
          historyIndex = -1;
          element.innerText = '';
        }
        placeCaretAtEnd(element);
      }
    }
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

  // ensure the cursor stays at the end of the text
  function placeCaretAtEnd(el: HTMLElement) {
    const range = document.createRange();
    const sel = globalThis.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
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
