import React, { Component } from "react";
import PropTypes from "prop-types";
import AuthService from "../../auth/AuthService";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class Login extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.Auth = new AuthService();
	}

	componentDidMount() {
		if (this.Auth.loggedIn()) this.props.history.replace("/");
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.Auth.login(this.state.username, this.state.password)
			.then(() => {
				this.props.history.replace("/");
			})
			.catch(err => {
				alert(err);
			});
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<Grid container alignItems="center" direction="column" justify="center">
					<Grid item xs={4}>
						<Card>
							<CardContent>
								<Grid
									container
									spacing={16}
									alignItems="center"
									direction="column"
									justify="center"
								>
									<Grid item>
										<Typography variant="display1" gutterBottom>
											Login
										</Typography>
									</Grid>
									<Grid item>
										<Input
											className="form-item"
											placeholder="Email"
											name="username"
											type="text"
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item>
										<Input
											className="form-item"
											placeholder="Password"
											name="password"
											type="password"
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											color="primary"
											className="form-submit"
											value="SUBMIT"
											type="submit"
										>
											Login
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</form>
		);
	}
}

Login.propTypes = {
	history: PropTypes.string
};

export default Login;
