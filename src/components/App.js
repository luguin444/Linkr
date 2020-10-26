import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import LoginPage from '../pages/LoginPage'

export default function App () {

    
    return (

        <>
            <Router>
                <Switch>
                    <Route path = "/">
                        <LoginPage />
                    </Route>
                </Switch>
            </Router>
        </>

    );
}