import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import TimelinePage from '../pages/TimelinePage'
import MyPosts from '../pages/MyPosts'
import Hashtags from '../pages/Hashtags'
import User from '../pages/User'
import MyLikes from '../pages/MyLikes'

import {UserProvider} from '../contexts/UserContext'

export default function App () {
  
    return (
        <UserProvider >
            <Router>
                <Switch>
                    <Route exact path = "/user/:id" component = {User} />
                    <Route exact path = "/hashtag/:hashtag" component = {Hashtags} />
                    <Route exact path = "/my-posts" component = {MyPosts} />
                    <Route exact path = "/my-likes" component = {MyLikes} />
                    <Route exact path = "/timeline" component = {TimelinePage} /> 
                    <Route exact path = "/" component = {LoginPage} />                
                </Switch>
            </Router>
        </UserProvider>
    );
}