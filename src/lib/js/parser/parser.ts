import {history, past_commands, username} from '$lib/js/constants.js';
import { get } from 'svelte/store';

class CommandParser {
    available_commands: string[];
    pattern: RegExp; 

    constructor () {
        this.available_commands = ['ls','username', 'clear', 'whoami'];
        // Create a case-insensitive regex pattern from available commands
        this.pattern = new RegExp(`^(${this.available_commands.join('|')})$`, 'i');
    }
    hasCapitalLetters(text: string) {
        return /[A-Z]/.test(text);
    }
    check(text: string) {
        text = text.trim().split(/\s+/)[0];
        if (this.pattern.test(text)) {
            if (this.hasCapitalLetters(text)){
                return [false, ["ERROR", 2, "Misuse of shell builtins."]];
            }
            else return [true, text.match(this.pattern)![1]];
        }
        else{
            return [false, ["ERROR", 127, "Command not found."]]
        }
    }
    parse(text: string) {
        let value = this.check(text);
        if (value[0]) {
            switch (value[1]) {
                case 'username':
                    const result = text.match(/username (\w+)/);
                    if (!result) return null;
                    username.set(result[1] ?? "visitor");
                    return [true, ["SUCCESS", 0, "Username changed to" + result[1]]];
                default:
                    console.log("Unknown command.");
                }
        }
        else return value;
    }
}


let command_parser = new CommandParser();
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
    return command
}