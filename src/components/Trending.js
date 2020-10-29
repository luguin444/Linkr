import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from "react-router-dom";

import UserContext from '../contexts/UserContext';

export default function Trending () {

    const {userDataObject} = useContext(UserContext);
    
    const [hashtags, setHashtags] = useState([]);

    useEffect( () => {

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending", { headers: userDataObject.headerToken });
        //const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending", { headers: {'User-Token': "bcde9953-4288-454c-95d6-f7ae1f0505df"}});

        request.then( ({data}) => {
            setHashtags(data.hashtags);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter as hashtags. Por favor atualize a página");
        });
    } , []);

    // console.log("Hastags",hashtags);
    
    return (
        <BoxTrending>
        <div className="title">
            trending
        </div>
        <div className="hashtag">   
            {hashtags.map( hashtag => <Link to = {`/hashtag/${hashtag.name}`} key = {hashtag.id} ><p >{`# ${hashtag.name}`}</p></Link> )}
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

    @media(max-width: 800px) {
        display: none;
    }

`;