import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import TimelinePage from '../pages/TimelinePage'

import UserContext, {UserProvider} from '../contexts/UserContext'

export default function App () {

    
    return (

        <UserProvider >
            <Router>
                <Switch>

                    <Route exact path = "/timeline">
                        <TimelinePage />
                    </Route>

                    <Route exact path = "/">
                        <LoginPage />
                    </Route>
                </Switch>
            </Router>
        </UserProvider>
    );
}