import {history, past_commands} from '$lib/js/constants.js';

export function echo(string) {
    if (string.match('rm -rf')) {
        return "lol!";
    }
    if (string.match('clear')) {
        history.set([]);
        past_commands.set([['', null, false]]);
        return null;
    }
    return string
}