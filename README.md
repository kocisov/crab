<p align="center">
  <img alt="" src="https://kocisov.github.io/crab/crab.svg" width="200">
</p>

<p align="center">
  JavaScript library for building user interfaces with Custom Elements, Shadow DOM and React like API.
</p>

> Crab's size is **5kB** gzipped with polyfills included. Without polyfills size is only about **1kB** gzipped.

![http://npmjs.com/@kocisov/crab](https://img.shields.io/npm/v/@kocisov/crab.svg)

### Installation
**Crab** is compiling from ES2015+ to ES5 ready because it comes with native-shim (and also custom-elements) polyfill included.

##### Install crab with package manager
```bash
# yarn
yarn add @kocisov/crab

# npm
npm install --save @kocisov/crab
```

##### Include crab into your code
```js
import { Component, defineComponents, render } from '@kocisov/crab'
// ...

render(`
  <h2>Hello</h2>
`, document.getElementById('root'))
```

If you are using Uglify for minification, Crab requires harmony version of Uglify instead of default to work properly.

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

### Example
Refer to [example folder](https://github.com/kocisov/crab/tree/master/example) or [example.md](https://github.com/kocisov/crab/tree/master/example.md)

### API
`Component` crab's **essential** ES2015 class. Every class which is a crab's component **must extend this class**.

`defineComponents` define all components that are used. **{ 'name-component': ComponentClass }**

`render` Pretty much just renders some markup into specified element.
