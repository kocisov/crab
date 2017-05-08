## Example

##### index.js
```js
import { Component, defineComponents, render } from '@kocisov/crab'
import SmallButon from './small-button'

export default class Header extends Component {
  static get is() {
    return 'header-component'
  }

  state = {
    name: 'Koci'
  }

  handleClick() {
    console.log('I just clicked this component!')
  }

  render() {
    return `
      <li>
        <a href="#about-us">
          About us
        </a>
      </li>
      <li>
        <a href="#randomizer">
          Color randomizer
        </a>
      </li>
      <li class="flex-right">
        Hello ${this.state.name}
      </li>
      <style>
        :host {
          align-items: center;
          background: #2ecc71;
          color: #333;
          display: flex;
          font-family: sans-serif;
          padding: 10px;
        }

        li {
          display: flex;
        }

        li a {
          color: inherit;
          display: flex;
        }
      </style>
    `
  }
}

/*
 * we define each of our components here
 */
defineComponents([
  Header,
  SmallButon
], {
  // debug, logging state/attribute changes
  crabug: true
})

/*
 * render content into element
 */
render(`
  <header-component onClick></header-component>
  <div>
    Normal div
    <small-button onClick="changeColor"></small-button>
  </div>
`, document.getElementById('root'))
```

##### small-button.js
```js
import { Component, defineComponents, render } from '@kocisov/crab'

export default class SmallButon extends Component {
  static get is() {
    return 'small-button'
  }

  state = {
    color: 'red'
  }

  changeColor() {
    this.setState(state => ({
      color: state.color === 'blue' ? 'green' : 'blue';
    }))
  }

  render() {
    return `
      Current state color: ${this.state.color}
      <style>
        :host {
          background: #333;
          color: #fff;
          font-family: sans-serif;
          padding: 10px;
        }
      </style>
    `
  }
}
```


##### index.html
> Defined Custom Elements in Markup are replaced, but you probably want to just render in JavaScript with Crab.render()

```html
<!doctype html>
<html>
<head>
  <title>Testing crab</title>
</head>
<body>
  <!--
    this #root is not needed if you are
    adding components into markup
  -->
  <div id="root">
    <!--
      click attribute, binded to this.handleClick as default

      we can also pass Component's function name and it's
      automatically binded with "this.[name]"
    -->
    <header-component onClick></header-component>
  </div>
  <script src="index.js"></script>
</body>
</html>
```
