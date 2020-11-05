import React, { useState, useContext, useRef, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ReactHashtag from "react-hashtag";
import {Link,useHistory} from "react-router-dom";
import { HiOutlineHeart, HiOutlinePencil} from "react-icons/hi"; 
import { IoMdHeart} from "react-icons/io"; 
import { FiTrash} from "react-icons/fi"; 
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';

import { Photo } from './NewPost';

import UserContext from '../contexts/UserContext';
import { AiOutlineRadiusBottomleft } from 'react-icons/ai';
import ModalContent from './ModalContent';

export default function Post (props) {

    Modal.setAppElement('#root');

    var customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          background            : '#333333',
          borderRadius          : '2rem',
        }    
      };

    const {post, setPostDeleted, setPostEdited, from} = props;

    const history = useHistory();

    const textEditRef = useRef();

    const {userDataObject} = useContext(UserContext);

    const [liked, setLiked] = useState(isLikedPost(userDataObject));
    const [likesFromPost, setLikesFromPost] = useState(post.likes);
    const [haveILikedOrDisliked, setHaveILikedOrDisliked] = useState(false);
    const [modalIsOpen,setIsOpen] = useState(false);
    const [modalButtonsDisabled, setModalButtonsDisabled] = useState(false);
    const [OnEditingPost, setOnEditingPost] = useState(false);
    const [postMainDescription, setPostMainDescription] = useState(post.text);
    const [onSendingPostEdition, setOnSendingPostEdition] = useState(false);

    useEffect( () => {
       if (textEditRef.current)
         textEditRef.current.focus();
    }, [OnEditingPost]);
    

    function sendEditedPostToServer() {
        setOnSendingPostEdition(true);

        const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}`, {'text': postMainDescription}, {headers: userDataObject.headerToken});

        request.then( ({data}) => {
            setOnSendingPostEdition(false);  //input desabilitado
            setOnEditingPost(false);  //edição finalizada
            setPostEdited(true);   //refresh Timeline
        })
        request.catch( () => {
            setOnSendingPostEdition(false);
            setOnEditingPost(false);
            alert("A alteração não foi possível de ser concluída!");
            setPostMainDescription(post.text);
        })
    }

    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal(){
        setIsOpen(false);
    }

    function deletePostFromServer(){

        setModalButtonsDisabled(true);
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}`, {headers: userDataObject.headerToken, params: {}});

        request.then(({data}) => {
            closeModal();
            setIsOpen(false);
            setModalButtonsDisabled(false);
            setPostDeleted(true);
        })
        request.catch( ()=> {
            alert("Não foi possível excluir esse post");
            closeModal();
            setIsOpen(false);
            setModalButtonsDisabled(false);
        })
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    function isLikedPost(userDataObject) {
        return post.likes.find(item => {
            if(item.createdAt)
                return item.userId === userDataObject.user.id; //caso venha da timeline
            else
                return item.id === userDataObject.user.id;  //caso venha dos my-post e my-likes
        });
    }

    function likePost() {      
        setLiked(true);
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/like`, {}, { headers: userDataObject.headerToken });

        request.then(({data}) => {
            setHaveILikedOrDisliked(true);
            setLikesFromPost(data.post.likes);
            console.log(likesFromPost);
        });
    }

    function dislikePost() {      
        setLiked(false);
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/dislike`, {}, { headers: userDataObject.headerToken });

        request.then(({data}) => {
            setHaveILikedOrDisliked(true);
            setLikesFromPost(data.post.likes);
            console.log(likesFromPost);
        });
    }

    function userWhoLiked () {
      
        let userNamesLiked = [];
        let stringTooltip = ``;

        userNamesLiked = haveILikedOrDisliked ? likesFromPost.map(item => item.username) : post.likes.map(item => item['user.username']);
        
        // if (from === "myLikes") {
        //     userNamesLiked = post.likes.map(item => item.username);
        //     if (!haveILikedOrDisliked)
        //          setLiked(true);
        //     console.log("Veio do Mylikes");
        // }

        userNamesLiked = userNamesLiked.filter( item => item !== userDataObject.user.username);

        if (liked) {       
            
            if (userNamesLiked.length === 0) {
                stringTooltip = `Você deu like`
            } else if (userNamesLiked.length === 1) {
                stringTooltip = `Você e ${userNamesLiked[0]} curtiram`
            } else {
                stringTooltip = `Você, ${userNamesLiked[0]} e outra ${userNamesLiked.length -1} pessoa`
            }
        } else {
            if (userNamesLiked.length === 0) {
                stringTooltip = `0 likes`
            } else if (userNamesLiked.length === 1) {
                stringTooltip = `${userNamesLiked[0]} curtiu `
            } else if (userNamesLiked.length === 2) {
                stringTooltip = `${userNamesLiked[0]}, ${userNamesLiked[1]} curtiram`
            } else {
                stringTooltip = `${userNamesLiked[0]}, ${userNamesLiked[1]} e outras ${userNamesLiked.length -2} pessoas`
            }               
        }
        return stringTooltip;
    }

    return (
        <BoxPost>
            <LateralContainer>
                <Photo> 
                        <img src={post.user.avatar} onClick = { () => history.push(`/user/${post.user.id}`) }/>
                 </Photo>
                 {liked ? 
                    <IoMdHeart className  = "icon red" onClick = { () => dislikePost()} /> : 
                    <HiOutlineHeart className  = "icon white" onClick = { () => likePost()} /> 
                }
                <>
                    <span 
                        //onClick = {() => userWhoLiked()}
                        data-tip = {userWhoLiked()}
                        onMouseOver = { () => {ReactTooltip.show()}}  
                    >
                        { `${haveILikedOrDisliked ? likesFromPost.length : post.likes.length} likes` }
                    </span>  
                    <ReactTooltip place = "bottom" type = "light" effect = "float"/>
                </>                      
            </LateralContainer>           
            <PostData>
                <div className = "command-container">
                    <div className="name" onClick = { () => history.push(`/user/${post.user.id}`) }>
                        {post.user.username}
                    </div>
                    { (userDataObject.user.id === post.user.id) ?
                        <div className = "icons">
                            < HiOutlinePencil onClick = { () => {
                                setOnEditingPost(!OnEditingPost)
                                setPostMainDescription(post.text);
                            }}/>
                            <FiTrash onClick = {openModal}/>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                            >
                                <ModalContent 
                                    closeModal = {closeModal} 
                                    deletePostFromServer = {deletePostFromServer} 
                                    modalButtonsDisabled = {modalButtonsDisabled} 
                                />
                            </Modal>
                        </div> :
                        ''
                    }
                </div>
                {OnEditingPost ? 
                    <input 
                        ref = {textEditRef}
                        disabled = {onSendingPostEdition}
                        value = {postMainDescription}
                        onChange ={e => setPostMainDescription(e.target.value)}
                        onKeyDown = { (event) => {
                            if(event.key === "Escape") {
                                setOnEditingPost(false);
                                setPostMainDescription(post.text);
                            }                               
                            else if (event.key === "Enter") 
                                sendEditedPostToServer();
                        }}
                    /> :
                    <div className="description">
                        <ReactHashtag onHashtagClick = {value => history.push(`/hashtag/${value.substr(1)}`)} >
                            {post.text}
                        </ReactHashtag> 
                    </div>  
                }
                         
                <div className="link" onClick={() => openInNewTab( `${ post.link }`)}>
                    <div className = "infoPost">
                        <div> { post.linkTitle}</div>
                    
                        <div className = "description"> 
                                {`${post.linkDescription}`}                                               
                        </div>                    
                        <div> { post.link } </div>
                    </div>
                    <img src = { post.linkImage}/>
                </div>   
            </PostData>
    </BoxPost>      
    );
}


