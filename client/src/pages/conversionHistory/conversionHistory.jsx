import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './conversionHistory.css';
import { Row, Container } from 'react-bootstrap'
export default function converterHistory() {


    return (
        <div className="converter-history">
            <div className="pickar-logo-white">
                <img className="ml-4 mt-4" src="../../pickar_logo_white.png" />
            </div>
            <div className="navigate-back">
                <Link style={{
                    color: "#FFF",
                    fontSize: "12px",
                    lineHeight: "14px"
                }}
                    className="ml-4" to="/converter"> Go back </Link>
            </div>
            <div className="content">
                <Row>
                    <Container>
                        <div class="d-flex flex-flow-row-wrap mb-4">
                            <p style={{
                                opacity: "0.5",
                                color: "#FFF",
                                fontSize: "12px",
                                lineHeight: "14px"
                            }} className="col-md-4 col-sm-4">Date</p>
                            <p style={{
                                opacity: "0.5",
                                color: "#FFF",
                                fontSize: "12px",
                                lineHeight: "14px"
                            }} className="col-md-4 col-sm-4">From</p>
                            <p style={{
                                opacity: "0.5",
                                color: "#FFF",
                                fontSize: "12px",
                                lineHeight: "14px"
                            }} className="col-md-4 col-sm-4">To</p>
                        </div>
                    </Container>
                </Row>
                <Row>
                    <Container>
                        <div class="d-flex flex-flow-row-wrap my-2" style=
                            {{ backgroundColor: "white", borderRadius: "10px", height: "59px" }}>
                            <p style={{ color: "black" }} className="col-md-4 col-sm-4 px-4 py-2">Date</p>
                            <p style={{ color: "black" }} className="col-md-4 col-sm-4 px-4 py-2">From</p>
                            <p style={{ color: "black" }} className="col-md-4 col-sm-4 px-4 py-2">To</p>
                        </div>
                    </Container>
                </Row>
                <Row>
                    <Container>
                        <div class="d-flex flex-flow-row-wrap my-2" style=
                            {{ backgroundColor: "white", borderRadius: "10px", height: "59px" }}>
                            <p style={{ color: "black" }} className="col-md-4 col-sm-4 px-4 py-2">Date</p>
                            <p style={{ color: "black" }} className="col-md-4 col-sm-4 px-4 py-2">From</p>
                            <p style={{ color: "black" }} className="col-md-4 col-sm-4 px-4 py-2">To</p>
                        </div>
                    </Container>
                </Row>
            </div>

        </div >)

}
