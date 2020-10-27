import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import UserContext from '../contexts/UserContext'

export default function TimelinePage () {

    const {nome} = useContext(UserContext);
    return (
        <h1>{nome}</h1>
    );
}