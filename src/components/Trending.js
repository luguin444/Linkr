import React from 'react'
import styled from 'styled-components'

export default function Trending () {
    
    return (
        <BoxTrending>
        <div className="title">
            trending
        </div>
        <div className="hashtag">   
           <p># javascript</p> 
           <p># react</p>
           <p># react-native</p>
           <p># material</p>
           <p># web-dev</p>
           <p># mobile</p>
        </div>
        
    </BoxTrending>
        
    );
}


const BoxTrending = styled.div ` 
    background: black;
    width: 19.8rem;
    border-radius: 1rem;
    height: 20rem;
    margin: 0 1rem 0 1rem;
    

    .title {
        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 1rem;
        line-height: 3rem;
        padding-left: 0.8rem;
        border-bottom: 0.5px solid #333;
        letter-spacing: 0.05rem;

    }

    .hashtag {
        font-family: 'Lato', sans-serif; 
        color: white;
        font-size: 1rem;
        letter-spacing: 0.05rem;
        padding:0.8rem;
        line-height: 1.3rem;
        font-weight: 700;
    }

`;