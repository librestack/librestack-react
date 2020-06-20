// At the moment we either need to ensure a component has
// an id, or set
//     this.parentNode = e.target.parentNode;
// in any event handlers that cause a re-render

import { render } from './jsx';

class Component {
	tagName = 'div';
	classList: string[] = [];
	children: any[] = [];
	componentId: string|undefined;
	parentNode: HTMLElement|undefined;
	unsubscribe = () => {};

	// react requirements:
	context = '';
	props: {[index: string]: any} = {};
	state = {};
	refs = {};
	forceUpdate = () => {};

	constructor () {
		console.log(`${this.constructor.name} created`);
	}

	render () {}

	setState = () => {
		if (this.render) render(this.render(), this.parentNode);
	};

}

export default Component;
