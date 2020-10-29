import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import {SiProbot} from "react-icons/si";
import {useParams} from "react-router-dom";

import Header from '../components/Header';
import Trending from '../components/Trending';
import Post from '../components/Post';
import {Title, Main, ContainerPage, Posts} from './TimelinePage'

import UserContext from '../contexts/UserContext';


export default function Hashtags () {

    const {userDataObject} = useContext(UserContext);

    const {hashtag} = useParams();

    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [requestReturned, setRequestReturned] = useState(false);

    useEffect( () => {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${hashtag}/posts?offset=0&`, { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setHashtagPosts(data.posts);
            console.log("peguei posts da hashtag:", data.posts);
            setRequestReturned(true);
        })

        request.catch( () => {
            alert("Houve uma falha em obter os posts do hashtag. Por favor atualize a página");
            setRequestReturned(true);
        });
    } , [hashtag]);
    
    return (
        <>
            <Header />
            <Main>
                <Title>
                    {`#${hashtag}`}
                </Title>
            <ContainerPage> 
                <Posts> 
                    { requestReturned === false ? 
                         <img  src = "/images/loading3.gif" className = "loading" /> :
                         (hashtagPosts.length === 0) ?
                             <div className = "NoPosts"> 
                                <SiProbot />
                                <span>Nenhum Post encontrado</span>
                            </div> :
                            hashtagPosts.map( post =>  <Post post = {post} key = {post.id} /> )
                    }                   
                </Posts>
                <Trending />            
            </ContainerPage>          
        </Main>
        </>
    );
}