const BoxPost = styled.article `
    height: auto;
    width: 38.2rem;
    background: #171717;
    border-radius: 1rem;
    margin-top: 1.5rem;
    display: flex;
    padding: 1rem;
    font-family: 'Lato', sans-serif;

    @media(max-width: 800px) {
        width: 100vw;
        margin-left: 0;
        border-radius: 0;
        padding: 0.5rem;
    }

`;

const LateralContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
        margin-top: 1rem;
        font-size: 1.6rem;
    }
    .red {
        color: red;
    }
    .white {
        color: #fff;
    }
    span {
        color: #fff;
        margin-top: 0.35rem;
        font-size: 0.8rem;
    }
`

const PostData = styled.div `
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    margin-bottom: 0.4rem;
    word-break: break-word;

    .command-container {
        display:flex;
        justify-content: space-between;

        .name {
            font-size: 1.15rem;
            line-height: 1.4rem;
            color: #FFF;
        }

        .icons {
            color: white;

             & :last-child {
                 margin-left: 0.7rem;
             }            
        }
    }
   

    .description {
        margin-top: 0.5rem;
        font-size: 1.15rem;
        line-height: 1.4rem;
        color: #B7B7B7;
        font-weight: 700;
        word-break: break-word;

        span {    //ReactHashtag gera spans como default para as #
            color: #fff;
            font-weight: bold;
        }
    }

    input {
        height: 2rem;
        border: 0;
        margin-top: 0.4rem;
        border-radius: 0.7rem;
    }

    .link {
        border: 1px solid #4D4D4D;
        border-radius: 0.8rem;
        width: 31rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        .infoPost {
            flex-grow: 1;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            border-top-left-radius: 0.8rem;
            border-bottom-left-radius: 0.8rem;
            word-break: break-word;

            & :first-child  {
                font-size: 1rem;
                line-height: 1.3rem;
                margin-bottom: 0.7rem;
                color: #CECECE;
            }
            .description {
                font-size: 0.7rem;
                line-height: 0.8rem;
                margin-bottom: 0.7rem;
                color: #9b9595;
            }
            & :last-child  {
                font-size: 0.7rem;
                line-height: 0.8rem;
                color: #CECECE;
            }
        }
        img {
            width: 10rem;
            object-fit: cover;
            border-top-right-radius: 0.8rem;
            border-bottom-right-radius: 0.8rem;
        }
    }

    @media(max-width: 800px) {

        .name {
            font-size: 1rem;
            line-height: 1.1rem;
        }
        .description {
            font-size: 1rem;
            line-height: 1.1rem;
        }      
        .link {
            width: 100%;

            img {
                width: 7rem;                
            }
            .infoPost {
                & :first-child  {
                    font-size: 0.8rem;
                    line-height: 0.9rem;
                    margin-bottom: 0.3rem;      
                }
                .description {
                    margin-bottom: 0.3rem;                
                }             
            }
         }
    }
`;