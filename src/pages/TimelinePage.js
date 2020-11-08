import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { SiProbot} from "react-icons/si";
import InfiniteScroll from 'react-infinite-scroller'

import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Trending from '../components/Trending';
import Post from '../components/Post';
import SearchForPeople from '../components/SearchForPeople';

import UserContext from '../contexts/UserContext';


export default function TimelinePage () {

    const {userDataObject, setUserDataObject} = useContext(UserContext);

    const [postsTimeline, setPostsTimeline] = useState([]);
    const [usersFollowed, setUsersFollowed] = useState([]);
    const [newpostsOcurred, setNewpostsOcurred] = useState(false);
    const [postDeleted, setPostDeleted] = useState(false);
    const [postEdited, setPostEdited] = useState(false);
    const [requestReturned, setRequestReturned] = useState(false);
    const [timesScrolled, setTimesScrolled] = useState(10);
    
  
    useEffect( () => {

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows", { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setUsersFollowed(data.users);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter os seus seguidores. Por favor atualize a página");
        });
    } , []);

    useEffect(() => requestPostFromFollowersPeriodically(true),[newpostsOcurred, postDeleted,postEdited]);

    useEffect( () => {
        const interval = setInterval(requestPostFromFollowersPeriodically, 15000);
        return () => clearInterval(interval);    //apaga o intervalo ao sair da Timeline page  (unmount component)
    } , []);

    function requestPostFromFollowersPeriodically (mustBeNowUpdated) {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts?limit=10`,{headers: userDataObject.headerToken });
            
        setNewpostsOcurred(false);
        setPostDeleted(false);
        setPostEdited(false);

        request.then( ({data}) => {
            let newPostsVector = data.posts;
            if(!mustBeNowUpdated) {
                newPostsVector = newPostsVector.filter(p => !(postsTimeline.find( oldPost => oldPost.id === p.id)) );
                setPostsTimeline([...postsTimeline, ...newPostsVector]);
            } else {
                setPostsTimeline(newPostsVector);
            }

            setRequestReturned(true);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter os posts. Por favor atualize a página");
            setRequestReturned(true);
        });
    }
    function requestPostFromFollowersScroll () {

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts?limit=10&offset=${timesScrolled}`,{headers: userDataObject.headerToken });

            
        setNewpostsOcurred(false);
        setPostDeleted(false);
        setPostEdited(false);

        request.then( ({data}) => {
            let newPostsVector = data.posts;
            setPostsTimeline([...postsTimeline, ...newPostsVector]);
            setRequestReturned(true);     
            setTimesScrolled(timesScrolled+10);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter os posts. Por favor atualize a página");
            setRequestReturned(true);
        });
    }

    
    return (
        <>
            <Header />           
            <SearchForPeople />       
            <Main>
                <Title >
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
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={requestPostFromFollowersScroll}
                                hasMore={true}
                                loader={<img  src = "/images/loading3.gif" className = "loading" />}
                            >
                               { postsTimeline.map( post => 
                                    <Post 
                                        post = {post} 
                                        //key = {post.id} 
                                        setPostDeleted = {setPostDeleted} 
                                        setPostEdited = {setPostEdited}
                                    />)}
                            </InfiniteScroll>
                        }                   
                    </Posts>
                    <Trending />  
                </ContainerPage>          
            </Main>
        </>
    );
}

export const Main = styled.div ` 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    
    @media(max-width: 800px) {
        margin: 4rem 0 0 0;
        align-items: flex-start;
    }
`;

export const Title = styled.h1` 
    width: 53vw;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    line-height: 5rem;
    display: flex;
    justify-content:flex-start;
    align-items: center;

    @media(max-width: 800px) {
        width: 100vw;
        display: flex;
        padding: 1rem;
        margin-top: 5rem;
        line-height: 2.1rem;
        flex-direction: column;
        align-items: flex-start;
    
    }
`;

export const ContainerPage = styled.div` 
    width: 53vw;
    display: flex;
    justify-content: space-around;
`;

export const Posts = styled.div ` 
    width: 70%; 
    flex-shrink: 0;

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
        margin: 0; 

        .loading {
            margin: 3rem 7rem;
        }
    }
`;