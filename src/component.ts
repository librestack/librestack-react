// At the moment we either need to ensure a component has
// an id, or set
//     this.parentNode = e.target.parentNode;
// in any event handlers that cause a re-render

import { render } from './jsx';

class Component {
	key = render.key++;
	tagName = 'div';
	classList: string[] = [];
	children: any[] = [];
	componentId: string|undefined;
	node: HTMLElement|undefined;
	parentNode: HTMLElement|undefined;
	store: undefined;
	unsubscribe: undefined;

	// react requirements:
	context = '';
	props: {[index: string]: any} = {};
	state = {};
	refs = {};
	forceUpdate = () => {};

	constructor(props?: any) {
		console.log(`${(this as any).constructor.name} created with key=${this.key}`);
	}

	componentDidMount = () => {
		console.log(`${(this as any).constructor.name}.componentDidMount()`);
	}

	render () {}

	setState = () => {
		console.log(`${(this as any).constructor.name}.setState()`);
		if (this.render) render(this.render(), this.parentNode);
	};

}

export default Component;
