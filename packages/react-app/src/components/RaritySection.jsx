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
                                    All RavingGoblins are cool and fun but some of them have traits that make them more cool and fun.
                                </Paragraph>
                                <Title level={2} style={{ color: '#B9F8FD' }}>
                                    Legend: 0.01%-0.05%  |
                                    Superare: 0.06%-0.1% |
                                    Rare: 0.14%-0.29% |
                                    Uncommon: 0.38%-1.9% |
                                    Common: 3.81%-19.05%
                                </Title>
                                <Title style={{ color: '#0CEEFF', marginBottom: '0.5em' }}>
                                    Utility
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Minting RavingGoblins will give you an access to the most exclusive degenerative party community in the world. We are not just bringing the party to you but you'll have the chance to build the party with us.
                                    We will be creating the dopest clubs to party the next millenia away in the metaverse.
                                </Paragraph>
                                <Title style={{ color: '#0CEEFF', marginBottom: '0.5em' }}>
                                    Gacha
                                </Title>
                                <Paragraph style={{ color: '#EBFEFF' }}>
                                    Minting a RavingGoblin is a completely randomized with no control from the team and the supernatural power. The gacha system will give equal opportunity to be cool and fun a goblinly way.
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