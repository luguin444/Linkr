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
                    <NewPost>
                        <Info>
                            <Photo> 
                                <img src="https://d26lpennugtm8s.cloudfront.net/stores/861/835/products/dobbt11-d0b3f13551c024bb4415358341779424-640-0.jpg" />
                            </Photo>
                            <ContainerPost>
                                <h3> O que você tem pra favoritar hoje? </h3>
                                <input placeholder="http://..." ></input>
                                <textarea placeholder="Muito irado esse link falando de #javascript"  rows="4" cols="33"> </textarea>
                            </ContainerPost>           
                
                        </Info>
                        <Publish>
                            <Button> Publish </Button>
                        </Publish>
                        
                        

                    </NewPost>
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
    width: 60%;
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

const Posts = styled.div ` 
    width: 70%;
    
    
`;

const NewPost = styled.div `
    width: 38.2rem;
    background: white;
    padding: 1rem;
    border-radius: 1rem;
    
`;

const Info = styled.div `
    width: 100%;
    display: flex;
    

`;

const Photo = styled.div `
    display: flex;
    justify-content: center;
    align-items: flex-start;

    img {
        width: 3rem;
        border-radius: 50%;
        flex-shrink: 0;
        margin-left: 1rem;

    }
    

`;

const Publish = styled.div `
    width: 100%;
    display: flex;
    justify-content: flex-end;

`;

const Button = styled.button `
    background: #1877F2;
    width: 7rem;
    height: 2rem;
    border-radius: 0.3rem;
    border: 0;
    margin-right: 1.3rem;
   

    &:focus {
        outline: 0;
    }


`;

const ContainerPost = styled.div `
    width: 80%;
    height: 10rem;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;

    input {
        background: #EFEFEF;
        border-radius: 0.3rem;
        border: 0;
        margin: 1rem 0;
        line-height: 2rem;
    }

    textarea {
        background: #EFEFEF;
        border-radius: 0.3rem;
        border: 0;

    }

    

`;