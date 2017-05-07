export default class Component extends HTMLElement {
  constructor() {
    super();

    this.state = {};

    this.root = this.attachShadow({ mode: 'open' });

    if (this.hasAttribute('click')) {
      this.addEventListener('click', this._handleClick);
    }
  }

  _handleClick() {
    const attr = this.getAttribute('click');

    if (attr === '') {
      if (this.handleClick && typeof this.handleClick === 'function') {
        this.handleClick();
      }
    }

    if (this[attr] && typeof this[attr] === 'function') {
      this[attr]();
    }
  }

  connectedCallback() {
    const root = this.root;
    root.innerHTML = this.render();
  }

  disconnectedCallback() {
    if (this.hasAttribute('click')) {
      this.removeEventListener('click', this._handleClick);
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        '%cState changed:',
        'color: #2ecc71; font-weight: bold',
        'Name:',
        attrName,
        'Old value:',
        oldValue,
        'New value:',
        newValue
      );
    }

    this.rerender();
  }

  setState(obj) {
    if (process.env.NODE_ENV !== 'production') {
      const newObj = typeof obj === 'function' ? 'function passed' : obj;

      console.log(
        '%cState changed:',
        'color: #cc343d; font-weight: bold',
        newObj
      );
    }

    if (typeof obj === 'function') {
      this.state = Object.assign(this.state, obj(this.state));
    } else {
      this.state = Object.assign(this.state, obj);
    }

    this.rerender();
  }

  rerender() {
    const root = this.root;
    root.innerHTML = this.render();
  }
}
