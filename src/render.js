export function defineComponents(components, opts = {}) {
  if (opts.crabug) {
    window.crabug = true
  }

  components.map(Component => {
    customElements.define(Component.is, Component)
  })
}

export function render(content, globalStyle, el) {
  if (globalStyle) {
    // create global <style>
    const style = document.createElement('style')
    const styleContent = document.createTextNode(globalStyle)

    style.appendChild(styleContent)
    document.body.appendChild(style)
  }

  if (el) {
    el.innerHTML = content
  } else {
    if (window.crabug) {
      console.log('%cRendering element was not specified!', 'font-weight: bold')
    }
  }
}
