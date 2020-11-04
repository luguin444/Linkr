import React from 'react'
import styled from 'styled-components'



export default function SearchResponse (props) {
    const {user} = props;

    return (
        <ContainerSearchResponse>
            {user.id}

        </ContainerSearchResponse>

    )

}

const ContainerSearchResponse = styled.div `
    width: 35rem;
    height: 11rem;
    background: #E7E7E7;
    position: absolute;
    top: 3.3rem;
    left: 21rem; 
    border-radius: 8px;
    

`;