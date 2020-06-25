import React from 'react'
import { Form, Row, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import makeRequest from '../../shared/service/currencyConverter.service';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import './converter.css'
export default class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 0,
            inputToCurrency: "EUR",
            inputFromCurrency: "EUR",
            outputValue: "",
            result: "", result2: ""
        }
    }
    handleValueOnChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleToInputOnChange = (e) => {
        console.log(e.target.value)
        this.setState({
            inputToCurrency: e.target.value
        })
    }
    handleFromInputOnChange = (e) => {
        console.log(e.target.value)
        this.setState({
            inputFromCurrency: e.target.value
        })
    }
    handleSwap = (event) => {
        const from = this.state.inputToCurrency;
        const to = this.state.inputFromCurrency;
        this.setState({
            inputFromCurrency: from,
            inputToCurrency: to
        },
            () => {
                console.log(this.state.inputToCurrency)

            }
        )
        this.handleConversion(event);
        console.log(this.state)
    }
    handleConversion = (e) => {
        e.preventDefault();
        const from = this.state.inputFromCurrency;
        const to = this.state.inputToCurrency;
        try {
            makeRequest(from, to)
                .then((result) => {
                    const value = Object.keys(result.data)
                    const answer = (result.data[value]) * (this.state.inputValue)
                    console.log(answer)
                    this.setState({
                        outputValue: answer
                    }, () => {
                        console.log(this.state)
                        this.setState({
                            result: this.state.inputValue + " " + this.state.inputFromCurrency + "=",
                            result2: this.state.outputValue + " " + this.state.inputToCurrency
                        })
                    })
                })

        }
        catch (error) {
            console.log(error)
        }

        console.log(this.state)

        // res.then(resp=>console.log(resp))
    }
    render() {
        return (
            <div className="converter">
                <div className="background-upper-half">
                    <div className="pickar-logo-white">
                        <img src="./pickar-logo-white.png" />

                    </div>
                    <p className="headline d-flex align-items-center">Convert currencies in real time

                    </p>
                </div>


                <div className="calculator">
                    <h4>{this.state.result}</h4>
                    <br />
                    <h1>{this.state.result2}</h1>
                </div>

                <div className="d-md-flex align-items-center container">
                    <div style={{ width: "100%" }} className="d-flex justify-content-between align-items-center">
                        <div className="p-4 col-md-8" style={{
                            borderRadius: "5%",
                            boxShadow: "0 41.8px 33.4px rgba(0, 0, 0, 0.086)"
                        }}>
                            <Container>
                                <Form className="d-flex flex-flow-row-wrap align-items-center" onSubmit={this.handleConversion}>
                                    <Form.Group controlId="inputValue" className="col-md-3 col-sm-12">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control onChange={this.handleValueOnChange}
                                            type="number" value={this.state.inputValue} placeholder="1.00" />
                                    </Form.Group>
                                    <Form.Group controlId="inputFromCurrency" className="col-md-3 col-sm-12">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control as="select" value={this.state.inputFromCurrency}
                                            onChange={this.handleFromInputOnChange}>
                                            <option>EUR</option>
                                            <option>USD</option>
                                            <option>CHF</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <FontAwesomeIcon onClick={this.handleSwap} style={{ color: "red" }} icon={faExchangeAlt} />
                                    <Form.Group controlId="inputToCurrency" className="col-md-3 col-sm-12">
                                        <Form.Label>To</Form.Label>
                                        <Form.Control as="select" value={this.state.inputToCurrency}
                                            onChange={this.handleToInputOnChange}>
                                            <option>EUR</option>
                                            <option>USD</option>
                                            <option>CHF</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <button type="submit" className="btn btn-danger col-md-3 col-sm-3">Convert</button>
                                </Form>
                            </Container>
                        </div>
                        <div className="col-md-4" >
                            <Link style={{ float: "right" }} to="/conversion-history">View conversion history></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        )

    }
}
