import { COLORS, scheme } from "$lib/js/constants";
import { get } from "svelte/store";

export function animation(element: HTMLElement, options: {text: string, speed: number, isActive: boolean}) {
    let currentIndex = 0;
    let interval: any;
    let isAnimating = false;

    const animate = () => {
        if (!isAnimating) return;
        
        const displayText = options.text.slice(0, currentIndex);
        const cursor = currentIndex < options.text.length ? '|' : '';
        element.textContent = displayText + cursor;
        
        currentIndex++;
        if (currentIndex > options.text.length + 1) {
            currentIndex = 0; // Reset for loop
        }
    };

    const startAnimation = () => {
        if (isAnimating) return;
        element.style.color = COLORS[get(scheme)].brightBlack;
        isAnimating = true;
        currentIndex = 0;
        interval = setInterval(animate, options.speed);
    };
    
    const stopAnimation = () => {
        isAnimating = false;
        clearInterval(interval);
        element.textContent = '';
    };

    // Event handlers
    const handleFocus = () => {
        stopAnimation();
    };

    const handleBlur = () => {
        // Small delay to ensure user interaction is complete
        console.log("From handlebluer", options);
        if (options.isActive) {
            setTimeout(startAnimation, 100);
        }
        else {
            stopAnimation();
        }
        
    };

    // Add event listeners
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
    
    // Start animation initially (only if element is not focused)
    if (document.activeElement !== element) {
        startAnimation();
    }
    
    return {
        destroy() {
            stopAnimation();
            element.removeEventListener('focus', handleFocus);
            element.removeEventListener('blur', handleBlur);
        },
        update(newOptions: any) {
            // console.log("Update :", newOptions);
            Object.assign(options, newOptions);
            console.log("Update :", newOptions, options);
            if (options.isActive){
                
                stopAnimation();
                startAnimation();
            }
            else {
                stopAnimation();
                element.removeEventListener('focus', handleFocus);
                element.removeEventListener('blur', handleBlur);
            }
        }
    };
}