import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {Link} from "react-router-dom";

import Navegation from './Navegation';

import UserContext from '../contexts/UserContext';

export default function Header () {

    const {userDataObject} = useContext(UserContext);
    
    const [openNavegation, setOpenNavegation] = useState(false);


    return (
        <StyledHeader>
            <Logo> 
               <Link to = "/timeline">linkr</Link> 
            </Logo>
            <User>
                {openNavegation ? 
                    <AiOutlineUp onClick = { () => setOpenNavegation(false) } /> :   
                    <AiOutlineDown onClick = { () => setOpenNavegation(true)}/>
                }

                {openNavegation ? <Navegation /> : ''}
                <img src= {userDataObject.user.avatar} />
            </User>
        </StyledHeader>
        
    );
}

const StyledHeader = styled.div `
    
    position: fixed;
    right: 0;
    top :0;
    width: 100%;
    height: 4.5rem;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem 0 2rem;  
`;

const Logo = styled.div `
    width: 10%;
    font-size: 3.1rem;
    color: white;
    font-family: 'Passion One', cursive;
    font-weight: 700;
    letter-spacing: 0.05rem;
    

`;

const User = styled.div `
    width: 5rem;
    font-size: 1.5rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;

    img {
        width: 3rem;
        border-radius: 50%;
    }
`;
