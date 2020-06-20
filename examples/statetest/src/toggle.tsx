import Component from './component';
import { createElement } from './jsx';

class Toggle extends Component {

	toggleLight = () => {
		const action = {
			type: 'TOGGLE_LIGHT'
		}
		this.props.store.dispatch(action);
	}

	render () {
		return (
			<button className='toggle' click={this.toggleLight}>{this.props.buttonText}</button>
		);
	}
}

export default Toggle;
