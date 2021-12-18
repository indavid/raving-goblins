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
                <Row style={{ marginBottom: '0.5em' }} >
                    <Col span={24} align="middle">
                        <div className="title-logo" />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <a href="#About">
                            <button class="pushable">
                                <span class="front">
                                    START GAME
                                </span>
                            </button>
                        </a>
                        <div class="arrow"></div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <div class="circle-goblin"></div>
                <div class="player-goblin"></div>
            </div>
        )
    }
}

export default HomeSection;