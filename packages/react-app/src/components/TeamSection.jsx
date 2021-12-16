import React from "react";
import { Row, Col, Typography, Divider } from 'antd';
import "./index.css";
import background6 from "../static/bgs/bg6.png";

const { Title, Paragraph, Text, Link } = Typography;

class TeamSection extends React.Component {
    render() {
        return (
            <div 
                className="section"
                style={{ 
                    backgroundImage: `url(${background6})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Row 
                    align="middle"
                    style={{ marginBottom: '0.5em' }}
                >
                    <Col span={5}></Col>
                    <Col span={14}>
                        <div className="text">
                            <div className="sm-2-title-logo" />
                            <Typography>
                                <Title style={{ color: '#0CEEFF', textAlign: 'center', fontSize: '2.5em' }}>
                                    TEAM
                                </Title>
                            </Typography>
                            <div className="team" />
                        </div>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </div>
        )
    }
}

export default TeamSection;