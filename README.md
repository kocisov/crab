<p align="center">
  <img alt="" src="https://kocisov.github.io/crab/crab.svg" width="200">
</p>

<p align="center">
  JavaScript library for building user interfaces with Custom Elements, Shadow DOM and React like API.
</p>

[![npm](https://img.shields.io/npm/v/@kocisov/crab.svg)](http://npmjs.com/@kocisov/crab) [![Code Climate](https://codeclimate.com/github/Kocisov/crab/badges/gpa.svg)](https://codeclimate.com/github/Kocisov/crab)

> Crab's size is **5kB** gzipped with polyfills included. Without polyfills size is only about **1kB** gzipped.

### Example
Refer to [examples folder](https://github.com/kocisov/crab/tree/master/examples)

```js
import { Component, defineComponents, render } from '@kocisov/crab'

export default class Header extends Component {
  static get is() {
    return 'header-component'
  }

  state = {
    name: 'Koci'
  }

  changeState() {
    this.setState({
      name: 'New name'
    })
  }

  render() {
    return `
      <div class="flex-right">
        Hello ${this.state.name}
      </li>
    `
  }
}

defineComponents([
  Header,
  SmallButon
], { crabug: true })

render(`
  <header-component onClick="changeState"></header-component>
`, document.getElementById('root'))
```

### Installation

This version of **Crab** is compiling from ES2015+ to ES5 ready even without native-shim!

##### Install crab with package manager
```bash
# yarn
yarn add @kocisov/crab

# npm
npm install --save @kocisov/crab
```

##### Include crab into your code
```js
// if you are compiling with webpack and babel
import { Component, defineComponents, render } from '@kocisov/crab'

// if you are not
// you can use umd bundle @kocisov/dist/crab.umd.js
const { Component, defineComponents, render } = Crab // window.Crab

// ...

render(`
  <view-layout></view-layout>
`, document.getElementById('root'))
```

#### Webpack
If you are using Uglify for minification, Crab requires harmony version of Uglify to work properly.

You can add it to your project with this command.

```bash
# yarn
yarn add --dev git://github.com/mishoo/UglifyJS2#harmony

# npm
npm install --save-dev git://github.com/mishoo/UglifyJS2#harmony
```

Or you can use [babili](https://github.com/babel/babili) and its [babili-webpack-plugin](https://github.com/webpack-contrib/babili-webpack-plugin)

### Docs
Work in progress at [docs](https://kocisov.gitbooks.io/crab/content/).
