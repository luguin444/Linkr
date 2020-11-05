import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";



export default function SearchResponse (props) {
    const { user } = props;
    const { id, avatar, username, isFollowingLoggedUser } = user;

    const history = useHistory();

    return (
       
        <BoxUser onClick = { () => history.push(`/user/${id}`) }>
            <img src={avatar} />
            <span>{username}</span>
            {isFollowingLoggedUser ? <li><span>following</span></li> : " "}
        </BoxUser>
       

    )

}


const BoxUser = styled.div `
    padding: 1rem;
    display: flex;
    align-items: center;
    font-family: 'Lato', sans-serif;
    cursor: pointer;
    img {
        width: 3rem;
        border-radius: 50%;
        flex-shrink: 0;
    }
    span {
        
        font-size: 1.2rem;
        line-height: 1.4rem;
        color: #515151;
        margin-left: 0.8rem;
        
    }
    li {
        color: #C5C5C5;
        margin-left: 0.8rem;
        span {
            margin-left: -0.8rem;
            list-style-type: disc;
            color: #C5C5C5;
        }
        
    }
`;