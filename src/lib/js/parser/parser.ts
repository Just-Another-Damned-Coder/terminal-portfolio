import {history, past_commands, username} from '$lib/js/constants.js';
import { get } from 'svelte/store';
export function echo(command: string): string | null {
    if (command.match('rm -rf')) {
        return "lol!";
    }
    if (command.match(/username (\w+)/)) {
        const result = command.match(/username (\w+)/);
        if (!result) return null;
        username.set(result[1] ?? "visitor");
        return "Username changed to " + (result[1] ?? "visitor");
    }
    if (command.match(/whoami/)) {;
        return get(username);
    }
    if (command.match('clear')) {
        history.set([]);
        past_commands.set([['', null, false]]);
        return null;
    }
    return command
}