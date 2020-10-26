import React, {useState} from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Input from './InputLogin'

export default function ContainerLogin () {

    const [registered, setRegistered] = useState(true); // true = log in

    function sendDataToServer() {
        
    }

    return (
        <ContainerGray >
            <StyledContainerLogin>
                <Input placeholder = "e-mail"/>
                <Input placeholder = "password" />
                {(!registered) && 
                    <>
                        <Input placeholder = "username"/>
                        <Input placeholder = "picture url"/>
                    </>
                }
                <ButtonLogin onClick = { () => sendDataToServer()}>{registered ? "Log in" : "Sign up"}</ButtonLogin>
                <span> {registered ? "First time ? Create an account!" : "Switch back to log in"} </span>
            </StyledContainerLogin>
         </ContainerGray>
    );
}

const ContainerGray = styled.div`
    width: 35%;
    min-height: 100vh;
    background-color: #333;
    padding: 15rem 0 0 0;    
`

const StyledContainerLogin = styled.ul`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;

    span {
        margin-top: 0.5rem;
        font-family: 'Lato', sans-serif;
        font-size: 1.2rem;
        color: #fff;
        text-decoration: underline;
    }
`

const ButtonLogin = styled.button`
    width: 80%;
    height: 4rem;
    border-radius: 0.4rem;
    margin: 0.4rem 0;
    border: 0;
    background-color: #1877f2;
    color: #fff;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
`

