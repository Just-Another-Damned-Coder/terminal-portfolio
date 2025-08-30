import { history, past_commands } from "$lib/js/constants.js";
import { echo } from "$lib/js/parser/parser.js";

export function add(input, output) {
  history.update(h => [...h, input]);
  past_commands.update(pc => {
    const last = pc.length - 1;
    const next = pc.slice();
    next[last] = [input, output, false];
    next.push(['', null, true]);
    return next;
  });
}

export function handler(element) {

  element.setAttribute('contenteditable', 'true');
  element.focus();
  console.log("Editable set to true.")

  function autofocus(event) {
    console.log("You clicked");
    element.focus();
  }

  function handleEnter(event) {
    if (event.key === 'Enter') {
      console.log("You clicked enter", event.target.innerText.trim());
      let content = event.target.innerText.trim()
      event.preventDefault();
      if (content.match('clear')) {
          
          console.log("Clear was invoked.");
          history.set([]);
          past_commands.set([['', null, false]]);
          return;
      } else {
        let result = echo(content);
        add(content, result);
        element.removeAttribute('contenteditable');
        element.removeEventListener('keydown', handleEnter);
        element.removeEventListener('click', autofocus);
        element.blur();
      }
    }
  }

  element.addEventListener('keydown', handleEnter);
  element.addEventListener('click', autofocus);

  return {
    destroy() {
      element.removeEventListener('keydown', handleEnter);
      element.removeEventListener('click', autofocus);
    }
  };
}
