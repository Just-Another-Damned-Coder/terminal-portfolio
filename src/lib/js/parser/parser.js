import {history, past_commands, username} from '$lib/js/constants.js';
import { get } from 'svelte/store';
let user_pattern = new RegExp("username (\w+)");
export function echo(string) {
    if (string.match('rm -rf')) {
        return "lol!";
    }
    if (string.match(/username (\w+)/)) {
        const result = string.match(/username (\w+)/);
        console.log(result);
        username.set(result[1]);
        return "Username changed to " + result[1];
    }
    if (string.match(/whoami/)) {;
        return get(username);
    }
    if (string.match('clear')) {
        history.set([]);
        past_commands.set([['', null, false]]);
        return null;
    }
    return string
}