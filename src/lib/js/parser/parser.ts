import * as Constants from '$lib/js/constants.js';
import { get } from 'svelte/store';

// Type aliases.
type ErrorData = [string, string, string];
type CheckResult = [true, string] | [false, ErrorData];

class Parser {
    private available_commands: Set<string>;

    constructor() {
        this.available_commands = new Set(Object.keys(Constants.COMMANDS));
    }

    private hasCapitalLetters(text: string): boolean {
        return /[A-Z]/.test(text);
    }

    check(text: string): CheckResult {
        const cmd = text.trim().split(/\s+/)[0];
        
        if (!cmd) return [true, 'enter'];

        const lowercase_command = cmd.toLowerCase();

        if (this.available_commands.has(lowercase_command)) {
            // checking for strict lowercase usage
            if (this.hasCapitalLetters(cmd)) {
                return [false, ["ERROR", "2", `Misuse of shell built-ins. Did you mean '${lowercase_command}'?`]];
            }
            return [true, lowercase_command];
        }

        return [false, ["ERROR", "127", "Command not found."]];
    }

    parse(text: string): App.CommandOutput {
        const [isValid, payload] = this.check(text);
        
        if (!isValid) {
            const [codeType, code, message] = payload as ErrorData;
            return {
                type: "component",
                name: "ErrorCodes",
                parameters: { codeType, code, message }
            };
        }

        const command_name = payload as string;
        if (command_name === 'enter') return Constants.empty;

        const config = (Constants.COMMANDS as any)[command_name];
        if (!config) return Constants.empty;

        // extract Arguments for the output of the command.
        let extractedArg: string | null = config.defaultArg || null;
        if (config.argRegex) {
            const match = text.match(new RegExp(config.argRegex));
            if (match) extractedArg = match[1];
        }

        if (config.updateStore) {
            const store = (Constants as any)[config.updateStore]; 
            store?.set?.(extractedArg !== null ? extractedArg : config.storeValue);
        }

        switch (config.returns) {
            case 'empty':
                return Constants.empty;

            case 'text': {
                const textOutput = config.readStore 
                    ? get((Constants as any)[config.readStore]) 
                    : config.textContent || '';
                return { type: "text", name: null, parameters: textOutput };
            }

            case 'component': {
                const params: Record<string, any> = { ...config.parameters };

                if (config.injectConstant) {
                    params[config.injectConstant.paramKey] = (Constants as any)[config.injectConstant.constantName];
                }
                
                if (config.injectStore) {
                    const store = (Constants as any)[config.injectStore.storeName];
                    params[config.injectStore.paramKey] = get(store);
                }
                

                if (config.messageTemplate) {
                    // If we have an arg, replace it; otherwise, just use the template string
                    params.message = extractedArg !== null 
                        ? config.messageTemplate.replace('{arg}', extractedArg) 
                        : config.messageTemplate;
                }

                return {
                    type: "component",
                    name: config.componentName,
                    parameters: params
                };
            }

            default:
                return Constants.empty;
        }
    }
}


export const command_parser = new Parser();