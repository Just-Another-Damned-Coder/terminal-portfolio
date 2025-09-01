export function colorElements(wrapper:HTMLElement, id: string, color: string, type: string = "fill") {
    if (wrapper) {
      // const el = wrapper.querySelector(`#${id}`);
      const el = wrapper.querySelector(`.${id}`);
      if (el) {
        el.setAttribute(type, color);
      }
    }
}

export function applyTheme(theme: Record<string, string>) {
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme)) {
    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  }
}