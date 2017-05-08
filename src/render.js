export function defineComponents(components, opts = {}) {
  if (opts.crabug) {
    window.crabug = true;
  }

  components.map(Component => {
    customElements.define(Component.is, Component);
  });
}

export function render(content, el) {
  el.innerHTML = content;
}
