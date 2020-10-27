import React from 'react'
import styled from 'styled-components'
import { Photo } from './NewPost';



export default function Post (props) {
    
    const {post} = props;
    console.log(post);

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
                    <div>
                        <div> { post.linkTitle}</div>
                        {/* <div> { post.linkDescription}</div> */}
                        {/* <div> { post.link} </div> */}
                    </div>
                    <div className = "linkImage">
                        <img src = { post.linkImage}/>
                    </div>
                </div>
    
            </PostData>
    </BoxPost>
        
    );
}


const BoxPost = styled.article `
    height: 17.2rem;
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
        height: 9.7rem;
        width: 31rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;

        img {
            object-fit: cover;
        }
    }

`;