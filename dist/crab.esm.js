var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}


Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

var Component = function (_CustomElement2) {
  _inherits(Component, _CustomElement2);

  function Component() {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    _this.state = {};
    _this.root = _this.attachShadow({ mode: 'open' });

    if (_this.hasAttribute('onClick')) {
      _this.addEventListener('click', _this._handleClick);
    }
    return _this;
  }

  _createClass(Component, [{
    key: '_handleClick',
    value: function _handleClick() {
      var attr = this.getAttribute('onClick');

      if (attr === '') {
        if (this.handleClick && typeof this.handleClick === 'function') {
          this.handleClick();
        }
      } else if (this[attr] && typeof this[attr] === 'function') {
        this[attr]();
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var root = this.root;
      root.innerHTML = this.render();

      if (this.componentDidMount && typeof this.componentDidMount === 'function') {
        this.componentDidMount();
      }
    }
  }, {
    key: 'setProp',
    value: function setProp(name, value) {
      this.setAttribute(name, value);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('click', this._handleClick);

      if (this.componentDidUnmount && typeof this.componentDidUnmount === 'function') {
        this.componentDidUnmount();
      }
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      var oldState = _extends({}, this.state);

      var oldAttributes = _extends({}, this.attributes);

      if (window.crabug) {
        console.log('%cAttribute/Prop changed:', 'color: #cc343d; font-weight: bold', 'Name:', attrName, 'Old value:', oldValue, 'New value:', newValue);
      }

      this.shouldRender(oldState, oldAttributes);
    }
  }, {
    key: 'setState',
    value: function setState(obj) {
      var oldState = _extends({}, this.state);

      if (window.crabug) {
        var newObj = typeof obj === 'function' ? 'function passed' : obj;

        console.log('%cState changed:', 'color: #2eec71; font-weight: bold', newObj);
      }

      if (typeof obj === 'function') {
        this.state = Object.assign(this.state, obj(this.state));
      } else {
        this.state = Object.assign(this.state, obj);
      }

      this.shouldRender(oldState);
    }
  }, {
    key: 'shouldRender',
    value: function shouldRender(oldState, oldAttributes) {
      if (this.shouldComponentUpdate && typeof this.shouldComponentUpdate === 'function') {
        var res = this.shouldComponentUpdate(oldState, oldAttributes ? oldAttributes : _extends({}, this.attributes));

        if (res) {
          return this.reRender();
        }

        return false;
      }

      this.reRender();
    }
  }, {
    key: 'forceRender',
    value: function forceRender() {
      if (window.crabug) {
        console.log('reRender() was forced');
      }

      this.reRender();
    }
  }, {
    key: 'reRender',
    value: function reRender() {
      var root = this.root;
      root.innerHTML = this.render();
    }
  }]);

  return Component;
}(_CustomElement);

function defineComponents(components) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (opts.crabug) {
    window.crabug = true;
  }

  components.map(function (Component) {
    customElements.define(Component.is, Component);
  });
}

function render(content, globalStyle, el) {
  if (globalStyle) {
    // create global <style>
    var style = document.createElement('style');
    var styleContent = document.createTextNode(globalStyle);

    style.appendChild(styleContent);
    document.body.appendChild(style);
  }

  if (el) {
    el.innerHTML = content;
  } else {
    if (window.crabug) {
      console.log('%cRendering element was not specified!', 'font-weight: bold');
    }
  }
}

export { Component, defineComponents, render };
