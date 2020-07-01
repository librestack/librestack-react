/*
 * The Typescript compiler will call our createElement() function to create the
 * nodes.  Unlike React.js, we're not maintaining and diffing a virtual DOM. We
 * simply create the required nodes directly.  In many cases, this is all you
 * need.
 *
 * As we're watching state changes with enough specificity to know which
 * components have changed state, we can avoid full diff re-renders, and only
 * update those components that have changed state, and then compare the
 * regenerated fragment to the existing DOM.
 *
 * Also, we avoid passing around props and lifting up state refactors by using a
 * central state store, which is the most common React.js pattern anyway.
 */

let components = []; // component stack

/* convert a html property like 'onClick' to the real event name like 'click'
 * Alternatively, could just add these raw events to the DetailedHTMLProps type */
function realEvent(key: string) {
	return 'click'; //FIXME - handle all events
}

/*
 * type: can be either a tag name string (such as 'div' or 'span'), a React
 * component type (a class or a function), or a React fragment type.
 */

interface ICreateElement {
	(type: any, config?: { [index: string]: any; }, ...children: any): any
}
const createElement: ICreateElement =
	(type: any, config: {[index: string]:any} = {}, ...children: any) => {
	switch (typeof type) {
		case 'function': {		// Component
			const t = new type(config);
			t.props = (config) ? config : {};
			components.push(t);
			return t.render();
		}
		case 'string':			// eg. 'div' => use to create element
			break;
		default:				// object
			if (Array.isArray(type)) {
				let child: any;
				while ((child = type.shift()) !== undefined) {
					render(child, config.parentNode);
				}
			}
			return type;
	}
	return createNode(type, config, children);
}

function createNode(type: string, config: {[index: string]:any} = {}, children: any) {
	const element = document.createElement(type);
	for (const key in config) { // apply attributes
		if (key === 'className' && config[key] !== undefined)
			element.classList.add(...config[key].split(' '));
		else { // apply non class attributes
			if (typeof config[key] === 'function')
				element.addEventListener(realEvent(key), config[key]);
			else
				element.setAttribute(key, config[key]);
		}
	}
	if (config && config.innerHTML !== undefined) element.innerHTML = config.innerHTML;
	if (children) { // child nodes
		if (!Array.isArray(children)) children = [ children ];
		children.forEach((child: any) => {
			if (typeof child === 'string')
				child = document.createTextNode(String(child));
			else
				child = createElement(child, { parentNode: element }, []);
			element.appendChild(child);
		});
	}
	return element;
}

function render(element: any, parentNode?: HTMLElement|(Node & ParentNode)|null|undefined) {
	if (!element) throw new Error('missing element to render');

	// get parent node
	(parentNode) || (parentNode = document.getElementById('root'));
	if (!parentNode) throw new Error('Unable to find root node');

	// find old node, compare with new if exists, and insert/replace
	if (element.id) { // has ID, use it to find element
		const oldNode = document.getElementById(element.id);
		if (oldNode && !oldNode.isEqualNode(element) && oldNode.parentNode) {
			oldNode.parentNode.replaceChild(element, oldNode);
		}
		else parentNode.appendChild(element);			// new element
	}
	else { // no id, search through children of parent
		let changed = true;
		for (let i = 0; i < parentNode.children.length; i++) {
			if (parentNode.children[i].isEqualNode(element)) changed = false;
		}
		// if exists and different, render child
		if (changed) {
			if (parentNode.children.length > 0) {	// replace existing element
				parentNode.replaceChild(element, parentNode.firstElementChild as Node);
			}
			else parentNode.appendChild(element);		// new element
		}
	}
	// call componentDidMount() events
	let f;
	while (f = components.pop()) {
		if (f.componentDidMount !== undefined) f.componentDidMount();
	}
}

export {
	createElement,
	render
}
