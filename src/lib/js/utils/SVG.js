export function colorElements(wrapper, id, color, type = "fill") {
    if (wrapper) {
      // const el = wrapper.querySelector(`#${id}`);
      const el = wrapper.querySelector(`.${id}`);
      if (el) {
        el.setAttribute(type, color);
      }
    }
}