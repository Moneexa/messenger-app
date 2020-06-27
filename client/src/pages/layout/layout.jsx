import React from 'react'
import {Converter} from '../converter/converter'
import conversionHistory from '../conversionHistory/conversionHistory'
import {Link, Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './layout.css'
export default class Layout extends React.Component{
    render(){
        return(<div className="layout">
        <Router>
            <Switch>
             <Redirect from="/" exact to="/converter" />
             <Route path="/converter" component={Converter} />
             <Route path="/conversion-history" component={conversionHistory} />
            </Switch>
        </Router>

        </div>)
    }
}
