import React, { useState, useContext, useEffect} from 'react';
import axios from 'axios'
import styled from 'styled-components';
import {useParams} from "react-router-dom";

import UserContext from '../contexts/UserContext';

export default function ButtonFollow () {

    const {userDataObject} = useContext(UserContext);
    const [followersList, setFollowersList] = useState([]); //lista que vai receber todos os seguimores
    const [follow, setFollow] = useState(false); //falso = nao segue true = segue
    const {id} = useParams();
    const [loadingFollower, setLoadingFollower] = useState(false);

    //olha pros meus seguidores e define se eu ja sigo ou nao este User;
    useEffect( () => {
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows", { headers: userDataObject.headerToken });

            request.then( (response) => {
                setFollowersList(response.data.users) //add lista de seguimores
                setFollow(response.data.users.some(people => people.id.toString() === id.toString()));
                
            }) 
            request.catch( (response) => {
                alert("Não foi possível executar esta operação! Tente novamente")
                
            }) 
    } , [follow]);

    
    //Essa funcao so sera chamada qdo EU qser dar follow/unfollow neste User
    const getFollow = () => {
        setLoadingFollower(true);

        if (follow) {
            //Se eu ja sigo, entao quero dar UNFOLLOW
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/unfollow`,{},{ headers: userDataObject.headerToken });

            request.then( (response) => {
                setFollow(false);
                setLoadingFollower(false);
      
            }) 
            request.catch( (response) => {
                alert("Não foi possível executar esta operação! Tente novamente")
                setLoadingFollower(false);
                
            }) 
            
        } else {
            //Se eu NAO sigo, entao quero dar FOLLOW
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/follow`,{}, { headers: userDataObject.headerToken });

            request.then( (response) => {
                setFollow(true);
                setLoadingFollower(false);
                
            
            }) 
            request.catch( (response) => {
                alert("Não foi possível executar esta operação! Tente novamente");
                setLoadingFollower(false);
                
            }) 

        }

    }


    return (

            <StyledButtonFollow 
                bg={follow ? "#fff" : "#1877F2" } 
                fontColor={follow ? "#1877F2" : "#fff"}
                onClick = { () => getFollow()}
                disabled = {loadingFollower} 
            > 
                {follow ? "Unfollow" : "Follow" } 

            </StyledButtonFollow> 
    )

}

const StyledButtonFollow = styled.button `
    background: ${(props) => props.bg};
    width: 7rem;
    height: 2rem;
    border-radius: 0.3rem;
    border: 0;
    margin-right: 1.3rem;
    color: ${(props) => props.fontColor};
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
   
    &:focus {
        outline: 0;
    }

    @media(max-width: 800px) {
        margin-top: 1rem;
        width: 4.7rem;
        height: 1.7rem;
    }
`;