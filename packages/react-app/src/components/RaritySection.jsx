import React from "react";
import { Row, Col, Typography, Divider } from 'antd';
import "./index.css";
import background4 from "../static/bgs/bg4.png";

const { Title, Paragraph, Text, Link } = Typography;

class RaritySection extends React.Component {
    render() {
        return (
            <div 
                className="section"
                style={{ 
                    backgroundImage: `url(${background4})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Row>
                    <Col span={24} align="middle" >
                    </Col>
                </Row>
                <Row align="middle" style={{ marginTop: '3em', marginBottom: '5em' }}>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <div className="text">
                            <Typography>
                                <Title style={{ color: '#0CEEFF', marginTop: '0.5em', marginBottom: '0.5em' }}>
                                    Rarity
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    All RavingGoblins are dope, but they all come in different tiers. The common ones are comprised of a unique body, bat, hat, scarf, shoes, and background. The rare ones are limited editions of korean nobles, artists, musicians, stars, ravers, and more.
                                </Paragraph>
                                <Title level={2} style={{ color: '#B9F8FD' }}>
                                    Legend: 0.5%  |
                                    Superare: 2.4% |
                                    Rare: 8.4% |
                                    Uncommon: 2.2% |
                                    Squid Game: 4.4% |
                                    Common: 82.2%
                                </Title>
                                <Title style={{ color: '#0CEEFF', marginBottom: '0.5em' }}>
                                    Utility
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Minting RavingGoblins will give you access to the most exclusive degenerate party community in the world. We are not just bringing the party to you but we need your help to bring the party to everyone else.
                                    Together we will be building the dopest clubs in the metaverse and the universe to party the next millennium away.
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF', marginBottom: '0.5em' }}>
                                    Gacha
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Minting a RavingGoblin is a completely randomized system with no control from the team. The gachapon treats everyone equally and dispenses each type of Raving Goblin according to its stated rarity. May the Ether be with You.
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

export default RaritySection;