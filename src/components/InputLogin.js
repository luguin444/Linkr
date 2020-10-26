import React from 'react'
import styled from 'styled-components'


const Input = styled.input`
    background-color: #fff;
    width: 80%;
    height: 4rem;
    border-radius: 0.4rem;
    margin: 0.4rem 0;
    border: 0;
    padding-left: 0.8rem;
    font-size: 1.7rem;

    &::placeholder {
        color: #9F9F9F;
        font-family: 'Oswald';
        line-height: 40px;
        font-size: 1.7rem;
    }
    &:focus {
        outline:0;
    }

`
export default Input