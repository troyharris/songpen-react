import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";

const drawerWidth = 300;

const styles = theme => ({
	drawerPaper: {
		position: "relative",
		width: drawerWidth,
		backgroundColor: theme.palette.primary.main
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	}
});

class MainMenu extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
				anchor="left"
			>
				<div className={classes.toolbar}>
					<Typography variant="display1" align="center">
						Songpen
					</Typography>
				</div>
			</Drawer>
		);
	}
}

MainMenu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainMenu);
