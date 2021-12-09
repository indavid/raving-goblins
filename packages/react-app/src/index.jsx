import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import 'react-app-protect/dist/index.css'
import "./index.css";
import { Statistic, Row, Col } from 'antd';
import background1 from "./static/assets/background-1.png";
import background2 from "./static/assets/background-2.png";
import background3 from "./static/assets/background-3.png";
import background4 from "./static/assets/background-4.png";

const { Countdown } = Statistic;
const deadline = Date.parse('18 Dec 2021 15:00:00 GMT');

// This is the index.js file for the Pre-launch Page

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

const CountdownTimer = () => (
  <Countdown 
    title="Let's Meet Again In" 
    value={deadline} 
    format="DD:HH:mm:ss:SS"
    style={{ fontSize: '4em', color: '#FFF', textAlign: 'center', marginBottom: '0.5em'}} 
  />
);

class MySection extends React.Component {
  render() {
    return (
      <div 
        className="section"
        style={{ 
          backgroundImage: `url(${this.props.image})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
      </div>
    );
  }
}

class MySectionCountdown extends React.Component {
  render() {
    return (
      <div 
        className="section"
        style={{ 
          backgroundImage: `url(${this.props.image})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <CountdownTimer />
      </div>
    );
  }
}

const anchors = ["firstPage", "secondPage", "thirdPage", "fourthPage"];

const FullpageWrapper = () => (
  <ReactFullpage
    anchors={anchors}
    navigation
    navigationTooltips={anchors}
    sectionsColor={["#0F001C", "#0F001C", "#0F001C", "#0F001C"]}
    onLeave={(origin, destination, direction) => {
      console.log("onLeave event", { origin, destination, direction });
    }}
    render={({ state, fullpageApi }) => {
      console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

      return (
        <div>
          <MySection image={background1} />
          <MySectionCountdown image={background2} />
          <MySection image={background3} />
          <MySection image={background4} />
        </div>
      );
    }}
  />
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <FullpageWrapper />
  </ApolloProvider>,
  document.getElementById("root"),
);
