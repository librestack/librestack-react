import Outer from './outer';
import { createElement, render } from './jsx';
// uncomment to use redux (npm i redux)
//import { createStore } from 'redux';
//import reducer from './reducer';
//const store = createStore(reducer);
//render(<Outer store={store}/>, document.getElementById('root'));
render(<Outer />, document.getElementById('root'));
