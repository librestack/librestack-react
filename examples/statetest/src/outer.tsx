import Component from './component';
import { createElement } from './jsx';
import Light from './light';
import Toggle from './toggle';

class Outer extends Component {
	render () {
		return (
			<div className="outer">
				<Light id="mylight" store={this.props.store} />
				<Toggle store={this.props.store} buttonText="Mr Toggle Lives!" />
			</div>
		);
	}
}

export default Outer;
