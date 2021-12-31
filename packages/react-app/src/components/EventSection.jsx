import React from "react";
import { Row, Col, Typography, Divider } from 'antd';
import "./index.css";
import background7 from "../static/bgs/bg7.gif";

const { Title, Paragraph, Text, Link } = Typography;

class CommunitySection extends React.Component {
    render() {
        return (
            <div 
                className="section"
                style={{ 
                    backgroundImage: `url(${background7})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Row>
                    <Col span={24} align="middle" style={{ marginBottom: '0.5em' }} >
                        <div className="squid-game-event" />
                    </Col>
                </Row>
                <Row align="middle" style={{ marginBottom: '6em' }}>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <div className="text">
                            <Typography>
                                <Title style={{ color: '#0CEEFF', textAlign: 'center', marginBottom: '0.5em' }}>
                                    Squid Goblins Game Prizes Worth <div style={{ fontSize: '8vw', color: '#B9F8FD' }}>$20,000</div>
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Among 2,000 Raving Goblin NFTs being released this 1st Drop are 456 Squid Goblins NFTs hidden, holders of the Squid Goblins NFT will be invited to participate in the Squid Game.
                                </Paragraph>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Squid Game Date: To Be Announced After the Minting.
                                    Type of Game to Be Played in the Squid Game will also be Annouced in the Discord
                                </Paragraph>
                                <Title level={1} style={{ color: '#0CEEFF', textAlign: 'center' }}>
                                    Top 3 Prizes for Winners: 
                                </Title>
                                <Title level={2} style={{ color: '#B9F8FD' }}>
                                    1. Legend Raving Goblins NFT
                                </Title>
                                <Title level={2} style={{ color: '#B9F8FD' }}>
                                    2. $10,000 USDT
                                </Title>
                                <Title level={2} style={{ color: '#B9F8FD' }}>
                                    3. $10K Muin Club VIP Table
                                </Title>
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

export default CommunitySection;