import { Component } from '@kocisov/crab'

export default class Header extends Component {
  state = {
    value: 1
  }

  handleClick() {
    this.setState(state => ({
      value: state.value + 1
    }))
  }

  render() {
    const color = this.state.value % 2 === 0 ? 'green' : 'red';

    return `
      <p>Click on this Component to increment</p>
      <p class="value">
        Current value is
        <span class="${color}">
          ${this.state.value}
        </span>
      </p>
      <style>
        :host {
          background: #333;
          border-radius: 3px;
          color: #fff;
          cursor: pointer;
          font-weight: bold;
          margin: 10px;
          max-width: 220px;
          padding: 10px;
          text-align: center;
        }

        p {
          margin: 0
        }

        .value {
          font-size: 24px;
        }

        .green {
          color: #2ecc71;
        }

        .red {
          color: #cc343d;
        }
      </style>
    `
  }
}
