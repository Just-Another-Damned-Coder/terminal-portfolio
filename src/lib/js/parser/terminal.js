import { history, past_commands } from "$lib/js/constants.js";

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