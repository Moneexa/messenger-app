import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './conversionHistory.css';
import { Table } from 'react-bootstrap'
export default function converterHistory() {


    return (<div className="converter-history">
        <div className="pickar-logo-white">
            <img className="ml-4 mt-4" src="../../pickar_logo_white.png" />
        </div>
        <div className="navigate-back">
            <Link className="ml-4" to="/converter"> Go back </Link>
        </div>
        <div className="content">
            <div className="container">
                
                
            </div>
        </div>
    </div>)

}
