import { Component } from '@kocisov/crab'

export default class Header extends Component {
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
          color: #fff;
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
          padding: 10px;
          text-decoration: none;
        }

        .flex-right {
          margin-left: auto;
          margin-right: 15px;
        }
      </style>
    `
  }
}
