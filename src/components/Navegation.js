import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";

import UserContext from '../contexts/UserContext';


export default function Navegation () {

    const {setUserDataObject} = useContext(UserContext);

    
    return (
        <StyledNavegation>
            <Link to = "/my-posts"> <div>My posts</div> </Link>
            <Link to = "/my-likes"> <div>My likes</div> </Link>
            <Link to = "/"> <div onClick = { () => setUserDataObject({})}>Logout</div> </Link> 
        </StyledNavegation>
    );
}

const StyledNavegation = styled.div`
    position: fixed;
    right:0;
    top: 4.5rem;
    color: #fff;
    background-color:  #171717;
    font-size: 1.1rem;
    font-family: 'Lato', sans-serif;
    width: 9.4rem;
    height: 6.9rem;
    display: flex;
    justify-content: space-around;
    align-items: center; 
    flex-direction: column;
    border-bottom-left-radius: 1rem;
    padding: 1rem;
`
