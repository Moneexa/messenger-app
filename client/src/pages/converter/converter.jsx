import React, { useState } from 'react'
import { Form, Row, Container, Button } from 'react-bootstrap'
import makeRequest from '../../shared/service/currencyConverter.service';
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import './converter.css'
export default function Converter () {

    const [inputValue, setInputValue] = useState(0);
    const [inputToCurrency, setInputToCurrency] = useState("EUR");
    const [inputFromCurrency, setInputFromCurrency] = useState("EUR");
    const [outputValue, setOutputValue] = useState(0);
    const [result, setResult] = useState("");
    const [result2, setResult1] = useState("");

    function handleValueOnChange(e) {
        setInputValue(e.target.value)
    }
    function handleToInputOnChange(e) {
        setInputToCurrency(e.target.value)
    }
    function handleFromInputOnChange(e) {
        setInputFromCurrency(e.target.value)
    }
    function handleSwap(event) {
        const from = inputToCurrency;
        const to = inputFromCurrency;
        setInputToCurrency(to);
        setInputFromCurrency(from);
        handleConversion(event);
    }
    
    function handleConversion(e) {
        e.preventDefault();
        const from = inputFromCurrency;
        const to = inputToCurrency;
        console.log(outputValue)
        setResult(inputValue+" "+from+" "+ "=");
        setResult1(outputValue + " " + to);



        // res.then(resp=>console.log(resp))
    }
    return (
        <div className="converter">
            <div className="background-upper-half">
                <div className="pickar-logo-white ml-4 mt-4">
                    <img src="../../pickar_logo_white.png" />
                </div>
                <div className="d-flex col-sm-12 col-md-12" style={{ height: "50vh", position: "relative" }}>
                    <p className="headline ml-4" >
                        Convert currencies in real-time
                    </p>
                </div>
            </div>
            <div className="container over-parent">
                <div className="parent-div">
                    <div className="p-4 col-md-8 col-sm-12 form-div" style={{
                        borderRadius: "10px", backgroundColor: "white",
                        boxShadow: "0 41.8px 33.4px rgba(0, 0, 0, 0.086)"
                    }}>
                        <Container>
                            <Form className="d-flex flex-flow-row-wrap align-items-center" onSubmit={handleConversion}>
                                <Form.Group controlId="inputValue" className="col-md-3 col-sm-12">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control onChange={handleValueOnChange}
                                        type="number" value={inputValue} placeholder="1.00" />
                                </Form.Group>
                                <Form.Group controlId="inputFromCurrency" className="col-md-3 col-sm-12">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control as="select" value={inputFromCurrency}
                                        onChange={handleFromInputOnChange}>
                                        <option>EUR</option>
                                        <option>USD</option>
                                        <option>CHF</option>
                                    </Form.Control>
                                </Form.Group>
                                <FontAwesomeIcon onClick={handleSwap} style={{ color: "red" }} icon={faExchangeAlt} />
                                <Form.Group controlId="inputToCurrency" className="col-md-3 col-sm-12">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control as="select" value={inputToCurrency}
                                        onChange={handleToInputOnChange}>
                                        <option>EUR</option>
                                        <option>USD</option>
                                        <option>CHF</option>
                                    </Form.Control>
                                </Form.Group>
                                <button type="submit" className="btn btn-danger col-md-3 col-sm-3">Convert</button>
                            </Form>
                        </Container>
                    </div>
                    <div className="col-md-4 col-sm-12" >
                        <Link style={{
                            color: "#363A3E",
                            fontSize: "12px",
                            lineHeight: "14px"
                        }} className="history" to="/conversion-history">View conversion history></Link>
                    </div>
                </div>
            </div>

            <div className="calculator">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="container">
                        <p className="input"> {result}</p>
                        <br />
                        <p className="output">{result2}</p>
                    </div>
                </div>
            </div>

        </div>
    )


}
