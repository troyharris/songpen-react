import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./index.css";
import Container from "./components/Container";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

// Global theme for Material UI
// TODO: Move this into its own module
const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#ffe97d",
			main: "#ffb74d",
			dark: "#c88719",
			contrastText: "#000"
		},
		secondary: {
			light: "#b2fef7",
			main: "#80cbc4",
			dark: "#4f9a94",
			contrastText: "#000"
		}
	}
});

// TODO move API URL to config file
const httpLink = createHttpLink({
	uri: "http://localhost:3000/api"
});

// If local token exists, add it to http headers.
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : ""
		}
	};
});

// Create the ApolloClient
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

// Wrap the entire app in the ApolloProvider and MuiThemeProvider.
// Also set some reasonable CSS defaults with CssBaseline.
// Container wraps the components.
ReactDOM.render(
	<ApolloProvider client={client}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Container />
		</MuiThemeProvider>
	</ApolloProvider>,
	document.getElementById("root")
);
registerServiceWorker();
