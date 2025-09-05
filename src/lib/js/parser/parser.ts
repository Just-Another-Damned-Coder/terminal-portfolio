import {username, empty, ls_home, available_commands, clear} from '$lib/js/constants.js';
import { get } from 'svelte/store';

class CommandParser {
    available_commands: string[];
    pattern: RegExp; 

    constructor () {
        this.available_commands = available_commands;
        // Create a case-insensitive regex pattern from available commands
        this.pattern = new RegExp(`^(${this.available_commands.join('|')})$`, 'i');
    }
    hasCapitalLetters(text: string) {
        return /[A-Z]/.test(text);
    }
    check(text: string): [boolean, string[]] | [boolean, string] {
        text = text.trim().split(/\s+/)[0];
        if (text == '') {
            return [true, 'enter'];
        }
        if (this.pattern.test(text)) {
            if (this.hasCapitalLetters(text)){
                return [false, ["ERROR", "2", "Misuse of shell built-ins. Did you mean '" + text.match(this.pattern)![1].toLocaleLowerCase() + "' ?" ]];
            }
            else return [true, text.match(this.pattern)![1]];
        }
        else{
            return [false, ["ERROR", "127", "Command not found."]]
        }
    }
    parse(text: string): App.CommandOutput {
        let value = this.check(text);
        console.log(value, text);
        // let var result;
        if (value[0]) {
            
            switch (value[1]) {
                case 'clear':
                    clear.set(true);
                case 'username':
                    const match = text.match(/username (?:(\w+)|'(.+)')/);
                    var newname = match?.[1] || match?.[2];
                    newname = newname?.toLocaleLowerCase().replace(/\s+/, '');
                    if (!newname) return  {
                        type: "component",
                        name: "ErrorCodes",
                        parameters: { codeType : "ERROR", code : " EINVAL 22", message: "Invalid argument."}
                        };;
                    username.set(newname ?? "visitor");
                    return {
                        type: "component",
                        name: "ErrorCodes",
                        parameters: { codeType : "SUCCESS", code : "", message: "Username changed to " + newname}
                    };
                case 'whoami':
                    return {
                        type: "text",
                        name: null,
                        parameters: get(username)
                    };
                case 'help':
                    return {
                        type: "component",
                        name: "Help",
                        parameters: {}
                    };
                case 'ls':
                    return {
                        type: "component",
                        name: "Ls",
                        parameters: {list: ls_home}
                    };
                case 'rm':
                    return{
                        type: "component",
                        name: "ErrorCodes",
                        parameters: { codeType : "ERROR", code : " EACCES 13", message: "Lol! Get good nerd."}
                    };
                default:
                    return {
                        type: "text",
                        name: null,
                        parameters: ''
                    };
                }
        }
        return {
                type: "component",
                name: "ErrorCodes",
                parameters: { codeType : value[1][0], code : value[1][1] , message: value[1][2]}
            };
    }
}


export let command_parser = new CommandParser();
