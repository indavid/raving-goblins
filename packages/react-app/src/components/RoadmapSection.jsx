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
                <Row 
                    align="middle"
                    style={{ marginBottom: '0.5em' }}
                >
                    <Col span={5}></Col>
                    <Col span={14}>
                        <div className="text-2">
                            <Typography>
                                <Title style={{ color: '#0CEEFF' }}>
                                    Roadmap
                                </Title>
                                <Title style={{ color: '#0CEEFF' }}>
                                    1
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    SquidGameEvent: Calling all gamblers to risk their lives to win a Legend Raving Goblin. All you need a Raving Goblins Squid Game NFT but only 456 Squid Game NFTs are dropping in this 1st Drop. So hurry up and mint.
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF', marginBottom: '0.5em' }}>
                                    2
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    The First Drop: The first drop of 2,000 Raving Goblins will be released on 12AM KST December 19, 2021. Each Goblin will go for or 0.03 ETH. First come first serve, so don’t come late to the party.
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF' }}>
                                    3
                                </Title>kr
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Somewhere in Seoul, South Korea: all Raving Goblins will gain access to exclusive parties held in legendary clubs owned by the founding Raving Goblins team.
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF' }}>
                                    4
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    RavingGoblins DAO: Implementing a  DAO will help create a community focused on deciding our direction and expansion of our Web3 ecosystem.
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