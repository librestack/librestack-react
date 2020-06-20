function realEvent(key: string) {
	return 'click'; //FIXME - handle all events
}

function createElement(type: any, config: {[index: string]:any} = {}, ...children: any) {
	switch (typeof type) {
		case 'function': {		// Component
			const t = new type(config);
			t.props = (config) ? config : {};
			return t.render();
		}
		case 'string':			// eg. 'div' => use to create element
			break;
		default:				// object
			return type;
	}
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
	if (children) { // child nodes
		if (!Array.isArray(children)) children = [ children ];
		children.forEach((child: any) => {
			(typeof child === 'string') || (child = createElement(child, { parentNode: element }, []));
			element.append(child);
		});
	}
	return element;
}

function render(element: any, parentNode?: HTMLElement|null|undefined) {
	if (!element) throw new Error('missing element to render');

	// get parent node
	(parentNode) || (parentNode = document.getElementById('root'));
	if (!parentNode) throw new Error('Unable to find root node');

	// find old node, compare with new if exists, and insert/replace
	if (element.id) { // has ID, use it to find element
		const oldNode = document.getElementById(element.id);
		if (oldNode && !oldNode.isEqualNode(element) && oldNode.parentNode)
			oldNode.parentNode.replaceChild(element, oldNode);
		else // element has id, but not found, give up
			console.error(`unable to find element with id=${element.id}`);
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
			else parentNode.append(element);		// new element
		}
	}
}

export {
	createElement,
	render
}
