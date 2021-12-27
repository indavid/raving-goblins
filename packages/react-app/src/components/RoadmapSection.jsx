import React from "react";
import { Row, Col, Typography, Divider } from 'antd';
import "./index.css";
import background5 from "../static/bgs/bg5.png";

const { Title, Paragraph, Text, Link } = Typography;

class RoadmapSection extends React.Component {
    render() {
        return (
            <div 
                className="section"
                style={{ 
                    backgroundImage: `url(${background5})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Row>
                    <Col span={24} align="middle" ></Col>
                </Row>
                <Row align="middle" style={{ marginTop: '3em', marginBottom: '5em' }}>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <div className="text-2">
                            <Typography>
                                <Title style={{ color: '#0CEEFF', marginTop: '0.5em' }}>
                                    Roadmap
                                </Title>
                                <Title style={{ color: '#0CEEFF' }}>
                                    1
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Pre-Sale: The first drop of 2,000 Raving Goblins will be released to friends, family, and insiders. Each Goblin will go for 0.03 ETH. First come, first serve, so hurry up and mint!
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF', marginBottom: '0.5em' }}>
                                    2
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Squid Goblins Game: Calling all our gamblers to risk their lives to win a Legend Raving Goblin or Prizes up to $20,000. All you need is a Squid Game Raving Goblins NFT but you need to find 1 of the 456 Squid Game Goblins hidden amongst the 2000 Pre-Sale Goblins. 
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF' }}>
                                    3
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Somewhere in Seoul, South Korea: all Raving Goblins will gain access to the most exclusive and wildest parties held in clubs owned by the founding Raving Goblins team.
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF' }}>
                                    4
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    RavingGoblins DAO: We will be implementing a DAO to solidify a community dedicated to our Web3 ecosystem.
                                </Paragraph>
                            </Typography>
                            <div class="arrow"></div>
                        </div>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </div>
        )
    }
}

export default RoadmapSection;