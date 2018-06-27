import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainMenu from "./MainMenu/MainMenu";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import SongList from "./SongList/SongList";

const styles = theme => ({
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	},
	toolbar: theme.mixins.toolbar,
	root: {
		flexGrow: 1
	},
	appFrame: {
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex",
		width: "100%"
	}
});

// Container serves as a wrapper for the app including Routing
class Container extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<MainMenu />
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Router>
							<div>
								<Route exact path="/" component={SongList} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/logout" component={Logout} />
							</div>
						</Router>
					</main>
				</div>
			</div>
		);
	}
}

Container.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
