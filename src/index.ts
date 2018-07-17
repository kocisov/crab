import { assign, cloneDeep } from 'lodash-es'

declare global {
  interface Window {
    crabug: boolean
  }
}

interface IShadowRoot extends ShadowRoot {
  innerHTML: any
}

export class Component extends HTMLElement {
  [key: string]: any
  componentDidMount?(): void
  componentDidUnmount?(): void
  handleClick?: () => void
  inner: string
  render?(_inner?: string): string | number
  root: IShadowRoot
  shouldComponentUpdate?: (oldState: any, oldAttributes: any) => boolean
  state: {} | any[] | string | number

  constructor() {
    super()

    this.state = {}
    this.inner = ''
    this.root = this.attachShadow({ mode: 'open' })

    if (this.hasAttribute('onClick')) {
      this.addEventListener('click', this._handleClick)
    }
  }

  _handleClick() {
    const attr = this.getAttribute('onClick')

    if (attr === '') {
      if (this.handleClick && typeof this.handleClick === 'function') {
        this.handleClick()
      }
    } else if (typeof attr === 'string' && typeof this[attr] === 'function') {
      this[attr]()
    }
  }

  handleInternalRender(): void {
    if (this.inner.length > 0 === false) {
      this.inner = cloneDeep(this.innerHTML)
      this.innerHTML = ''
    }

    this.root.innerHTML = `${this.render && this.render(this.inner)}`
  }

  connectedCallback() {
    this.handleInternalRender()

    if (
      this.componentDidMount &&
      typeof this.componentDidMount === 'function'
    ) {
      this.componentDidMount()
    }
  }

  setProp(name: string, value: any) {
    this.setAttribute(name, value)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick)

    if (
      this.componentDidUnmount &&
      typeof this.componentDidUnmount === 'function'
    ) {
      this.componentDidUnmount()
    }
  }

  attributeChangedCallback(attrName: string, oldValue: any, newValue: any) {
    const oldState = cloneDeep(this.state)
    const oldAttributes = cloneDeep(this.attributes)

    if (window.crabug) {
      console.log(
        '%cAttribute/Prop changed:',
        'color: #cc343d; font-weight: bold',
        'Name:',
        attrName,
        'Old value:',
        oldValue,
        'New value:',
        newValue,
      )
    }

    this.shouldRender(oldState, oldAttributes)
  }

  setState(data: any) {
    const oldState = cloneDeep(this.state)

    if (window.crabug) {
      const newData = typeof data === 'function' ? 'function passed' : data

      console.log(
        '%cState changed:',
        'color: #2eec71; font-weight: bold',
        newData,
      )
    }

    if (typeof data === 'function') {
      this.state = assign(this.state, data(this.state))
    } else {
      this.state = assign(this.state, data)
    }

    this.shouldRender(oldState)
  }

  shouldRender(oldState?: any, oldAttributes?: any) {
    if (
      this.shouldComponentUpdate &&
      typeof this.shouldComponentUpdate === 'function'
    ) {
      const res = this.shouldComponentUpdate(
        oldState,
        oldAttributes ? oldAttributes : cloneDeep(this.attributes),
      )

      if (res) {
        return this.reRender()
      }

      return false
    }

    this.reRender()
  }

  forceRender() {
    if (window.crabug) {
      console.log('reRender() was forced')
    }

    this.reRender()
  }

  reRender() {
    this.handleInternalRender()
  }
}

export function defineComponents(
  components: any[],
  options: {
    crabug: boolean
  },
) {
  if (options.crabug) {
    window.crabug = true
  }

  components.map((Component: any) => {
    customElements.define(Component.is || Component.componentName, Component)
  })
}

export function render(
  content: string,
  globalStyle: string | null,
  element: HTMLElement,
) {
  if (globalStyle) {
    // create global <style>
    const style = document.createElement('style')
    const styleContent = document.createTextNode(globalStyle)

    style.appendChild(styleContent)
    document.body.appendChild(style)
  }

  if (element) {
    element.innerHTML = content
  } else {
    if (window.crabug) {
      console.log('%cRendering element was not specified!', 'font-weight: bold')
    }
  }
}
