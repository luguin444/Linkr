import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import TimelinePage from '../pages/TimelinePage'
import MyPosts from '../pages/MyPosts'
import Hashtags from '../pages/Hashtags'
import User from '../pages/User'
import MyLikes from '../pages/MyLikes'

import UserContext, {UserProvider} from '../contexts/UserContext'

export default function App () {
   
    return (
        <UserProvider >
            <Router basename='/Linkr'>
                <Switch>
                    <Route exact path = "/hashtag/:hashtag">
                        <Hashtags />
                    </Route>
                    <Route exact path = "/user/:id">
                        <User />
                    </Route>
                    <Route exact path = "/my-posts">
                        <MyPosts />
                    </Route>
                    <Route exact path = "/my-likes">
                        <MyLikes />
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