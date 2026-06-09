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

    private parseArgs(text: string): string[] {
        const args: string[] = [];
        const trimmed = text.trim();
        let i = 0;
        let current = '';

        // Skip the first word (the command name)
        while (i < trimmed.length && trimmed[i] !== ' ') i++;
        if (i < trimmed.length) i++;

        while (i < trimmed.length) {
            const ch = trimmed[i];

            if (ch === "'" || ch === '"') {
                const quote = ch;
                i++;
                while (i < trimmed.length && trimmed[i] !== quote) {
                    current += trimmed[i];
                    i++;
                }
                if (i < trimmed.length) i++;
                if (current) {
                    args.push(current);
                    current = '';
                }
            } else if (ch === ' ') {
                if (current) {
                    args.push(current);
                    current = '';
                }
                i++;
            } else {
                current += ch;
                i++;
            }
        }

        if (current) args.push(current);

        return args;
    }

    private hasCapitalLetters(text: string): boolean {
        return /[A-Z]/.test(text);
    }

    private check_directory(current: string, target: string): string {
        if (!target || target === "~" || target === "~/home") return "~/home";

        // Determine starting point based on absolute (~/) or relative path
        const baseParts = target.startsWith('~/') ? ['~', 'home'] : current.split('/');
        const targetParts = target.startsWith('~/') ? target.slice(2).split('/') : target.split('/');

        // Resolve each segment of the path
        for (const part of targetParts) {
            if (part === '' || part === '.') continue; // Ignore empty segments and current dir (./)
            
            if (part === '..') {
                // Pop the last directory, but prevent escaping the root '~/home'
                if (baseParts.length > 1) {
                    baseParts.pop();
                }
            } else {
                baseParts.push(part);
            }
        }

        return baseParts.join('/');
    }

    /**
     * Standardizes directory error generation.
     */
    private dirError(cmd: string, target: string, code: string, type: 'not_found' | 'not_dir' = 'not_found', ) {
        const errorMsg = type === 'not_dir' 
            ? `${cmd}: ${target}: Not a directory` 
            : `${cmd}: ${target}: No such file or directory`;

        return {
            type: "component",
            name: "ErrorCodes",
            parameters: { codeType: "ERROR", code: code, message: errorMsg }
        };
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
        
        // Extract context for dynamic commands
        const currentPath = get(Constants.pwd);
        const args = this.parseArgs(text);
        const target = args[0];

        // --- Dynamic CD Implementation ---
        if (command_name === 'cd') {
            const newPath = this.check_directory(currentPath, target);
            
            // 1. Check if it is a valid directory
            if (get(Constants.FILELIST)[newPath]) {
                Constants.pwd.set(newPath);
                return Constants.empty;
            }

            // 2. If it's not a directory, check if it exists as a file
            const lastSlashIndex = newPath.lastIndexOf('/');
            const parentPath = lastSlashIndex > 0 ? newPath.substring(0, lastSlashIndex) : "~/home";
            const itemName = newPath.substring(lastSlashIndex + 1);
            
            const parentDir = get(Constants.FILELIST)[parentPath];
            const isFile = parentDir && (parentDir[itemName] || parentDir[`${itemName}/`]);

            if (isFile) {
                // Target is a file, throw "Not a directory"
                return this.dirError('cd', target, '20', 'not_dir');
            }

            // 3. Target doesn't exist at all
            return this.dirError('cd', target || '~', '2', 'not_found');
        }

        // --- Dynamic LS Implementation ---
        if (command_name === 'ls') {
            const lookupPath = target ? this.check_directory(currentPath, target) : currentPath;
            
            // Verify path exists before listing
            if (!get(Constants.FILELIST)[lookupPath]) {
                return this.dirError('ls', target, '2', 'not_found');
            }

            return {
                type: "component",
                name: "Ls",
                parameters: { list: get(Constants.FILELIST)[lookupPath] }
            };
        }

        if (command_name === 'date') {
            return { 
                type: "text", 
                name: null, 
                parameters: new Date().toString() 
            };
        }
        // Handle clear command directly in the parser to reset history and past commands
        if (command_name === 'clear') {
            // Don't manipulate past_commands here — just signal via the store.
            // The Terminal.svelte reactive block + add() will handle the new prompt.
            Constants.clear.set(true);
            return Constants.empty;
        }
        // --- Dynamic VIM Implementation ---
        if (command_name === 'vim') {
            if (!target) {
                return { type: "text", name: null, parameters: "vim: missing file operand" };
            }

            // 1. Resolve the full path and split into directory and filename
            const fullPath = this.check_directory(currentPath, target);
            const lastSlashIndex = fullPath.lastIndexOf('/');
            const parentPath = lastSlashIndex > 0 ? fullPath.substring(0, lastSlashIndex) : "~/home";
            const fileName = fullPath.substring(lastSlashIndex + 1);

            // 2. Access the filesystem constants
            const parentDir = get(Constants.FILELIST)[parentPath];
            const fileData = parentDir ? parentDir[fileName] : null;

            // 3. Validate file exists and is openable in a modal
            if (fileData && fileData.type === 'modal') {
                return {
                    type: "component",
                    name: "Modal",
                    parameters: { 
                        doc: fileData.doc, 
                        docPath: fileData.docPath, 
                        triggerText: fileName,
                        open: true, // Pass a prop to open it automatically
                        hideTrigger: true // Hide the trigger button
                    }
                };
            }

            // 4. Handle errors (not a file or not found)
            if (fileData && fileData.type !== 'modal') {
                return { type: "text", name: null, parameters: `vim: ${target}: Not a text file` };
            }

            return this.dirError('vim', target, '2', 'not_found');
        }

        const config = (Constants.COMMANDS as any)[command_name];
        if (!config) return Constants.empty;

        // extract Arguments for the output of the command.
        let extractedArg: string | null = config.defaultArg || null;
        if (config.argRegex) {
            const match = text.match(new RegExp(config.argRegex));
            if (match) extractedArg = match[1];
        }

        if (command_name === 'username' && extractedArg) {
            // Remove quotes, lowercase everything, and remove all spaces
            extractedArg = extractedArg.replace(/['"]/g, '').toLowerCase().replace(/\s+/g, '');
        }

        if (config.updateStore) {
            const store = (Constants as any)[config.updateStore]; 
            store?.set?.(extractedArg !== null ? extractedArg : config.storeValue);
        }

        switch (config.returns) {
            case 'empty':
                return Constants.empty;

            case 'text': {
                // If the textContent is a placeholder, return the argument
                if (config.textContent === "{arg}") {
                    return { type: "text", name: null, parameters: extractedArg || '' };
                }
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