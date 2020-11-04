import React, {useState} from 'react'
import styled from 'styled-components'


export default function ModalContent (props) {

    const {closeModal, deletePostFromServer, modalButtonsDisabled} = props;
    
    return (
        <StyledModalContent >
            <p className = "warning">Tem certeza que deseja <br /> excluir essa publicação? </p>
            {
                modalButtonsDisabled ? 
                    <div className = "loading"> Carregando... </div> :
                    <div className = "contaniner-Buttons">
                        <button onClick={closeModal} disabled = {modalButtonsDisabled}>Não, voltar</button>
                        <button onClick={deletePostFromServer} disabled = {modalButtonsDisabled}>Sim, excluir</button>
                    </div>
            }
            
        </StyledModalContent>
    );
}

const StyledModalContent = styled.div`

    width: 497px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 2rem;
    border-radius: 3rem;

    .loading {
        color: #fff;
        font-size: 1.3rem;
    }

    .warning {
        color: #fff;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        font-weight: bold;
        font-size: 34px;
        line-height: 2rem;
    }
    .contaniner-Buttons {
        display: flex;
        font-family: Lato;

        button {
            width: 6.5rem;
            height: 2rem;
            border-radius: 0.3rem;
            border: 0;
            font-size: 1rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & :first-child {
            color: #1877F2;
            background: #fff;
            margin-right: 1rem;
            
        }
        & :last-child {
            color: #FFF;
            background: #1877F2;
            margin-left: 1rem;
        }
}
`