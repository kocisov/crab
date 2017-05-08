const defineComponents = Crab.defineComponents
const render = Crab.render

class View extends Crab.Component {
  static get is() {
    return 'view-layout'
  }

  static get observedAttributes() {
    return [
      'test'
    ]
  }

  constructor() {
    super()

    this.state = {
      value: 1
    }

    console.log({a: this})
  }

  handleClick() {
    console.log('onClick is working 🎉')
    this.setAttribute('test', Math.floor(Math.random() * 100))
  }

  componentDidMount() {
    console.log('%cSuccessfully mounted View 🎉', 'font-weight: bold')
    this.setState({
      xd: true
    })
  }

  render() {
    return `
      <header-component></header-component>
      <content-component></content-component>
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }
      </style>
    `
  }
}

class Header extends Crab.Component {
  static get is() {
    return 'header-component'
  }

  render() {
    return `
      Header
      <style>
        :host {
          background: #cc343d;
          color: #fff;
          align-items: center;
          display: flex;
        }
      </style>
    `
  }
}

class Content extends Crab.Component {
  static get is() {
    return 'content-component'
  }

  render() {
    return `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      <style>
        :host {
          font-size: 14px;
        }
      </style>
    `
  }
}

defineComponents([
  View,
  Header,
  Content
], { crabug: true })

render(`
  <view-layout onClick></view-layout>
`, document.getElementById('root'))
