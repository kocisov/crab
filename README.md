<p align="center">
  <img alt="" src="https://kocisov.github.io/crab/crab.svg" width="200">
</p>

<p align="center">
  JavaScript library for building user interfaces with Custom Elements, Shadow DOM and React like API.
</p>

[![npm](https://img.shields.io/npm/v/@kocisov/crab.svg)](http://npmjs.com/@kocisov/crab) [![Code Climate](https://codeclimate.com/github/Kocisov/crab/badges/gpa.svg)](https://codeclimate.com/github/Kocisov/crab)

> This version of Crab was written in TypeScript to include Types for your development

### How does it look

```js
import { Component, defineComponents, render } from '@kocisov/crab'

export default class Header extends Component {
  // or Polymer like => static get is()
  static get componentName() {
    return 'header-component'
  }

  state = {
    id: 'Some string...',
  }

  changeState() {
    this.setState({
      id: uuid.v4(),
    })
  }

  render() {
    return `
      <div class="flex-right">
        Hello ${this.state.id}
      </li>
    `
  }
}

defineComponents([Header, SmallButon], { crabug: true })

render(
  `
    <header-component onClick="changeState"></header-component>
  `,
  `
    body {
      margin: 0;
    }
  `,
  document.getElementById('root'),
)
```

### Installation

This version of **Crab** is compiling from ES2015+ to ES5 ready even without native-shim.

##### Install crab with package manager

```bash
# yarn
yarn add @kocisov/crab

# npm
npm install --save @kocisov/crab
```

##### Include crab into your code

```js
// webpack with babel
import { Component, defineComponents, render } from '@kocisov/crab'

// ...

render(
  `
    <view-layout></view-layout>
  `,
  document.getElementById('root'),
)
```

### Docs

Work in progress at [docs](https://kocisov.gitbooks.io/crab/content/).
