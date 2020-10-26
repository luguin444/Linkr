import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import styled from 'styled-components'

import ContainerLogin from '../components/ContainerLogin'


export default function LoginPage () {

    
    return (
        <>
            <ContainerAll>
                <ContainerLogo> 
                    <h1>linkr</h1>
                    <p> 
                        save, share and discover <br /> the best links on the web
                    </p>
                </ContainerLogo>
                <ContainerLogin />
            </ContainerAll>
        </>
    );
}

const ContainerAll = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
`

const ContainerLogo = styled.div`
    width: 65%;
    min-height: 100vh;
    background-color: black;
    color: #fff;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    padding: 15rem 0 0 8rem;

    h1 {
        font-family: 'Passion One', cursive; 
        font-size: 8rem;
        letter-spacing: 0.3rem;
    }

    p {
        font-family: 'Oswald', sans-serif;
        font-size: 3rem;
        line-height: 4.2rem
    }
    
`

