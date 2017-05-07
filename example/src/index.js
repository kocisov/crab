import {
  defineComponents,
  render
} from '@kocisov/crab'
import Content from './components/Content'
import Header from './components/Header'
import Increment from './components/Increment'

defineComponents({
  'content-component': Content,
  'header-component': Header,
  'increment-component': Increment
})

render(`
  <style>body {margin:0; font-family:sans-serif}</style>
  <header-component click></header-component>
  <content-component></content-component>
`, document.getElementById('root'))
