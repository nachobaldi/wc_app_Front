import { Component } from "react";

export default class ErrorBoundry extends Component {
	state = { error: "", errorInfo: "" };

	componentDidCatch(error, errorInfo) {
		this.setState({ error: error, errorInfo: errorInfo });
	}
	render() {
		if (this.state.error) {
			return (
				<div>
					<div>Child render error</div>
					<div>{this.state.error.message}</div>
				</div>
			);
		} else return this.props.children;
	}
}
