import { history, past_commands, clear } from "$lib/js/constants.js";
import { echo } from "$lib/js/parser/parser.js";

export function add(input: string, output: string): void{
  history.update(h => [...h, input]);
  past_commands.update(pc => {
    const last = pc.length - 1;
    const next = pc.slice();
    next[last] = [input, output, false];
    next.push(['', null, true]);
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

      if (/^clear$/i.test(content)) {
        clear.set(true);
      }
      else {
        const result = echo(content);
        add(content, result?? "");
        element.contentEditable = 'false';
        element.removeEventListener('keydown', onKeydown);
        element.blur();
      } 
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
