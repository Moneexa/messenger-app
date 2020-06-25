import React from 'react'
import { Link, Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Converter from '../converter/converter'
import converterHistory from '../conversionHistory/conversionHistory'

export default function Layout() {
    return (
        <div className="layout">
            <Router>
                <Switch>
                    <Redirect from="/" exact to="/converter" />
                    <Route path="/converter" component={Converter} />
                    <Route path="/conversion-history" component={converterHistory} />
                </Switch>
            </Router>

        </div>

    )
}