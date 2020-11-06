import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";

import UserContext from '../contexts/UserContext';

export default function Trending () {

    const {userDataObject} = useContext(UserContext);
    
    const [hashtags, setHashtags] = useState([]);
    const [inputHashtag, setInputHashtag] = useState('');

    const history = useHistory();
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            history.push(`/hashtag/${inputHashtag}`);
            setInputHashtag('');
        }
    }

    useEffect( () => {

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending", { headers: userDataObject.headerToken });

        request.then( ({data}) => {
            setHashtags(data.hashtags);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter as hashtags. Por favor atualize a página");
        });
    } , []);

    
    return (
        <BoxTrending>
            <div className="title">
                <div>trending</div>
                <input 
                        placeholder="search hashtag" 
                        value = {inputHashtag} 
                        onChange = { event => setInputHashtag(event.target.value)} 
                        onKeyDown = { handleKeyDown }  
                                       
                />         
            </div>
            <div className="hashtag">   
                {hashtags.map( hashtag => <Link to = {`/hashtag/${hashtag.name}`} key = {hashtag.id} ><p >{`# ${hashtag.name}`}</p></Link> )}
            </div>
         </BoxTrending>     
    );
}

const BoxTrending = styled.div ` 
    background: black;
    width: 19rem;
    border-radius: 1rem;
    height: 20rem;
    position: sticky;
    top: 6rem;
    right: 6rem;
    flex-shrink: 0;

    .title {
        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 1rem;
        line-height: 3rem;
        padding-left: 0.8rem;
        margin-right: 1rem;
        border-bottom: 0.5px solid #333;
        letter-spacing: 0.05rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
            height: 1.8rem;
            flex-grow: 1;
            background: #EFEFEF;
            border-radius: 0.3rem;
            border: 0;
            margin: 0.5rem 0.5rem 0.5rem 0.9rem;
            line-height: 0.5rem;
            padding-left: 0.3rem;
            font-family: 'Oswald', sans-serif;
            text-align: center;

                &:focus {
                outline:0;
                }
        }
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