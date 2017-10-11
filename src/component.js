export default class Component extends HTMLElement {
  constructor() {
    super()

    this.state = {}
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
    } else if (this[attr] && typeof this[attr] === 'function') {
      this[attr]()
    }
  }

  connectedCallback() {
    const root = this.root
    root.innerHTML = this.render()

    if (
      this.componentDidMount &&
      typeof this.componentDidMount === 'function'
    ) {
      this.componentDidMount()
    }
  }

  setProp(name, value) {
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

  attributeChangedCallback(attrName, oldValue, newValue) {
    const oldState = {
      ...this.state,
    }

    const oldAttributes = {
      ...this.attributes,
    }

    if (window.crabug) {
      console.log(
        '%cAttribute/Prop changed:',
        'color: #cc343d; font-weight: bold',
        'Name:',
        attrName,
        'Old value:',
        oldValue,
        'New value:',
        newValue
      )
    }

    this.shouldRender(oldState, oldAttributes)
  }

  setState(obj) {
    const oldState = {
      ...this.state,
    }

    if (window.crabug) {
      const newObj = typeof obj === 'function' ? 'function passed' : obj

      console.log(
        '%cState changed:',
        'color: #2eec71; font-weight: bold',
        newObj
      )
    }

    if (typeof obj === 'function') {
      this.state = Object.assign(this.state, obj(this.state))
    } else {
      this.state = Object.assign(this.state, obj)
    }

    this.shouldRender(oldState)
  }

  shouldRender(oldState, oldAttributes) {
    if (
      this.shouldComponentUpdate &&
      typeof this.shouldComponentUpdate === 'function'
    ) {
      const res = this.shouldComponentUpdate(
        oldState,
        oldAttributes
          ? oldAttributes
          : {
              ...this.attributes,
            }
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
    const root = this.root
    root.innerHTML = this.render()
  }
}
