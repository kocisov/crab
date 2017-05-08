// polyfills
// we don't need native-shim, because we are not compiling our code in browser
import '../polyfills/custom-elements';

export Component from './component';
export { defineComponents, render } from './render';
