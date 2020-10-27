import React, {useState} from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";


export default function Navegation () {

    
    return (
        <StyledNavegation>
            <div>My posts</div>
            <div>My likes</div>
            <Link to = "/"> <div>Logout</div> </Link> 
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
