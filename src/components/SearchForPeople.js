import React, { useState,  } from 'react';
// import axios from 'axios'
import styled from 'styled-components';
// import { FiSearch } from "react-icons/fi"; //luppinha
// import {useParams} from "react-router-dom";

// import UserContext from '../contexts/UserContext';

export default function SearchForPeople () { 

    const [inputPeople, setInputPeople] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(inputPeople);
            setInputPeople('');

        }
    }
    


    return (
        <StyledSearchPeople 
                placeholder="Search for people and friends" 
                value = {inputPeople} 
                onChange = { event => setInputPeople(event.target.value)} 
                onKeyDown = { handleKeyDown }                 
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