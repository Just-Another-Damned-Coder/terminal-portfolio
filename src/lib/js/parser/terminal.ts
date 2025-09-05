import { history, past_commands, COLORS, scheme, empty, animation_text, animation_speed } from "$lib/js/constants.js";
import { command_parser } from "$lib/js/parser/parser.js";
import { get } from "svelte/store";

export function add(input: string, output: App.CommandOutput): void{
  history.update(h => [...h, input]);
  past_commands.update(pc => {
    const last = pc.length - 1;
    const next = pc.slice();
    next[last] = [input, output, false];
    next.push(['', empty, true]);
    return next;
  });
}

export function handler(element: HTMLElement, params: {active: boolean}) {
	element.setAttribute('contenteditable', params?.active ? 'true' : 'false');
	if (params.active) element.focus();
	let currentIndex = 0;
	let interval: any;
	let brightBlack: string, foreground: string;

	// Subscribe to scheme changes
    const unsubscribeScheme = scheme.subscribe(value => {
        brightBlack = COLORS[value].brightBlack;
		foreground = COLORS[value].foreground	;
    });

	function onKeydown(e: KeyboardEvent) {
	if (e.key === 'Enter') {
			e.preventDefault(); // avoid newline in contenteditable
			const content = element.innerText.trim();
			const result = command_parser.parse(content);
			add(content, result?? empty);
			console.log(result);
			element.contentEditable = 'false';
			element.removeEventListener('keydown', onKeydown);
			element.removeEventListener('blur', onBlur);
			element.blur();
		}
	}

	function animate_text() {
		element.style.color = brightBlack;
		const displayText = animation_text.slice(0, currentIndex);
		const cursor = currentIndex < animation_text.length ? '|' : '';
		element.textContent = displayText + cursor;

		currentIndex++;
		if (currentIndex > animation_text.length + 1) {
			currentIndex = 0; // Reset for loop
		}
	}
	function startAnimation() {
        if (!interval) {
            interval = setInterval(animate_text, animation_speed);
        }
    }

    function stopAnimation() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

	function onFocus() {
        if (params.active) {
            stopAnimation();
			element.textContent = '';
			currentIndex = 0;
			element.style.color = foreground;
        }
    }

    function onBlur() {
        if (params.active) {
            startAnimation();
        }
    }

	element.addEventListener('keydown', onKeydown);
	element.addEventListener('focus', onFocus);
    element.addEventListener('blur', onBlur);


	return {
		update(params: {active: boolean}) {
			console.log("Update on element is called.");
			element.setAttribute('contenteditable', params.active ? 'true' : 'false');
            if (params.active) {
                element.focus();
            } else {
                stopAnimation();
            }
			element.addEventListener('keydown', onKeydown);
		},
		destroy() {
			element.removeEventListener('keydown', onKeydown);
			element.removeEventListener('focus', onFocus);
			element.removeEventListener('blur', onBlur);
		}
	};
}
