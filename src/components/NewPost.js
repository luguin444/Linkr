import React from 'react'
import styled from 'styled-components'

export default function NewPost () {
    
    return (
        <BoxNewPost>
        <Info>
            <Photo> 
                <img src="https://d26lpennugtm8s.cloudfront.net/stores/861/835/products/dobbt11-d0b3f13551c024bb4415358341779424-640-0.jpg" />
            </Photo>
            <ContainerPost>
                <h3> O que você tem pra favoritar hoje? </h3>
                <input placeholder="http://..." ></input>
                <textarea placeholder="Muito irado esse link falando de #javascript"  rows="4" cols="33"> </textarea>
            </ContainerPost>           

        </Info>
        <Publish>
            <Button> Publish </Button>
        </Publish>
    </BoxNewPost>
        
    );
}

const BoxNewPost = styled.div `
    width: 38.2rem;
    background: white;
    padding: 1rem;
    border-radius: 1rem;
    
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
        margin-left: 1rem;

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

            &:focus {
            outline:0;
        }

    }
`;