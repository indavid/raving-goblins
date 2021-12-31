import React from "react";
import { Row, Col } from 'antd';
import "./index.css";
import background1 from "../static/bgs/bg1.gif";

class HomeSection extends React.Component {
    render() {
        return (
            <div 
                className="section"
                style={{ 
                    backgroundImage: `url(${background1})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Row style={{ marginTop: '25vh' }} >
                    <Col span={24} align="middle">
                        <div className="title-logo" />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <a href="#About">
                            <button className="pushable">
                                <span className="front">
                                    START GAME
                                </span>
                            </button>
                        </a>
                        <div className="arrow" style={{ marginTop: '3vh' }}></div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row style={{ marginTop: '1vh' }}>
                    <Col span={6}></Col>
                    <Col span={6} align="left">
                        <div className="circle-goblin" />
                    </Col>
                    <Col span={6} align="right">
                        <div className="player-goblin" />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default HomeSection;