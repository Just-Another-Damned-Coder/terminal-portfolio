import { get } from "svelte/store";
import { history, past_commands, username, pwd, empty, COMMANDS } from "$lib/js/constants.js";
import { command_parser } from "$lib/js/parser/parser.js";

export function add(input: string, output: App.CommandOutput): void {
  history.update(h => [...h, input]);

  past_commands.update(pc => {
    const next = [...pc];
    const lastIndex = next.length - 1;
    
    // FIX: Only close the previous line if it actually exists!
    // (The 'clear' command makes lastIndex evaluate to -1)
    if (lastIndex >= 0) {
        const [originalUser, originalPath, _c, _o, _e, originalTime] = next[lastIndex];
        next[lastIndex] = [originalUser, originalPath, input, output, false, originalTime];
    }

    // Push the fresh, new prompt line
    let date = new Date().toISOString().replace('T', ' ').slice(0, 19);
    next.push([get(username), get(pwd), '', empty, true, date]);

    return next;
  });
}


class TerminalHandler {
    private element: HTMLElement;
    private historyIndex: number = -1;
    private animInterval: number | null = null;
    private originalText: string = '';
    private animText: string = '';
    private animIndex: number = 0;
    private ghostSpan: HTMLSpanElement | null = null;

    constructor(element: HTMLElement, active: boolean) {
        this.element = element;
        // Bind methods to preserve 'this' context FIRST
        this.onKeydown = this.onKeydown.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        // Then call setActive which will handle both focusing and event listeners
        this.setActive(active); 
    }

    private clearAnimation() {
        if (this.animInterval !== null) {
            clearInterval(this.animInterval);
            this.animInterval = null;
        }
        if (this.ghostSpan && this.element.contains(this.ghostSpan)) {
            this.element.removeChild(this.ghostSpan);
        }
        this.ghostSpan = null;
    }

    private onFocus() {
        this.clearAnimation();
        this.element.innerText = this.originalText || '\u00A0';
        this.placeCaretAtEnd();
    }

    private onBlur() {
        this.clearAnimation();
        
        let baseText = this.element.innerText;
        if (baseText === '\u00A0' || baseText.trim() === '') {
            this.originalText = '';
            baseText = '';
            this.animText = "Click here to type and enter to execute the command..";
        } else {
            this.originalText = baseText;
            this.animText = " Click here and continue typing..";
        }
        
        this.element.innerText = baseText; // ensure base text is clean
        this.ghostSpan = document.createElement('span');
        this.ghostSpan.className = 'ghost-text';
        this.ghostSpan.innerText = baseText ? '' : '\u00A0';
        this.element.appendChild(this.ghostSpan);
        
        this.animIndex = 0;
        this.animInterval = window.setInterval(() => {
            this.animIndex++;
            
            if (this.animIndex <= this.animText.length) {
                if (this.ghostSpan) this.ghostSpan.innerText = this.animText.substring(0, this.animIndex);
            } else if (this.animIndex > this.animText.length + 40) { // pause for 2 seconds (40 * 50ms) before looping
                this.animIndex = 0;
                if (this.ghostSpan) this.ghostSpan.innerText = baseText ? '' : '\u00A0';
            }
        }, 50) as unknown as number;
    }

    private placeCaretAtEnd() {
        const range = document.createRange();
        const sel = globalThis.getSelection();
        range.selectNodeContents(this.element);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
 
 
    }

    private handleHistoryNavigation(direction: 'up' | 'down', e: KeyboardEvent) {
        e.preventDefault();
        const historyList = get(history);

        if (direction === 'up' && historyList.length > 0) {
            if (this.historyIndex === -1) this.historyIndex = historyList.length - 1;
            else if (this.historyIndex > 0) this.historyIndex--;
            
            this.element.innerText = historyList[this.historyIndex];
            this.placeCaretAtEnd();
        } 
        else if (direction === 'down' && this.historyIndex !== -1) {
            if (this.historyIndex < historyList.length - 1) {
            this.historyIndex++;
            this.element.innerText = historyList[this.historyIndex];
            } else {
            this.historyIndex = -1;
            this.element.innerText = '';
            }
            this.placeCaretAtEnd();
        }
    }

    public handleSubmit(e: KeyboardEvent) {
        e.preventDefault();
        const content = this.element.innerText.trim();
        
        // 1. Manually wipe the text if clear is called, because Svelte will reuse this active node!
        if (content.toLowerCase() === 'clear') {
            this.element.innerHTML = '&nbsp;';
        }

        const result = command_parser.parse(content);
        
        this.historyIndex = -1;
        add(content, result ?? empty);
        
        // 2. DO NOT manually deactivate if it's 'clear'. Svelte will recycle this node 
        // for the new prompt and skip the update cycle since its prop remains 'true'.
        if (content.toLowerCase() !== 'clear') {
            this.setActive(false);
        }
    }

    public setActive(active: boolean) {
        if (active) {
            // 3. When Svelte recycles an old deactivated node (e.g., clear on the 5th command), wipe it!
            this.element.innerHTML = '&nbsp;';
            this.originalText = '';
            this.element.addEventListener('keydown', this.onKeydown);
            this.element.addEventListener('focus', this.onFocus);
            this.element.addEventListener('blur', this.onBlur);
            this.restoreFocus();
        } else {
            this.element.contentEditable = 'false';
            this.element.removeEventListener('keydown', this.onKeydown);
            this.element.removeEventListener('focus', this.onFocus);
            this.element.removeEventListener('blur', this.onBlur);
            this.clearAnimation();
            this.element.blur();
        }
    }

    // Helper method to keep things DRY
    private restoreFocus() {
        this.element.contentEditable = 'true';
        this.element.focus();
        this.placeCaretAtEnd();
    }

    public destroy() {
        this.element.removeEventListener('keydown', this.onKeydown);
        this.element.removeEventListener('focus', this.onFocus);
        this.element.removeEventListener('blur', this.onBlur);
        this.clearAnimation();
    }

    public onKeydown(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowUp':
                this.handleHistoryNavigation('up', e);
                break;
            case 'ArrowDown':
                this.handleHistoryNavigation('down', e);
                break;
            case 'Enter':
                this.handleSubmit(e);
                break;
        }
    }
}

export function handler(element: HTMLElement, params: {active: boolean}) {
  const session = new TerminalHandler(element, params?.active);

  return {
    update(newParams: {active: boolean}) {
      session.setActive(newParams.active);
    },
    destroy() {
      session.destroy();
    }
  };
}

