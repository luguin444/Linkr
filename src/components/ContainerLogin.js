import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory} from "react-router-dom";


import Input from './InputLogin'

import UserContext from '../contexts/UserContext'

export default function ContainerLogin () {

    const {userDataObject, setUserDataObject} = useContext(UserContext);

    const [buttonAviability, setButtonAviability] = useState(true);
    const [registered, setRegistered] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [imageURL, setImageURL] = useState('');

    const history = useHistory();

            
    function sendDataToServer() {

        if (registered) {

            const fieldsInBlanckUser = email.length === 0 || password.length === 0 ;

            if ( fieldsInBlanckUser ) {
                alert("É necessário preencher todos os campos!");
                return;
            }
            if (!buttonAviability) 
                return;

                setButtonAviability(false);

                const dataUser = {
                    "email": email,
                    "password": password 
                }
    
                const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in", dataUser);
    
                request.then( ({data}) => {
                    setUserDataObject ({ 'headerToken': {'User-Token': data.token}, 'user': data.user});
                    localStorage.setItem('@user', JSON.stringify({ 'headerToken': {'User-Token': data.token}, 'user': data.user}));
                    setButtonAviability(true);
                    history.push('/timeline');
                })
                request.catch( () => {
                    setButtonAviability(true);
                    alert("Email/senha incorretos");
                })     
        }  else {

            const fieldsInBlanckNewUser = email.length === 0 || password.length === 0 || username.length === 0 || imageURL.length === 0;
            if ( fieldsInBlanckNewUser ) {
                alert("É necessário preencher todos os campos!");
                return;
            }
            if (!buttonAviability)   return;

            
            setButtonAviability(false);

            const Userdata = {
                "email": email,
                "password": password, 
                "username": username, 
                "pictureUrl": imageURL
            }

            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up", Userdata);

            request.then( ({data}) => {
                setUserDataObject ({ 'headerToken': {'User-Token': data.token}, 'user': data.user});
                localStorage.setItem('@user', JSON.stringify({ 'headerToken': {'User-Token': data.token}, 'user': data.user}));
                history.push('/timeline');

            })
            request.catch( (error) => {
                setButtonAviability(true);
                alert("Email inserido já está cadastrado");
                console.log(error.response);
            })

        }

    }

    return (
        <ContainerGray >
            <StyledContainerLogin>
                <Input placeholder = "e-mail" value = {email} onChange = { (event) => setEmail(event.target.value)} type = "email"/>
                <Input placeholder = "password" value = {password} onChange = { (event) => setPassword(event.target.value)} type = "password" />
                {(!registered) && 
                    <>
                        <Input placeholder = "username" value = {username} onChange = { (event) => setUsername(event.target.value)} />
                        <Input placeholder = "picture url" value = {imageURL} onChange = { (event) => setImageURL(event.target.value)} />
                    </>
                }
                <ButtonLogin onClick = { () => sendDataToServer()} disabled = {!buttonAviability}> 
                    {registered ? "Log in" : "Sign up"} 
                </ButtonLogin>
                <span onClick = { () => setRegistered(!registered)} > 
                    {registered ? "First time ? Create an account!" : "Switch back to log in"} 
                </span>
            </StyledContainerLogin>
         </ContainerGray>
    );
}

const ContainerGray = styled.div`
    width: 35%;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;

        @media(max-width: 800px) {
            width: 100%;
            padding: 2rem 0 0 0; 
        }   
`

const StyledContainerLogin = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;

    span {
        margin-top: 0.5rem;
        font-family: 'Lato', sans-serif;
        font-size: 1.2rem;
        color: #fff;
        text-decoration: underline;
    }
`;

const ButtonLogin = styled.button`
    width: 80%;
    height: 4rem;
    border-radius: 0.4rem;
    margin: 0.4rem 0;
    border: 0;
    background-color: #1877f2;
    color: #fff;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
`;