import { assign, cloneDeep } from 'lodash-es';

class Component extends HTMLElement {
    constructor() {
        super();
        this.state = {};
        this.inner = '';
        this.root = this.attachShadow({ mode: 'open' });
        if (this.hasAttribute('onClick')) {
            this.addEventListener('click', this._handleClick);
        }
    }
    _handleClick() {
        const attr = this.getAttribute('onClick');
        if (attr === '') {
            if (this.handleClick && typeof this.handleClick === 'function') {
                this.handleClick();
            }
        }
        else if (typeof attr === 'string' && typeof this[attr] === 'function') {
            this[attr]();
        }
    }
    handleInternalRender() {
        if (this.inner.length > 0 === false) {
            this.inner = cloneDeep(this.innerHTML);
            this.innerHTML = '';
        }
        this.root.innerHTML = `${this.render && this.render(this.inner)}`;
    }
    connectedCallback() {
        this.handleInternalRender();
        if (this.componentDidMount &&
            typeof this.componentDidMount === 'function') {
            this.componentDidMount();
        }
    }
    setProp(name, value) {
        this.setAttribute(name, value);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this._handleClick);
        if (this.componentDidUnmount &&
            typeof this.componentDidUnmount === 'function') {
            this.componentDidUnmount();
        }
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        const oldState = cloneDeep(this.state);
        const oldAttributes = cloneDeep(this.attributes);
        if (window.crabug) {
            console.log('%cAttribute/Prop changed:', 'color: #cc343d; font-weight: bold', 'Name:', attrName, 'Old value:', oldValue, 'New value:', newValue);
        }
        this.shouldRender(oldState, oldAttributes);
    }
    setState(data) {
        const oldState = cloneDeep(this.state);
        if (window.crabug) {
            const newData = typeof data === 'function' ? 'function passed' : data;
            console.log('%cState changed:', 'color: #2eec71; font-weight: bold', newData);
        }
        if (typeof data === 'function') {
            this.state = assign(this.state, data(this.state));
        }
        else {
            this.state = assign(this.state, data);
        }
        this.shouldRender(oldState);
    }
    shouldRender(oldState, oldAttributes) {
        if (this.shouldComponentUpdate &&
            typeof this.shouldComponentUpdate === 'function') {
            const res = this.shouldComponentUpdate(oldState, oldAttributes ? oldAttributes : cloneDeep(this.attributes));
            if (res) {
                return this.reRender();
            }
            return false;
        }
        this.reRender();
    }
    forceRender() {
        if (window.crabug) {
            console.log('reRender() was forced');
        }
        this.reRender();
    }
    reRender() {
        this.handleInternalRender();
    }
}
function defineComponents(components, options) {
    if (options.crabug) {
        window.crabug = true;
    }
    components.map((Component) => {
        customElements.define(Component.is || Component.componentName, Component);
    });
}
function render(content, globalStyle, element) {
    if (globalStyle) {
        // create global <style>
        const style = document.createElement('style');
        const styleContent = document.createTextNode(globalStyle);
        style.appendChild(styleContent);
        document.body.appendChild(style);
    }
    if (element) {
        element.innerHTML = content;
    }
    else {
        if (window.crabug) {
            console.log('%cRendering element was not specified!', 'font-weight: bold');
        }
    }
}

export { Component, defineComponents, render };
