import { writable, derived } from 'svelte/store';
/*
        COLOUR SCHEMES & TITLE PAGE
*/
// The JSON file contains the color themes for the pages, 
// The colors are taken from : https://windowsterminalthemes.dev/
// Add more to the JSON from the website.
// The website/terminal version.
export const version = "v1.1.0";
// The title of the username;
export const name = "Moris Johnson";
import COLORS from '$lib/color_schemes.json';
export {COLORS};
export type SchemeType = keyof typeof COLORS;
// initialize with your default theme key
export const scheme = writable<SchemeType>('Nvim');

export const tableHeightStore = writable(0);

/*
      TERMINAL
*/
export const username = writable("visitor");
export const pwd = writable("~/home");
export const clear = writable(false);
export const history = writable<string[]>([]);
export const past_commands = writable([['', null, true]])
export const LIMIT_HISTORY = 10;
export const LIMIT_PAST = 10;


/* Documentation
+ Available commands, links paths and other constants
*/

export const command_docs = {
      "clear": "Clear the output of the terminal.",
      "username": "Set your name as username Eg. username moris",
      "whoami": "Prints out your name, 'visitor' by default."
}
export type CommandType = keyof typeof command_docs;

export const ls_home = ["blogs/", "about.md", "contact.md", "github/"]