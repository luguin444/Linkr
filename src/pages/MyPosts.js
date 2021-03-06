import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import { SiProbot} from "react-icons/si";

import Header from '../components/Header';
import Trending from '../components/Trending';
import Post from '../components/Post';
import {Title, Main, ContainerPage, Posts} from './TimelinePage'

import UserContext from '../contexts/UserContext';


export default function MyPosts () {

    const {userDataObject} = useContext(UserContext);

    const [myPosts, setMyPosts] = useState([]);
    const [postDeleted, setPostDeleted] = useState(false);
    const [requestReturned, setRequestReturned] = useState(false);

    useEffect( () => {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userDataObject.user.id}/posts?offset=0&`, { headers: userDataObject.headerToken });

        setPostDeleted(true);

        request.then( ({data}) => {
            setMyPosts(data.posts);
            setRequestReturned(true);
        })

        request.catch( () => {
            alert("Houve uma falha em obter os seus posts. Por favor atualize a página");
            setRequestReturned(true);
        });
    } , [postDeleted]);
    
    return (
        <>
            <Header />
            <Main>
                <Title>
                    my posts  
                </Title>
                <ContainerPage> 
                    <Posts> 
                        { requestReturned === false ? 
                            <img  src = "/images/loading3.gif" className = "loading" /> :
                            (myPosts.length === 0) ?
                                <div className = "NoPosts"> 
                                    <SiProbot />
                                    <span>Nenhum Post encontrado</span>
                                </div> :
                                myPosts.map( post =>  <Post post = {post} key = {post.id} setPostDeleted = {setPostDeleted} /> )
                        }                    
                    </Posts>
                    <Trending />            
                </ContainerPage>          
            </Main>
        </>
    );
}