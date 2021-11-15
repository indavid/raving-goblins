import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import Protect from 'react-app-protect'
import 'react-app-protect/dist/index.css'
import App from "./App";
import "./index.css";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Protect sha512='70ABAB289F2603934BD6A623D8E95AB58ACA503560322692FA63DDC7755A63D702F5B318AA876B104ADCEA148086ED93768EF0CFFBB5861CBF7B7540FCDB6DBD'>
    <ApolloProvider client={client}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
        <App subgraphUri={subgraphUri} />
      </ThemeSwitcherProvider>
    </ApolloProvider>
  </Protect>,
  document.getElementById("root"),
);