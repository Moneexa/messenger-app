import React, { useState, useEffect } from 'react'
import { Form, Row, Container, Button } from 'react-bootstrap'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import './userLogin.css'
export function UserLogin() {
    const [name, setName] = useState("")
    function handleInputChange(e) {
        setName(e.target.value)
    }
    return (
        <div className="login">
            <Container className="d-flex align-items-center" style={{height:"50vh"}}>
                <Form className="w-100">
                    <Form.Group>
                        <Form.Label>Enter your userName</Form.Label>
                        <Form.Control type="text" value={name} onChange={handleInputChange}></Form.Control>

                    </Form.Group>
                    <Link to={`/chat-interface/${name}/login`}>
                    <Button type="submit" className="btn btn-success mx-2">Login</Button>
                    </Link>
                    <Link to={`/chat-interface/${name}/register`}>

                    <Button type="submit" className="btn btn-primary mx-2">New Account</Button>
                    </Link>

                </Form>
            </Container>
        </div>
    )


}
