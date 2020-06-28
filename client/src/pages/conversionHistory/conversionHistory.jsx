import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './conversionHistory.css';
import { Row, Container } from 'react-bootstrap'
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function ConverterHistory() {
    const listify = useStoreActions(actions => actions.currencyInfo.listCurrencyInfo);
    const list = useStoreState(state => state.currencyInfo.list);
    const [inputList, setInputList] = useState([]);
    useEffect(() => {
        listify()
    }, [])
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
                        <div className="d-flex flex-flow-row-wrap mb-4">
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
                {
                    list.map((element, index) => {
                        return (<Row key={index} >
                            <Container>
                                <div className="d-flex flex-flow-row-wrap my-2" style=
                                    {{ backgroundColor: "white", borderRadius: "10px", height: "59px" }}>
                                    <p style={{ color: "black" }} className="col-md-4 col-sm-4 py-2">{element.date}</p>
                                    <p style={{ color: "black" }} className="col-md-4 col-sm-4 py-2">{element.inputAmount + " " + element.from}</p>
                                    <p style={{ color: "black" }} className="col-md-4 col-sm-4 py-2">{element.output + " " + element.to}</p>
                                </div>
                            </Container>
                        </Row>)
                    })
                }

            </div>

        </div >)

}
