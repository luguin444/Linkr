import React from 'react'
import styled from 'styled-components'
import { AiOutlineDown } from "react-icons/ai";

export default function Header () {
    
    return (
        <StyledHeader>
            <Logo> 
                linkr
            </Logo>
            <User>
                <AiOutlineDown />
                <img src="https://d26lpennugtm8s.cloudfront.net/stores/861/835/products/dobbt11-d0b3f13551c024bb4415358341779424-640-0.jpg" />
            </User>
        </StyledHeader>
        
    );
}

const StyledHeader = styled.div `
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