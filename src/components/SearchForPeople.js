import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {DebounceInput} from 'react-debounce-input';


// import { FiSearch } from "react-icons/fi"; //luppinha
// import {useParams} from "react-router-dom";


import UserContext from '../contexts/UserContext';
import SearchResponse from './SearchResponse';

export default function SearchForPeople () {
    const {userDataObject} = useContext(UserContext);
    const [inputPeople, setInputPeople] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    console.log(searchUsers);


    useEffect( () => {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${inputPeople}`, { headers: userDataObject.headerToken });

        request.then(response => {
            setSearchUsers(response.data.users);    
            setSearchUsers(response.data.users);  
            followersFirst(response.data.users);

        })
    } , [inputPeople]);


    function followersFirst(array) {
        const arrayTrue = array.filter(user => user.isFollowingLoggedUser === true);  
        const arrayFalse = array.filter(user => user.isFollowingLoggedUser === false)
        const orderedList = arrayTrue.concat(arrayFalse);
        setSearchUsers(orderedList);
    }

    return (
        <StyledSearchPeople>
            <DebounceInput

                placeholder="Search for people and friends" 
                minLength={2}
                debounceTimeout={300}
                value = {inputPeople} 
                onChange={event => setInputPeople(event.target.value)}

                onChange={event => setInputPeople(event.target.value)}                
             /> 
            <ContainerSearchResponse>
                {searchUsers.map(user => <SearchResponse user={user} key={user.id} /> )}
            </ContainerSearchResponse>


        </StyledSearchPeople>

    )

}

const StyledSearchPeople = styled.div `
        display:flex;
        align-items: center;
        position: fixed;
        top: 1rem;
        left: 30%;
    input {
        height: 2.5rem;
        width: 35rem;
        background: #fff;
        border-radius: 0.3rem;
        border: 0;
        margin: 0.5rem 1rem 1rem 1rem;
        line-height: 1.4rem;
        padding-left: 0.5rem;
        font-family: 'Lato', sans-serif;
        font-size: 1.2rem;
        color: #C6C6C6;
        
        &:focus {
            outline:0;
        }
    }

    @media(max-width: 800px) {
            top: 5rem;
            left: 0;
            right: 0.3rem;
            width: 70%;
            padding-left: 0;
            

            input {
                margin-left: 0.7rem;
                width: 95vw;


            }

        }
`;

const ContainerSearchResponse = styled.div `
    width: 35rem;
    background: #E7E7E7;
    padding-top: 1.6rem;
    border-radius: 8px;
    position: absolute;
    top: 1.5rem;
    left: 1rem;
    z-index: -1;

    @media(max-width: 800px) {
        top: 0.6rem;
        left: 0;
        width: 100%;
        margin-left: 0.7rem;

    }
`;