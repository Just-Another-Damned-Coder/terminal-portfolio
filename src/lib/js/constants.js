import { writable, derived } from 'svelte/store';

// The JSON file contains the color themes for the pages, 
// The colors are taken from : https://windowsterminalthemes.dev/
// Add more to the JSON from the website.
import COLORS from '$lib/color_schemes.json';
// initialize with your default theme key
export const scheme = writable('Argonaut');
// The website/terminal version.
const version = "v1.0.1a";
export const svgcolors = derived(scheme, $scheme => ({
  fill: {
    glasses: COLORS[$scheme].cyan,
    moustache: COLORS[$scheme].foreground,
    hair: COLORS[$scheme].foreground,
    group: COLORS[$scheme].foreground
  },
  stroke: {
    group: COLORS[$scheme].background
  }
}));

export const tableHeightStore = writable(0);
export {COLORS, version};
