import React from "react";
import { Row, Col, Typography, Divider } from 'antd';
import "./index.css";
import background2 from "../static/bgs/bg2.png";

const { Title, Paragraph, Text, Link } = Typography;

class AboutSection extends React.Component {
    render() {
        return (
            <div 
                className="section"
                style={{ 
                    backgroundImage: `url(${background2})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Row>
                    <Col span={24} align="middle" style={{ marginTop: '3em' }}>
                        <div className="sm-title-logo" />
                    </Col>
                </Row>
                <Row align="middle" style={{ marginBottom: '5em' }}>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <div className="text">
                            <Typography>
                                <Paragraph style = {{ color: '#EBFEFF' }}>
                                Raving Goblins is a collection of 10,443 unique Goblin NFTs - unique digital collectibles partying on the Ethereum blockchain.
                                </Paragraph>
                                <Paragraph style = {{ color: '#EBFEFF' }}>
                                    Raving Goblins are from a tiny planet hidden in a galaxy far faraway. Their world is a chaotic world that runs on a cosmic energy filled with music, dance, and art. 
                                </Paragraph>
                                <Paragraph style = {{ color: '#EBFEFF' }}>
                                    This energy can only be harvested through the parties Raving Goblins hold every night every single moment. These unique, fun-loving creatures are always throwing down the best parties in the universe.
                                </Paragraph>
                                <Paragraph style = {{ color: '#EBFEFF' }}>
                                    And now the Raving Goblins are here to bring the party to Planet Earth.
                                </Paragraph>
                            </Typography>
                            <div className="arrow"></div>
                        </div>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </div>
        )
    }
}

export default AboutSection;