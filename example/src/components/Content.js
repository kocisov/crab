import { Component } from '@kocisov/crab'

export default class Header extends Component {
  state = {}

  render() {
    return `
      <h2>Hello!</h2>
      <p>How are you doing?</p>
      <p>And how is Crab? 🤔</p>
      <div class="increment-components">
        <increment-component click="handleClick"></increment-component>
        <increment-component click="handleClick"></increment-component>
      </div>
      <style>
        :host {
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
          padding: 10px;
        }

        .increment-components {
          display: flex;
          align-items: center;
        }

        h2,
        p {
          margin: 0
        }
      </style>
    `
  }
}
