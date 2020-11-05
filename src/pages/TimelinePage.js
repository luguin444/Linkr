import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { SiProbot} from "react-icons/si";
import Modal from 'react-modal';

//Modal.setAppElement('#root');

import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Trending from '../components/Trending';
import Post from '../components/Post';
import SearchForPeople from '../components/SearchForPeople';

import UserContext from '../contexts/UserContext';


export default function TimelinePage () {

    const {userDataObject} = useContext(UserContext);

    const [postsTimeline, setPostsTimeline] = useState([]);
    const [usersFollowed, setUsersFollowed] = useState([]);
    const [newpostsOcurred, setNewpostsOcurred] = useState(false);
    const [postDeleted, setPostDeleted] = useState(false);
    const [postEdited, setPostEdited] = useState(false);
    const [requestReturned, setRequestReturned] = useState(false);
    
    useEffect(RequestPostFromFollowers,[]);

    useEffect( () => {
        const interval = setInterval(RequestPostFromFollowers, 15000);

        return () => clearInterval(interval);    //apaga o intervalo ao sair da Timeline page  (unmount component)
    } , [newpostsOcurred, postDeleted,postEdited]);

    function RequestPostFromFollowers () {
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts",{headers: userDataObject.headerToken });
            
            setNewpostsOcurred(false);
            setPostDeleted(false);
            setPostEdited(false);

            request.then( ({data}) => {
                setPostsTimeline(data.posts);
                setRequestReturned(true);
            })
            request.catch( ({data}) => {
                alert("Houve uma falha em obter os posts. Por favor atualize a página");
                setRequestReturned(true);
            });
    }

    useEffect( () => {

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows", { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setUsersFollowed(data.users);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter os seus seguidores. Por favor atualize a página");
        });
    } , []);

    return (
        <>
        <Header />
         
        <SearchForPeople />
       
        <Main>
            <Title>
                timeline 
            </Title>
            <ContainerPage> 
                <Posts> 
                    <NewPost setNewpostsOcurred={setNewpostsOcurred} />
                    {requestReturned === false ? 
                        <img  src = "/images/loading3.gif" className = "loading" /> :
                        (usersFollowed.length === 0) ?
                        <div className = "NoPosts"> 
                            <span>Você não segue ninguém ainda, procure por perfis na busca</span>
                        </div> :
                        (postsTimeline.length === 0) ?
                        <div className = "NoPosts"> 
                            <SiProbot />
                            <span>Nenhum Publicação encontrada</span>
                        </div> :
                        postsTimeline.map( post => 
                             <Post 
                                post = {post} 
                                key = {post.id} 
                                setPostDeleted = {setPostDeleted} 
                                setPostEdited = {setPostEdited}
                            />)
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
    display: flex;
    justify-content: space-between;
    align-items: center;

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
        
        span {
            font-size: 1.5rem;
            text-align: center;
        }
    }

    @media(max-width: 800px) {
        width: 100%;
        margin: 0 auto; 

        .loading {
            margin: 3rem 7rem;
        }
    }
`;