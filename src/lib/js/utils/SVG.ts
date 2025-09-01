export function colorElements(wrapper:HTMLElement, id: string, color: string, type: string = "fill") {
    if (wrapper) {
      // const el = wrapper.querySelector(`#${id}`);
      const el = wrapper.querySelector(`.${id}`);
      if (el) {
        el.setAttribute(type, color);
      }
    }
}