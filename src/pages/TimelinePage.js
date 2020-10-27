import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


import UserContext from '../contexts/UserContext';
import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Trending from '../components/Trending';
import Post from '../components/Post';


export default function TimelinePage () {

    
    return (
        <>
        <Header />
 
        <Main>
            <Title>
                timeline
            </Title>
            <ContainerPage> 
                <Posts> 
                    <NewPost />
                    <Post />  
                </Posts>
                <Trending />
               
            </ContainerPage>
            
        </Main>
        </>
    );
}


const Main = styled.div ` 
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
`;

const Title = styled.h1` 
    width: 100%;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    line-height: 5rem;
`;

const ContainerPage = styled.div` 
    width: 100%;
    display: flex;
`;


const Posts = styled.div ` 
    width: 70%; 
`;

