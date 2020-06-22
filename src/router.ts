/*
 * Use in the render() function of Component
 * Supports component or render syntax:
 *   <Route path="/blog" component={TopBar} />
 *   <Route path="/blog" render={ () => (<BlogOuter store={this.props.store} />)} />
 */
import Component from './component';

class Route extends Component {
	props: any;
	render () {
		if (this.props.path === location.pathname) {
			if (this.props.component) return this.props.component;
			else if (this.props.render) return this.props.render();
		}
		else return '';
	}
}

export default Route;
