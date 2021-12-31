import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { useEffect } from "react";
import { Layout, Menu } from 'antd';
import ReactDOM from "react-dom";
import 'react-app-protect/dist/index.css';
import ReactFullpage from "@fullpage/react-fullpage";
import "antd/dist/antd.css";
import "./index.css";
import ReactGA from 'react-ga';

// Importing the Header, Content, and Footer components from the Layout component
const { Header, Content, Footer } = Layout;

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
 
const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

/** Importing Background Components for this SPA */
import { HomeSection, AboutSection, EventSection, MintSection, RaritySection, RoadmapSection, TeamSection } from "./components";
const anchors = ["Home", "About", "Event", "Mint", "Rarity", "Roadmap", "Team"];

const FullpageWrapper = () => (
  <ReactFullpage
    licenseKey={'2C3F4625-E1BA4DB2-B8634B88-4ED05985'}
    anchors={anchors}
    navigation 
    navigationTooltips={anchors}
    autoScrolling={false}
    onLeave={(origin, destination, direction) => {
      console.log("onLeave", origin, destination, direction);
    }}
    render={({ state, fullpageApi }) => {
      console.log("render prop change", state, fullpageApi);
      return (
        <div>
          <HomeSection />
          <AboutSection />
          <EventSection />
          <MintSection />
          <RaritySection />
          <RoadmapSection />
          <TeamSection />
        </div>
      );
    }}
  />
)

// Initialize the Google Analytics tracker
const GAComponent = () => {
  useEffect(() => {
    ReactGA.initialize('UA-215916583-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  return <div></div>
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Layout className="layout">
      <GAComponent />
      <Header 
          style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#23003F' }}
      >
          <div className="logo" />
          <Menu 
              theme="dark" 
              mode="horizontal"
              style={{
                  backgroundColor: '#23003F',
              }}
          >
              <Menu.Item key={"Home"}><a href="#Home">HOME</a></Menu.Item>
              <Menu.Item key={"About"}><a href="#About">ABOUT</a></Menu.Item>
              <Menu.Item key={"Event"}><a href="#Event">EVENT</a></Menu.Item>
              <Menu.Item key={"Mint"}><a href="#Mint">MINT</a></Menu.Item>
              <Menu.Item key={"Rarity"}><a href="#Rarity">RARITY</a></Menu.Item>
              <Menu.Item key={"Roadmap"}><a href="#Roadmap">ROADMAP</a></Menu.Item>
              <Menu.Item key={"Team"}><a href="#Team">TEAM</a></Menu.Item>
          </Menu>
      </Header>
    </Layout>
    <Content>
      <FullpageWrapper />
    </Content>
    <Footer 
      style={{ 
        textAlign: 'center', 
        color: 'white', 
        backgroundColor: '#300449',
        padding: '2em',
      }}>
        Every Single Moment ©2021 Crafted by David
      </Footer>
  </ApolloProvider>,
  document.getElementById("root"),
);