import React from 'react'
import styled from 'styled-components'


import ContainerLogin from '../components/ContainerLogin'

export default function LoginPage () {   
    return (
        <>
            <ContainerAll>
                <ContainerLogo> 
                    <h1>linkr</h1>
                    <p> 
                        save, share and discover <br /> the best links on the web
                    </p>
                </ContainerLogo>
                <ContainerLogin />
            </ContainerAll>
        </>
    );
}

const ContainerAll = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;

     @media(max-width: 800px) {
        flex-direction: column;
    }  
`

const ContainerLogo = styled.div`
    width: 65%;
    height: 100vh;
    background-color: black;
    color: #fff;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    padding: 15rem 0 0 8rem;

    h1 {
        font-family: 'Passion One', cursive; 
        font-size: 8rem;
        letter-spacing: 0.3rem;
    }
    p {
        font-family: 'Oswald', sans-serif;
        font-size: 3rem;
        line-height: 4.2rem
    }

     @media(max-width: 800px) {
        width: 100%;
        height: 15rem;
        padding: 1rem;
        text-align: center;

        h1 {
            font-size: 6rem;
        }
        p {
            font-size: 1.5rem;
            line-height: 2.8rem;
            
        }      
    }    
`