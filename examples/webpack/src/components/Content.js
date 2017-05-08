import { Component } from '@kocisov/crab'

export default class Content extends Component {
  static get is() {
    return 'content-component'
  }

  render() {
    return `
      <h2>Hello!</h2>
      <p>How are you doing?</p>
      <p>And how is Crab? 🤔</p>
      <div class="increment-components">
        <increment-component onClick></increment-component>
        <increment-component onClick></increment-component>
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
