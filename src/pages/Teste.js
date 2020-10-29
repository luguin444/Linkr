import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import ReactHashtag from "react-hashtag";
import { SiProbot} from "react-icons/si";
import ReactTooltip from 'react-tooltip';

import Header from '../components/Header';
import Trending from '../components/Trending';
import Post from '../components/Post';
import {Title, Main, ContainerPage, Posts} from './TimelinePage'

import UserContext from '../contexts/UserContext';

export default function Teste () {

    
    return (

        <>
            <Main>
                <a data-tip="Hello Wordl" data-for="likes"> Testando </a>

                <ReactTooltip id = "likes"  />  
                {/* event = "onMouseOver" */}
            </Main>
        </>
    );
}
