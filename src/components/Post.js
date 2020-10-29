import React, { useState, useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ReactHashtag from "react-hashtag";
import {Link,useHistory} from "react-router-dom";
import { HiOutlineHeart} from "react-icons/hi"; //vazio cheio
import { IoMdHeart} from "react-icons/io"; //vazio cheio


import { Photo } from './NewPost';


import UserContext from '../contexts/UserContext';


export default function Post (props) {
    
    const {post} = props;

    const history = useHistory();

    const {userDataObject} = useContext(UserContext);

    const [liked, setliked] = useState(isLikedPost(userDataObject));
    const [likesFromPost, setLikesFromPost] = useState([]);
    const [haveILikedOrDisliked, setHaveILikedOrDisliked] = useState(false);


    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    function isLikedPost(userDataObject) {
        return post.likes.find(item => {
            if(item.createdAt)
                return item.userId === userDataObject.user.id; //caso venha da timeline
            else
                return item.id === userDataObject.user.id;  //caso venha dos my-post e my-likes
        });
    }

    function likePost() {
        
        setliked(true);
        setHaveILikedOrDisliked(true);
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/like`, {}, { headers: userDataObject.headerToken });

        request.then(({data}) => {
            setLikesFromPost(data.post.likes);
        });
    }

    function dislikePost() {
        
        setliked(false);
        setHaveILikedOrDisliked(true);
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/dislike`, {}, { headers: userDataObject.headerToken });

        request.then(({data}) => {
            setLikesFromPost(data.post.likes);
        });
    }

    function UserWhoLiked () {

        if (haveILikedOrDisliked) {
            const UsernamesLiked = likesFromPost.map(item => item.username);
            console.log(UsernamesLiked);
        } else {
            const UsernamesLiked = post.likes.map(item => item['user.username']);
            console.log(UsernamesLiked);
        }



    }

    return (
        <BoxPost>
            <LateralContainer>
                <Photo> 
                        <img src={post.user.avatar} onClick = { () => history.push(`/user/${post.user.id}`) }/>
                 </Photo>
                 {liked ? 
                    <IoMdHeart className  = "icon red" onClick = { () => dislikePost()} /> : 
                    <HiOutlineHeart className  = "icon white" onClick = { () => likePost()} /> 
                }
                <span onClick = {() => UserWhoLiked()}>{ `${haveILikedOrDisliked ? likesFromPost.length : post.likes.length} likes` }</span>  
            </LateralContainer>
            
            <PostData>
                <Link to = {`/user/${post.user.id}`} key = {post.user.id}>
                    <div className="name">
                        {post.user.username}
                    </div>
                </Link>
                <div className="description">
                    <ReactHashtag onHashtagClick = {value => history.push(`/hashtag/${value.substr(1)}`)}>
                        {post.text}
                    </ReactHashtag> 
                </div>
                
                <div className="link" onClick={() => openInNewTab( `${ post.link }`)}>
                    <div className = "infoPost">
                        <div> { post.linkTitle}</div>
                    
                        <div className = "description"> 
                                {`${post.linkDescription}`}                                               
                        </div> 
                         
                    
                        <div> { post.link } </div>
                    </div>
                    <img src = { post.linkImage}/>
                </div>
    
            </PostData>
    </BoxPost>
        
    );
}


const BoxPost = styled.article `
    height: auto;
    width: 38.2rem;
    background: #171717;
    border-radius: 1rem;
    margin-top: 1.5rem;
    display: flex;
    padding: 1rem;
    font-family: 'Lato', sans-serif;

    @media(max-width: 800px) {
        width: 100vw;
        margin-left: 0;
        border-radius: 0;
        padding: 0.5rem;
    }
`;

const LateralContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
        margin-top: 1rem;
        font-size: 1.6rem;
    }

    .red {
        color: red;
    }
    .white {
        color: #fff;
    }

    span {
        color: #fff;
        margin-top: 0.35rem;
        font-size: 0.8rem;
    }
`

const PostData = styled.div `
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    margin-bottom: 0.4rem;
    word-break: break-word;
   

    .name {
        font-size: 1.15rem;
        line-height: 1.4rem;
        color: #FFF;
    }

    .description {
        margin-top: 0.5rem;
        font-size: 1.15rem;
        line-height: 1.4rem;
        color: #B7B7B7;
        font-weight: 700;
        word-break: break-word;

        span {
            color: #fff;
            font-weight: bold;
        }
    }

    .link {
        border: 1px solid #4D4D4D;
        border-radius: 0.8rem;
        width: 31rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        .infoPost {
            flex-grow: 1;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            border-top-left-radius: 0.8rem;
            border-bottom-left-radius: 0.8rem;
            word-break: break-word;

            & :first-child  {
                font-size: 1rem;
                line-height: 1.3rem;
                margin-bottom: 0.7rem;
                color: #CECECE;
            }
            .description {
                font-size: 0.7rem;
                line-height: 0.8rem;
                margin-bottom: 0.7rem;
                color: #9b9595;
            }
            & :last-child  {
                font-size: 0.7rem;
                line-height: 0.8rem;
                color: #CECECE;
            }
        }

        img {
            width: 10rem;
            object-fit: cover;
            border-top-right-radius: 0.8rem;
            border-bottom-right-radius: 0.8rem;
        }
    }

    @media(max-width: 800px) {

        .name {
            font-size: 1rem;
            line-height: 1.1rem;
        }
        .description {
            font-size: 1rem;
            line-height: 1.1rem;
        }
        
        .link {
            width: 100%;
            /* height: 10rem; */

            .infoPost {

                & :first-child  {
                    font-size: 0.8rem;
                    line-height: 0.9rem;
                    margin-bottom: 0.3rem;
        
                }
                .description {
                    margin-bottom: 0.3rem;
                   
            }
              
        }

     }
    }

`;