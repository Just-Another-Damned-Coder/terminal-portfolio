import { writable, derived } from 'svelte/store';
/*
        COLOUR SCHEMES & TITLE PAGE
*/
// The JSON file contains the color themes for the pages, 
// The colors are taken from : https://windowsterminalthemes.dev/
// Add more to the JSON from the website.
// The website/terminal version.
export const version = "v1.2.0";
// The title of the username;
export const name = "Moris Johnson";
import COLORS from '$lib/color_schemes.json';
export {COLORS};
export type SchemeType = keyof typeof COLORS;
// initialize with your default theme key
export const scheme = writable<SchemeType>('Argonaut');

export const tableHeightStore = writable(0);

/*
      TERMINAL
*/
export const username = writable("visitor");
export const pwd = writable("~/home");
export const clear = writable(false);
export const history = writable<string[]>([]);
export let empty: App.CommandOutput = {type: "text", name: null, parameters: ""} 
export const past_commands = writable([['', empty, true]])
export const LIMIT_HISTORY = 10;
export const LIMIT_PAST = 10;


/* Documentation
+ Available commands, links paths and other constants
*/

export const command_docs = {
      "clear": "Clear the output of the terminal.",
      "ls": "List the files and directories in current path.",
      "username": "Set your name as username Eg. username moris",
      "whoami": "Prints out your name, 'visitor' by default."
}
export const animation_text = "Click and type here or Type 'help'.";
export const animation_speed = 200; // This is speed in milliseconds, speed per character I believe.
export type CommandType = keyof typeof command_docs;
export const available_commands = ['ls','username', 'clear', 'whoami', 'help', 'rm7'];
export const ls_home = [["blog/", "link", "/blog"], ["about.md", "text"], ["contact.md", "text"], ["github/", "link", "https://github.com/Just-Another-Damned-Coder"]]