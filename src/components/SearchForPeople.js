import React, { useState, useContext } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import {DebounceInput} from 'react-debounce-input';


// import { FiSearch } from "react-icons/fi"; //luppinha
// import {useParams} from "react-router-dom";

import UserContext from '../contexts/UserContext';

export default function SearchForPeople () { 

    const {userDataObject} = useContext(UserContext);
    const [inputPeople, setInputPeople] = useState('');
    console.log(inputPeople);
  
    if (inputPeople.length >= 3 ) {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${inputPeople}`, { headers: userDataObject.headerToken });

        request.then(response => {
            console.log(response);
             
        })
        request.catch( ({data}) => {
            console.log("Deu erro")
             
        });

    }
    

    return (
        <DebounceInput
                placeholder="Search for people and friends" 
                minLength={3}
                debounceTimeout={300}
                value = {inputPeople} 
                onChange={event => setInputPeople(event.target.value)}
                               
        /> 
        
    )



}

const StyledSearchPeople = styled.input `
    height: 2.5rem;
    width: 35rem;
    background: #fff;
    border-radius: 0.3rem;
    border: 0;
    margin: 0.5rem 0.5rem 0.5rem 0.9rem;
    line-height: 1.4rem;
    padding-left: 0.5rem;
    font-family: 'Lato', sans-serif;
    font-size: 1.2rem;
    color: #E7E7E7;
    

        &:focus {
        outline:0;
    }

`;