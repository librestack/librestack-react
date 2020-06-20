import Component from './component';
import { createElement } from './jsx';

class Light extends Component {
	state = {
		classes: [
			'light',
			'fred'
		]
	};

	constructor (props: any) {
		super();
		this.unsubscribe = props.store.subscribe(this.updated);
	}

	getClasses = () => {
		let classes = this.state.classes.slice(0);
		if (this.props.store.getState().lighton)
			classes.push('on');
		return classes.join(' ');
	}

	updated = () => {
		this.setState();
	}

	render () {
		return (
			<div id={this.props.id} className={this.getClasses()}>light here</div>
		);
	}
}

export default Light;
