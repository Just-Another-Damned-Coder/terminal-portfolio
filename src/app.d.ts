// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		type CommandOutput = {type: string, name: string | null, parameters: object | string} 
		type PastCommands = [string, CommandOutput, false];
		type SchemeType = keyof typeof COLORS;
	}
}

export {};
