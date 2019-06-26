import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {  BrowserRouter as Router, Link, Route } from "react-router-dom";
import App from './App';
import User from './user-component/User';
import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/user/:username" component={User} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
