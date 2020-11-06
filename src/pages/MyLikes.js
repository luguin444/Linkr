import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { SiProbot} from "react-icons/si";

import Header from '../components/Header';
import Trending from '../components/Trending';
import Post from '../components/Post';
import {Title, Main, ContainerPage, Posts} from './TimelinePage'

import UserContext from '../contexts/UserContext';

export default function MyPosts () {

    const {userDataObject} = useContext(UserContext);

    const [myLikes, setMyLikes] = useState([]);
    const [requestReturned, setRequestReturned] = useState(false);

    useEffect( () => {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked`, { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setMyLikes(data.posts);
            setRequestReturned(true);
        })
        request.catch( () => {
            alert("Houve uma falha em obter os seus likes. Por favor atualize a página");
            setRequestReturned(true);
        });
    } , []);
    
    return (
        <>
            <Header />
            <Main>
                <Title>
                    my likes  
                </Title>
                <ContainerPage> 
                    <Posts> 
                        { requestReturned === false ? 
                            <img  src = "/images/loading3.gif" className = "loading" /> :
                            (myLikes.length === 0) ?
                                <div className = "NoPosts"> 
                                    <SiProbot />
                                    <span>Nenhum Post encontrado</span>
                                </div> :
                                myLikes.map( post =>  <Post post = {post} key = {post.id} from = "myLikes"/> )
                        }                    
                    </Posts>
                    <Trending />            
                </ContainerPage>          
             </Main>
        </>
    );
}