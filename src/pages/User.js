import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {SiProbot} from "react-icons/si";
import {useParams} from "react-router-dom";
import styled from 'styled-components';
import Header from '../components/Header';
import Trending from '../components/Trending';
import Post from '../components/Post';
import {Title, Main, ContainerPage, Posts} from './TimelinePage'
import ButtonFollow from '../components/ButtonFollow';

import UserContext from '../contexts/UserContext';

export default function User () {

    const {userDataObject} = useContext(UserContext);
    const {user}  = userDataObject;
    
    const {id} = useParams();

    const [userPosts, setUserPosts] = useState([]);
    const [requestReturned, setRequestReturned] = useState(false);
    const [name, setUserName] = useState(" ");

    useEffect( () => {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}`, { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setUserName(data.user.username);
        })     
    } , []);
    
    useEffect( () => {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/posts?offset=0&`, { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setUserPosts(data.posts);
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
                <UserName>
                    { name }'s posts: 
                    { user.id !== parseInt(id) ? <ButtonFollow /> : ''} 
                </UserName>
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

const UserName = styled.h2 `
    width: 55vw;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    line-height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 800px) {
        width: 100vw;
        display: flex;
        margin: 1rem;
        line-height: 2.1rem;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1.5rem;    
    }
`;