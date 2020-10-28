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


export default function User () {

    const {userDataObject} = useContext(UserContext);

    const {id} = useParams();

    const [userPosts, setUserPosts] = useState([]);
    const [requestReturned, setRequestReturned] = useState(false);

    useEffect( () => {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/posts?offset=0&`, { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setUserPosts(data.posts);
            console.log("peguei posts do usuario:", data.posts);
            setRequestReturned(true);
        })

        request.catch( () => {
            alert("Houve uma falha em obter os posts do usuario. Por favor atualize a página");
            setRequestReturned(true);
        });
    } , []);
    
    return (
        <>
            <Header />
            <Main>
                <Title>
                    {(userPosts.length !== 0) ? `${userPosts[0].user.username }'s posts`: '' }
                </Title>
            <ContainerPage> 
                <Posts> 
                    { requestReturned === false ? 
                         <img  src = "/images/loading3.gif" className = "loading" /> :
                         (userPosts.length === 0) ?
                             <div className = "NoPosts"> 
                                <SiProbot />
                                <span>Nenhum Post encontrado</span>
                            </div> :
                            userPosts.map( post =>  <Post post = {post} key = {post.id} /> )
                    }                   
                </Posts>
                <Trending />            
            </ContainerPage>          
        </Main>
        </>
    );
}
