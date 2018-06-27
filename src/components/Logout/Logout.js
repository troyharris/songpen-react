import React, { Component } from "react";
import PropTypes from "prop-types";
import AuthService from "../../auth/AuthService";

class Logout extends Component {
	constructor() {
		super();
		this.handleLogout = this.handleLogout.bind(this);
		this.Auth = new AuthService();
	}
	handleLogout() {
		this.Auth.logout();
		this.props.history.replace("/login");
	}
	render() {
		return <button onClick={this.handleLogout}>Logout</button>;
	}
}

Logout.propTypes = {
	history: PropTypes.string
};

export default Logout;
