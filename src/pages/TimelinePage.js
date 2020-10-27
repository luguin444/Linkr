import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Trending from '../components/Trending';
import Post from '../components/Post';

import UserContext from '../contexts/UserContext';


export default function TimelinePage () {

    const {userDataObject} = useContext(UserContext);

    const [postsTimeline, setPostsTimeline] = useState([]);

    useEffect( () => {

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=2", { headers: userDataObject.headerToken })
        // const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=2", { headers: {'User-Token': "bcde9953-4288-454c-95d6-f7ae1f0505df"}});

        request.then( ({data}) => {
            setPostsTimeline(data.posts);
            //console.log(data.posts);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter os posts. Por favor atualize a página");
        });
    } , [])

    console.log(postsTimeline);
    
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
                    {postsTimeline.length === 0 ? 
                        <img  src = "/images/loading3.gif" className = "loading" /> :
                        postsTimeline.map( post =>  <Post post = {post} key = {post.id} /> )
                    }
                    
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

    .loading {
        width: 10rem;
        margin: 3rem 13rem;
    }
`;

