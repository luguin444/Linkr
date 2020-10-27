import React from 'react'
import styled from 'styled-components'
import { Photo } from './NewPost';



export default function Post () {
    
    return (
        <BoxPost>
            <Photo> 
                <img src="https://d26lpennugtm8s.cloudfront.net/stores/861/835/products/dobbt11-d0b3f13551c024bb4415358341779424-640-0.jpg" />
            </Photo>        

            <PostData>
                <div className="name">
                    Dobby
                </div>
                <div className="description">
                    Eu sou um elfo livre! Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #harrypotter #material
                </div>
                <div className="link">

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

    }

`;