import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { SiProbot} from "react-icons/si";

import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Trending from '../components/Trending';
import Post from '../components/Post';

import UserContext from '../contexts/UserContext';


export default function TimelinePage () {

    const {userDataObject} = useContext(UserContext);

    const [postsTimeline, setPostsTimeline] = useState([]);
    const [newpostsOcurred, setNewpostsOcurred] = useState(false);
    const [requestReturned, setRequestReturned] = useState(false);


    useEffect( () => {

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&", { headers: userDataObject.headerToken })
        //const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&", { headers: {'User-Token': "bcde9953-4288-454c-95d6-f7ae1f0505df"}});

        setNewpostsOcurred(false);

        request.then( ({data}) => {
            setPostsTimeline(data.posts);
            console.log("peguei posts:", data.posts);
            setRequestReturned(true);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter os posts. Por favor atualize a página");
            setRequestReturned(true);
        });
    } , [newpostsOcurred]);

    
    return (
        <>
        <Header />
 
        <Main>
            <Title>
                timeline  
            </Title>
            <ContainerPage> 
                <Posts> 
                    <NewPost setNewpostsOcurred={setNewpostsOcurred} />
                    {requestReturned === false ? 
                        <img  src = "/images/loading3.gif" className = "loading" /> :
                        (postsTimeline.length === 0) ?
                        <div className = "NoPosts"> 
                            <SiProbot />
                            <span>Nenhum Post encontrado</span>
                        </div> :
                        postsTimeline.map( post =>  <Post post = {post} key = {post.id} /> )
                    }
                    
                </Posts>
                <Trending />
               
            </ContainerPage>
            
        </Main>
        </>
    );
}


export const Main = styled.div ` 
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;

    @media(max-width: 800px) {
        margin: 0;
    }
`;

export const Title = styled.h1` 
    width: 100%;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    line-height: 5rem;

    @media(max-width: 800px) {
        display: flex;
        justify-content: flex-start;
        padding: 1rem;
        margin-top: 5rem;
        font-size: 2rem;
        line-height: 2.1rem;
    }


`;

export const ContainerPage = styled.div` 
    width: 100%;
    display: flex;
`;


export const Posts = styled.div ` 
    width: 70%; 

    .loading {
        width: 10rem;
        margin: 3rem 13rem;
    }

    .NoPosts {
        color: #fff;
        font-size: 2rem;
        margin-top: 1.5rem;
        width: 38.2rem;
        height: 8rem;
        background: #171717;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-family: 'Oswald', sans-serif; 
    }

    @media(max-width: 800px) {
        width: 100%;
        margin: 0 auto; 
    }
`;


