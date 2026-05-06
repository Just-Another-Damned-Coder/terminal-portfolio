import { get, writable } from 'svelte/store';
/*
        COLOUR SCHEMES & TITLE PAGE
*/
// The JSON file contains the color themes for the pages, 
// The colors are taken from : https://windowsterminalthemes.dev/
// Add more to the JSON from the website.
// The website/terminal version.
export const version = "v1.3.1";
// The title of the username;
export const name = "Moris Johnson";


// Constants for the application, color schemes and command list
// Used for theme switching and command parser.
import COLORS from '$lib/data/color_schemes.json';
import COMMANDS from '$lib/data/commands.json';
import command_docs from '$lib/data/help.json';
import FILELIST from '$lib/data/filesystem.json';
export {COLORS, COMMANDS, command_docs, FILELIST};
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
let date = new Date().toISOString().replace('T', ' ').slice(0, 19);
export let empty: App.CommandOutput = {type: "text", name: null, parameters: ""} 
export const past_commands = writable([[get(username), get(pwd), '', empty, true, date]])
export const LIMIT_HISTORY = 30;
export const LIMIT_PAST = 30;


/* Documentation
+ Available commands, links paths and other constants
*/

export const available_commands = Object.keys(command_docs)