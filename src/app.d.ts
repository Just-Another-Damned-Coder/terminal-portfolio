// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		type PastCommands = [string, string, false];
		type SchemeType = keyof typeof COLORS;
	}
}

export {};
