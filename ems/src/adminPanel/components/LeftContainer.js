import React, { useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

import { logout } from '../../Logout';
import { Modal } from './Modal';

import AddUser from './icons/add_user.png';
import Users from './icons/users.png';
import Logout from './icons/logout.png'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { SweetAlert } from '../../components/SweetAlert';
dayjs.extend(utc);
dayjs.extend(timezone);

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
    justify-content: center;

    height: 100%;
    width: 100%;

    transition: all 0.4s ease-in-out;
`;

const ModalHeaderText = styled.a`
    font-size: 25px;
`;

const ModalHeaderTextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-bottom: 2px solid #11a8ab;

    color: #efefef;
    width: 100%;
    min-height: 10vh;
`;

const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    margin: 10px;
    height: 20%;
`;

const SearchBar = styled.input`
    background-color: transparent;
    border: 1px solid #efefef;
    border-radius: 5px;
    color: #efefef;
    font-size: 20px;
    outline: none;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 8vh;
    width: 72%;
    transition: all 0.2s ease-in-out;

    &:focus {
        background-color: #394264;

        &::placeholder {
            opacity: 0.32;
        }
    }

    &::placeholder {
        color: #efefef;
    }
`;

const SearchButton = styled.button`
    background-color: #11a8ab;
    border: 1px solid #efefef;
    border-radius: 5px;
    color: #efefef;
    font-size: 20px;
    outline: none;
    height: 8vh;
    padding: 10px;
    width: 24%;
    transition: all 0.2s ease-in-out;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #394264;
        cursor: pointer;
    }

    &:focus {
        background-color: #394264;
    }
`;

const UserContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    margin: 10px;
    height: 80%;

    border: 2px solid #efefef;
    border-radius: 10px;

    img {
        border: 2px solid #efefef;

        width: 150px;
        height: 150px;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Info = styled.a`
    font-size: 20px;
    margin: 10px;
    
    color: #efefef;
`;

const DeleteButton = styled.button`
    background-color: red;
    border: 1px solid #efefef;
    border-radius: 5px;
    color: #efefef;
    font-size: 20px;
    outline: none;
    height: 8vh;
    padding: 10px;
    width: 40%;
    transition: all 0.2s ease-in-out;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: red;
        opacity: 0.8;
        cursor: pointer;
    }

    &:focus {
        background-color: transparent;
    }
`;

const LeftContainer = () => { 

    const API_URL = process.env.REACT_APP_API_URL;
    const authToken = Cookies.get('adminToken');

    const [isViewOrgOpen, setIsViewOrgOpen] = useState(false);
    const [isViewUserOpen, setIsViewUserOpen] = useState(false);
    const [isViewOrgReqOpen, setIsViewOrgReqOpen] = useState(false);

    const handleOpenViewOrg = () => {
        setEmail("");
        setOrg({});
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

    const [email, setEmail] = useState("");
    const [org, setOrg] = useState({});

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSearch = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            };

            const response = await axios.get(`${API_URL}/admin/organisation/search/${email}`, config);

            let orgDetails = response.data;

            if (orgDetails.location === '')
                {orgDetails.location = 'Not Available';}

            setOrg(orgDetails);

        } catch (error) {
            console.log(error);

            if (error.response.status === 404) {
                await SweetAlert({
                    title: "Error",
                    children: "Organisation not found.",
                    icon: "error"
                });
            }
        }
    };

    const handleRemoveOrganisation = async (orgId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            };

            const response = await axios.delete(`${API_URL}/admin/organisation/delete/${orgId}`, config);

            if (response.status === 200) {
                setIsViewOrgOpen(false);
                setOrg({});
                setEmail("");
                await SweetAlert({
                    title: "Success",
                    children: "Organisation removed successfully.",
                    icon: "success"
                });
                }
        } catch (error) {
            alert(error.response);
        }
    };

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

        <Modal isOpen={isViewOrgOpen} onClose={handleCloseViewOrg} modalHeight={"80vh"} modalWidth={"56vw"}>
            <ModalTopContainer>
                <ModalHeaderTextContainer>
                    <ModalHeaderText>Search for an Organisation</ModalHeaderText>
                </ModalHeaderTextContainer>

                <SearchBarContainer>
                    <SearchBar placeholder='Enter Organisation Email' onChange={handleEmailChange}/>
                    <SearchButton onClick={handleSearch}>Search</SearchButton>
                </SearchBarContainer>

                {org && 
                <UserContainer>
                    <img alt='profile' src={org.profilePicture} />
                    <InfoContainer>
                        <Info>Name: {org.fname}</Info>
                        <Info>Joined Us On: {dayjs(org.createdAt).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</Info>
                        <Info>Location: {org.location}</Info>
                        <Info>Moderators: {org.modsCount}</Info>
                        <Info>Total Events Conducted: {org.eventsCount}</Info>
                        <DeleteButton onClick={() => handleRemoveOrganisation(org.orgId)}>Remove Organisation</DeleteButton>
                    </InfoContainer>
                </UserContainer>
                }
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