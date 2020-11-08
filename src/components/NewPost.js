import React, { useState, useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import UserContext from '../contexts/UserContext';

export default function NewPost (props) {

    const {setNewpostsOcurred} = props;

    const [isPublishing, setIsPublishing] = useState(false);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');

    const {userDataObject} = useContext(UserContext);

    function OnPostPublish() {

        if(link.length === 0) {
            alert ("O campo link é obrigatório!");
            return;
        }

        setIsPublishing(true);

        const PostObject = {
            'link': link,
            'text': description
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts",PostObject, { headers: userDataObject.headerToken });

        request.then( (response) => {
            setIsPublishing(false);
            setLink('');
            setDescription('');
            setNewpostsOcurred(true);
        }) 
        request.catch( (response) => {
            alert("Houve um erro em publicar seu link");
            setIsPublishing(false);
        }) 
    }   
    return (
        <BoxNewPost>
            <Info>
                <Photo> 
                    <img src= {userDataObject.user.avatar} />
                </Photo>
                <ContainerPost>
                    <h3> O que você tem pra favoritar hoje? </h3>
                    <input 
                        placeholder="http://..." 
                        value = {link} 
                        onChange = { event => setLink(event.target.value)} 
                        disabled = {isPublishing} 
                    />
                    <textarea 
                        placeholder="Muito irado esse link falando de #javascript"    
                        rows="4" cols="33" 
                        value = {description} 
                        onChange = { event => setDescription(event.target.value)}
                        disabled = {isPublishing} 
                    /> 
                </ContainerPost>           
            </Info>
            <Publish>
                <Button onClick = { () => OnPostPublish()}> {isPublishing ? "Publishing..." : "Publish" } </Button>
            </Publish>
         </BoxNewPost>    
    );
}

const BoxNewPost = styled.div `
    width: 38.2rem;
    background: white;
    padding: 1rem;
    border-radius: 1rem;

    @media(max-width: 800px) {
        width: 100vw;
        margin-left: 0;
        border-radius: 0;
        padding: 0.5rem;
    }
`;

const Info = styled.div `
    width: 100%;
    display: flex;
`;

export const Photo = styled.div `
    display: flex;
    justify-content: center;
    align-items: flex-start;
   
    img {
        width: 3rem;
        border-radius: 50%;
        flex-shrink: 0;
    }

    @media(max-width: 800px) {
        width: 5rem;

        img {
            margin-left: 0;  
            margin-top: 0.5rem;  
        }
    }
`;

const Publish = styled.div `
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const Button = styled.button `
    background: #1877F2;
    width: 7rem;
    height: 2rem;
    border-radius: 0.3rem;
    border: 0;
    margin-right: 1.3rem;
    cursor: pointer;
   
    &:focus {
        outline: 0;
    }
`;

const ContainerPost = styled.div `
    width: 80%;
    height: 10rem;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;

    input {
        background: #EFEFEF;
        border-radius: 0.3rem;
        border: 0;
        margin: 1rem 0;
        line-height: 2rem;
        padding-left: 1rem;

            &:focus {
            outline:0;
        }
    }
    textarea {
        background: #EFEFEF;
        border-radius: 0.3rem;
        border: 0;
        padding-left: 1rem;

        &:focus {
            outline:0;
        }
    }

    @media(max-width: 800px) {
        width: 100%; 
        margin-left: 0;  

        input {
            width: 80vw;
        }    
        textarea  {
            width: 80vw;
        }    
    }
`;