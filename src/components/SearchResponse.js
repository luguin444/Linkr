import React from 'react'
import styled from 'styled-components'



export default function SearchResponse (props) {
    const {user} = props;
    console.log(user);
    

    return (
        <ContainerSearchResponse>
            <BoxUser>
                <img src={user.avatar} />
                <span>{user.username}</span>
                {user.isFollowingLoggedUser ? <li><span>following</span></li> : " "}
            </BoxUser>

        </ContainerSearchResponse>

    )

}

const ContainerSearchResponse = styled.div `
    width: 35rem;
    height: 9rem;
    background: #E7E7E7;
    border-radius: 8px;
    padding-top: 1.6rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: -1;

`;

const BoxUser = styled.div `
    margin: 1rem;
    display: flex;
    align-items: center;
    font-family: 'Lato', sans-serif;

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