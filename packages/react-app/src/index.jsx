import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { Layout, Menu } from 'antd';
import ReactDOM from "react-dom";
import 'react-app-protect/dist/index.css';
import ReactFullpage from "@fullpage/react-fullpage";
import "antd/dist/antd.css";
import "./index.css";

// Importing the Header, Content, and Footer components from the Layout component
const { Header, Content, Footer } = Layout;

/** Importing Background Components for this SPA */
import { HomeSection, AboutSection, EventSection, MintSection, RaritySection, RoadmapSection, TeamSection } from "./components";

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
 
const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

const anchors = ["Home", "About", "Event", "Mint", "Rarity", "Roadmap", "Team"];

const FullpageWrapper = () => (
  <ReactFullpage
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Layout className="layout">
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
              <Menu.Item>
                <a href="#Home">HOME</a>
              </Menu.Item>
              <Menu.Item>
                <a href="#About">ABOUT</a>
              </Menu.Item>
              <Menu.Item>
                <a href="#Event">EVENT</a>
              </Menu.Item>
              <Menu.Item>
                <a href="#Mint">MINT</a>
              </Menu.Item>
              <Menu.Item>
                <a href="#Rarity">RARITY</a>
              </Menu.Item>
              <Menu.Item>
                <a href="#Roadmap">ROADMAP</a>
              </Menu.Item>
              <Menu.Item>
                <a href="#Team">TEAM</a>
              </Menu.Item>
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