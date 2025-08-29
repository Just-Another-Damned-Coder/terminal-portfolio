import { writable, derived } from 'svelte/store';
/*
        COLOUR SCHEMES & TITLE PAGE
*/
// The JSON file contains the color themes for the pages, 
// The colors are taken from : https://windowsterminalthemes.dev/
// Add more to the JSON from the website.
import COLORS from '$lib/color_schemes.json';
export {COLORS};
// initialize with your default theme key
export const scheme = writable('Argonaut');
// The website/terminal version.
export const version = "v1.0.1a";
export const tableHeightStore = writable(0);

/*
      TERMINAL
*/
export const username = writable("visitor");
export const pwd = writable("~/home");
export var history = writable([]);
export var past_commands = writable([['', null, false]])