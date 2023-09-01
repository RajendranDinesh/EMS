import React, { useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { logout } from '../../Logout';
import { Modal } from './Modal';

import AddUser from './icons/add_user.png';
import Users from './icons/users.png';
import Logout from './icons/logout.png'

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    height: 50vh;
    width: 23vw;
    border-radius: 10px;

    @media(max-width:1080px){
        margin-left:-1.8em;
        width:25em;
        height:15em;
    }
`;

const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #11a8ab;
    border-radius: 10px 10px 0 0;
    color: #efefef;
    width: 23vw;
    min-height: 10vh;
`;

const ListItem = styled.div`
    display: flex;
    align-items: center;
    padding: .7em;
    height: 10em;
    transition: all 0.2s ease-in-out;
    color: #efefef;
    padding-left: 20px;

    &:hover {
        background-color: #50597b;
        border-bottom: 4px solid #11a8ab;
        cursor: pointer;
    }

    &:last-child {
        border-radius: 0 0 10px 10px;
    }
`;

const ModalTopContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const ModalHeaderText = styled.a`
    font-size: 25px;
`;

const ModalHeaderTextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    color: #efefef;
    width: 100%;
    min-height: 10vh;
`;

const LeftContainer = () => { 

    const API_URL = process.env.REACT_APP_API_URL;
    const authToken = Cookies.get('adminToken');

    const [isViewOrgOpen, setIsViewOrgOpen] = useState(false);
    const [isViewUserOpen, setIsViewUserOpen] = useState(false);
    const [isViewOrgReqOpen, setIsViewOrgReqOpen] = useState(false);

    const handleOpenViewOrg = () => {
        setIsViewOrgOpen(true);
    }

    const handleCloseViewOrg = () => {
        setIsViewOrgOpen(false);
    }

    const handleOpenViewUser = () => {
        setIsViewUserOpen(true);
    }

    const handleCloseViewUser = () => {
        setIsViewUserOpen(false);
    }

    const handleOpenViewOrgReq = () => {
        setIsViewOrgReqOpen(true);
    }

    const handleCloseViewOrgReq = () => {
        setIsViewOrgReqOpen(false);
    }

    return (
        <>
        <TopContainer>
            <HeaderText>
                <a href={() => false} style={{"fontSize":"20px"}}>MENU BOX</a>
            </HeaderText>

            <ListItem onClick={handleOpenViewOrgReq}>
                <img src={AddUser} style={{"width":"35px", "height":"35px", "marginRight":"10px"}} alt='org. request'></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Organisation Request</a>
            </ListItem>

            <ListItem onClick={handleOpenViewOrg}>
                <img src={Users} style={{"width":"35px", "height":"35px", "marginRight":"10px"}} alt='org.'></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Organisations</a>
            </ListItem>

            <ListItem onClick={handleOpenViewUser}>
                <img src={Users} style={{"width":"35px", "height":"35px", "marginRight":"10px"}} alt='user'></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Users</a>
            </ListItem>

            <ListItem onClick={logout}>
                <img src={Logout} style={{"width":"35px", "height":"35px", "marginRight":"10px"}} alt='logout'/>
                <a style={{"fontSize":"20px"}} href={() => false}>Logout</a>
            </ListItem>
            
        </TopContainer>

        <Modal isOpen={isViewOrgOpen} onClose={handleCloseViewOrg}>
            <ModalTopContainer>
                <ModalHeaderTextContainer>
                    <ModalHeaderText>Organisations</ModalHeaderText>
                </ModalHeaderTextContainer>
            </ModalTopContainer>
        </Modal>

        <Modal isOpen={isViewUserOpen} onClose={handleCloseViewUser}>
            <ModalTopContainer>
                <ModalHeaderTextContainer>
                    <ModalHeaderText>Users</ModalHeaderText>
                </ModalHeaderTextContainer>
            </ModalTopContainer>
        </Modal>

        <Modal isOpen={isViewOrgReqOpen} onClose={handleCloseViewOrgReq}>
            <ModalTopContainer>
                <ModalHeaderTextContainer>
                    <ModalHeaderText>Organisation Requests</ModalHeaderText>
                </ModalHeaderTextContainer>
            </ModalTopContainer>
        </Modal>      
        </>
    );
};

export {LeftContainer};