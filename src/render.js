export function defineComponents(components) {
  const all = Object.keys(components);
  all.map(component => {
    customElements.define(component, components[component]);
  });
}

export function render(content, el) {
  el.innerHTML = content;
}
