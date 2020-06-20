import Component from './component';
import { createElement } from './jsx';

class Outer extends Component {
	render () {
		return (
			<div className="outer">
				<h1>Librecast-React</h1>
			</div>
		);
	}
}

export default Outer;
