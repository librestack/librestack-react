import Outer from './outer';
import { createElement, render } from './jsx';
import { createStore } from 'redux';
import reducer from './reducer';
const store = createStore(reducer);
render(<Outer store={store}/>, document.getElementById('root'));


function toggleLight () {
	const action = {
		type: 'TOGGLE_LIGHT'
	}
	store.dispatch(action);
}

setInterval(toggleLight, 2000);
