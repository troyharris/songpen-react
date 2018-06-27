import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
	songPaper: {
		position: "relative",
		width: 200,
		height: 200,
		padding: 20,
		backgroundColor: "#fff"
	},
	newSongIcon: {
		fontSize: 32
	}
});

class SongList extends Component {
	constructor() {
		super();
		this.state = {
			open: false
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleOpen = () => {
		if (!this.state.open) {
			this.setState({ open: true });
		}
	};

	handleClose = () => {
		this.setState({ open: false });
		this.props.history.replace("/login");
	};

	render() {
		const { classes } = this.props;
		const query = gql`
			query {
				songs {
					title
				}
			}
		`;
		return (
			<div>
				<Grid container spacing={24}>
					<Grid item>
						<Paper className={classes.songPaper} elevation={1} align="center">
							<Icon className={classes.newSongIcon} color="secondary">
								note_add
							</Icon>
							<Typography variant="display1" color="textSecondary">
								New
							</Typography>
						</Paper>
					</Grid>
					<Query query={query} errorPolicy="all">
						{({ loading, error, data }) => {
							if (loading) return <p>Loading...</p>;
							if (error) {
								this.handleOpen();
								return <p>Error</p>;
							}
							return data.songs.map(({ title }) => {
								return (
									<Grid item key={title}>
										<Paper className={classes.songPaper} elevation={1}>
											<Typography variant="title" color="textSecondary">
												{title}
											</Typography>
										</Paper>
									</Grid>
								);
							});
						}}
					</Query>
				</Grid>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Error fetching data.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary" autoFocus>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

SongList.propTypes = {
	history: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SongList);
