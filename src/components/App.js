import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import TimelinePage from '../pages/TimelinePage'
import MyPosts from '../pages/MyPosts'
import Hashtags from '../pages/Hashtags'

import UserContext, {UserProvider} from '../contexts/UserContext'

export default function App () {

    
    return (

        <UserProvider >
            <Router>
                <Switch>

                    <Route exact path = "/hashtag/:hashtag">
                        <Hashtags />
                    </Route>

                    <Route exact path = "/my-posts">
                        <MyPosts />
                    </Route>

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