import React from 'react'
import styled from 'styled-components'
import ReactHashtag from "react-hashtag";
import {Link,useHistory} from "react-router-dom";

import { Photo } from './NewPost';





export default function Post (props) {
    
    const {post} = props;

    const history = useHistory();

    
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <BoxPost>
            <Link to = {`/user/${post.user.id}`} key = {post.user.id}>
                <Photo> 
                    <img src={post.user.avatar}/>
                </Photo>        
            </Link>

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


const PostData = styled.div `
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
   

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
        
        .link {
            width: 100%;
              
        }
    }

`;