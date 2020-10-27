import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";

import UserContext from '../contexts/UserContext'

export default function TimelinePage () {

    
    return (
        <>
        <Header>
            <Logo> 
                linkr
            </Logo>
            <User>
                <AiOutlineDown />
                <img src="https://d26lpennugtm8s.cloudfront.net/stores/861/835/products/dobbt11-d0b3f13551c024bb4415358341779424-640-0.jpg" />
            </User>
        </Header>
        
        <Main>
            <Title>
                timeline
            </Title>
            <Container> 
                <Posts> 
                    Posts
                </Posts>
                <Trending>
                    <div className="title">
                        trending
                    </div>
                    <div className="hashtag">   
                       <p># javascript</p> 
                       <p># react</p>
                       <p># react-native</p>
                       <p># material</p>
                       <p># web-dev</p>
                       <p># mobile</p>
                    </div>
                    
                </Trending>
            </Container>
            
        </Main>
        </>
    );
}


const Header = styled.div `
    width: 100%;
    height: 4.5rem;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem 0 0.7rem; 

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

const Main = styled.div ` 
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;


`;

const Title = styled.div` 
    width: 100%;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    line-height: 5rem;
    

`;

const Container = styled.div` 
    width: 100%;
    display: flex;

`;

const Posts = styled.div ` 
    width: 70%;
    background: orange;


`;

const Trending = styled.div ` 
    background: black;
    width: 20%;
    border-radius: 1rem;
    height: 20rem;
    margin: 0 1rem 0 1rem;
    

    .title {
        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 1rem;
        line-height: 3rem;
        padding-left: 0.8rem;
        border-bottom: 0.5px solid #333;
        letter-spacing: 0.05rem;

    }

    .hashtag {
        font-family: 'Lato', sans-serif; 
        color: white;
        font-size: 1rem;
        letter-spacing: 0.05rem;
        padding:0.8rem;
        line-height: 1.3rem;
        font-weight: 700;
    }

`;