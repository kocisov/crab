import {
  defineComponents,
  render
} from '@kocisov/crab'
import Content from './components/Content'
import Header from './components/Header'
import Increment from './components/Increment'

defineComponents([
  Header,
  Content,
  Increment
], {
  // debug, but crab 🦀
  crabug: process.env.NODE_ENV === 'production' ? false : true
})

render(`
  <header-component onClick></header-component>
  <content-component></content-component>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
    }
  </style>
`, document.getElementById('root'))
