import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {SiProbot} from "react-icons/si";
import {useParams} from "react-router-dom";
import styled from 'styled-components'

import Header from '../components/Header';
import Trending from '../components/Trending';
import Post from '../components/Post';
import {Title, Main, ContainerPage, Posts} from './TimelinePage'

import UserContext from '../contexts/UserContext';




export default function User () {

    const {userDataObject} = useContext(UserContext);
    const [follow, setFollow] = useState(false); //falso = nao segue true = segue

    const {id} = useParams();

    const [userPosts, setUserPosts] = useState([]);
    const [requestReturned, setRequestReturned] = useState(false);
    console.log(userPosts);

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
                <Title>
                    {(userPosts.length !== 0) ? `${userPosts[0].user.username }'s posts`: '' }

                    <Follow 
                        bg={follow ? "#fff" : "#1877F2" } 
                        fontColor={follow ? "#1877F2" : "#fff"}
                    > 
                        {follow ? "Unfollow" : "Follow" } 

                    </Follow> 
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



const Follow = styled.button `
    background: ${(props) => props.bg};
    width: 7rem;
    height: 2rem;
    border-radius: 0.3rem;
    border: 0;
    margin-right: 1.3rem;
    color: ${(props) => props.fontColor};
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
   
    &:focus {
        outline: 0;
    }
`;