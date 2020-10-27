import React from 'react'
import styled from 'styled-components'
import { Photo } from './NewPost';



export default function Post (props) {
    
    const {post} = props;
    //console.log(post);

    return (
        <BoxPost>
            <Photo> 
                <img src={post.user.avatar}/>
            </Photo>        

            <PostData>
                <div className="name">
                    {post.user.username}
                </div>
                <div className="description">
                    {post.text}
                </div>
                <div className="link">
                    <div className = "infoPost">
                        <div> { post.linkTitle}</div>
                        <div className = "description"> { post.linkDescription}</div>
                        <div> { post.link} </div>
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
    }

    .link {
        border: 1px solid #4D4D4D;
        border-radius: 0.8rem;
        width: 31rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;

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

`;