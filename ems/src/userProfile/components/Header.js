import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

import { Modal } from "./Modal";
import { logout } from "../../Logout";

import Account from "./icons/account.png"
import Star from "./icons/star.png"
import Logout from "./icons/logout.png"
import EventDefault from "./icons/event.png"

import EditableTextField from "./EditableText";
import { SweetAlert } from "../../components/SweetAlert";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const HeaderContainer = styled.div`
    display: flex;
    background: #394264;
    height: 10vh;
    width: 73.6vw;
    border-radius: 10px;
    justify-content: space-between;
`;

const HeaderLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 2em;
`;

const HeaderLeftItem = styled.div`
    display: flex;
    width: 10vw;
    height: 7vh;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: background .3s;
    margin-left: 20px;
    color: #efefef;

    &:hover {
        background: #50597b;
        border-bottom: 4px solid #C651CD;
        text-decoration: none;
    }
`;


const HeaderRight = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 2em;
`;

const HeaderRightItem = styled.div`
    display: flex;
    width: 8vw;
    height: 7vh;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: background .3s;
    margin-left: 20px;
    color: #efefef;
    border-top-right-radius: 10px;

    &:hover {
        background: #50597b;
        border-bottom: 4px solid #C651CD;
        text-decoration: none;
    }
`;

const TopContainer = styled.div`
    color: #efefef;
    overflow-y: scroll;
    &::-webkit-scrollbar{display: none};
`

const Title = styled.div`
    font-size: 2em;
    font-weight: bold;
    margin-top: 10px;
`;

const Box = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 10px;
    width: 265px;
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    input {
        display: none;
    }
`;

const EditContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const DeleteButton = styled.button`
    background: #ff0000;
    border: none;
    border-radius: 5px;
    color: #efefef;
    font-size: 15px;
    font-weight: bold;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background .3s;

    &:hover {
        background: #ff3333;
    }
`;

const Button = styled.button`
    background: transparent;
    border: 1px solid green;
    border-radius: 5px;
    color: #efefef;
    font-size: 15px;
    font-weight: bold;
    padding: 10px;
    width: 8vw;
    height: 8vh;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background .3s;
    
    &:hover {
        background: green;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const TopModalContainer = styled.div`
    position: relative;
    color: #efefef;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 20px;
    
    &::-webkit-scrollbar{display: none};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: #394264;
`;

const CardImage = styled.div`
  img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-left: 10px;
    margin-top: 12.5px;
  }
`;

const CardContent = styled.div`
  padding: 15px;
`;

const EventName = styled.h3`
  margin: 0;
  font-size: 24px;
  
  &:hover {
    cursor: pointer;
  }
`;

const EventDetails = styled.p`
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

    span {
        margin-right: 10px;
        margin-left: 10px;
        margin-top:5px;
    }
`;

const Venue = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

const EventDetailsBold = styled.span`
    font-weight: bold;
`;

const ColumnSeperator = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  justify-content: space-between;
`;

const ActionButtons = styled.div`
  button {
    margin-right: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 40px;
    width: 80px;
  }
`;

const DeclineButton = styled.button`
  background-color: #f44336;
  color: #fff;
`;

const Header = ({
    address,
    setAddress,
    name,
    setName,
    email,
    setEmail,
    dob,
    setDob,
    password,
    setPassword,
    desc,
    setDesc
    }) => {

    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isSure, setIsSure] = useState(false);
    const [favouriteEventData, setFavouriteEventData] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const authToken = Cookies.get('authToken');

    const handleOpenAccountModal = () => {
        setIsAccountOpen(true);
    };

    const handleOpenFavouritesModal = async () => {
        try{
            const response = await axios.get(`${API_URL}/event/user/bookmarks`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                    },
            });
    
            if (response.status === 200) {
                const events = response.data.bookmarks;
                events.forEach((event) => {
                    if (event.eventIcon === "") {
                        event.eventIcon = EventDefault;
                    }
                });
                setFavouriteEventData(events);
                setIsFavouritesOpen(true);
            }
            else if (response.status === 204) {
                setFavouriteEventData([]);
                setIsFavouritesOpen(true);
            }
            else {
                console.log(response)
            }
            } catch (error){
                console.log(error);
                SweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    children: <p>{error.message}</p>
                });
            }
    };

    const handleCloseAccountModal = () => {
        setIsAccountOpen(false);
    };

    const handleCloseFavouritesModal = () => {
        setIsFavouritesOpen(false);
    };

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };

    const handleNameChange = (newName) => {
        setName(newName);
    };
    
    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };
    
    const handleDobChange = (newDob) => {
        setDob(newDob);
    };
    
    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };
    
    const handleDescChange = (newDesc) => {
        setDesc(newDesc);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsSure(false);
        setIsDeleteOpen(false);
    };

    const toggleIsSure = () => {
        handleDeleteAccount();
        setIsSure(!isSure);
    };

    const handleNavigateToEventPage = (eventId) => () => {
        window.location.href = `/event/${eventId}`;
    };

    const handleRemoveBookMark = (eventId) => async () => {
        const authToken = Cookies.get('authToken');

        try {
            const response = await axios.delete(`${API_URL}/event/bookmark/${eventId}`,
            {headers: {Authorization: `Bearer ${authToken}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                toast.success("Event has Been Removed from Your Bookmarks")
            }
        } catch (error) {
            toast.error("An Error Occured while removing Bookmark, Try Later")
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.delete(`${API_URL}/user/delete`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });
            if (response.status === 200)
            {
                Cookies.remove('authToken');
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    }

    return(
        <>
        <HeaderContainer>
            <HeaderLeft>
                <HeaderLeftItem onClick={handleOpenAccountModal}><img style={{"width":"30px", "height":"30px"}} src={Account} alt=""/><a style={{"padding":"10px"}} href={() => false}>Account</a></HeaderLeftItem>
                <HeaderLeftItem onClick={handleOpenFavouritesModal}><img style={{"width":"30px", "height":"30px"}} src={Star} alt=""/><a style={{"padding":"10px"}} href={() => false}>Bookmarks</a></HeaderLeftItem>
            </HeaderLeft>

            <HeaderRight>
                <HeaderRightItem onClick={logout}><img style={{"width":"30px", "height":"30px"}} src={Logout} alt=""/><a style={{"padding":"10px"}} href={() => false}>Logout</a></HeaderRightItem>
            </HeaderRight>
        </HeaderContainer>

{/* Account Details Editing Modal */}
        <Modal isOpen={isAccountOpen} onClose={handleCloseAccountModal} modalHeight={"70vh"} modalWidth={"45vw"}>
            <>
            <EditContainer>
                <a style={{"fontSize":"30px", "fontWeight":"600", "color":"#efefef"}} href={() => false}>Edit Details</a>
            </EditContainer>
            <TopContainer>

                <BoxContainer>
                    <Box>
                        <Title>Name</Title>
                        <EditableTextField value={name} onSave={handleNameChange}/>
                    </Box>

                    <Box style={{"width":"350px"}}>
                        <Title>E-Mail</Title>
                        <EditableTextField value={email} onSave={handleEmailChange}/>
                    </Box>
                </BoxContainer>

                <BoxContainer>
                    <Box style={{"width":"350px"}}>
                        <Title>Address</Title>
                        <EditableTextField value={address} onSave={handleAddressChange}/>
                    </Box>

                    <Box>
                        <Title>Date Of Birth</Title>
                        <EditableTextField value={dob} onSave={handleDobChange}/>
                    </Box>
                </BoxContainer>
                
                <BoxContainer>
                    <Box>
                        <Title>Password</Title>
                        <EditableTextField value={password} onSave={handlePasswordChange}/>
                    </Box>
                    <Box style={{"width":"350px"}}>
                        <Title>Description</Title>
                        <EditableTextField value={desc} onSave={handleDescChange}/>
                    </Box>
                </BoxContainer>
            </TopContainer>
            <DeleteButton onClick={handleOpenDeleteModal}>Delete Account</DeleteButton>
            </>
        </Modal>

{/* Bookmark Modal */}
        <Modal isOpen={isFavouritesOpen} onClose={handleCloseFavouritesModal}>
            <TopModalContainer>
            <a style={{"fontSize":"30px", "fontWeight":"600", "color":"#efefef"}} href={() => false}>Your Bookmarks</a>
                    {favouriteEventData.map((event) => (
                    <CardContainer key={event.eventId}>
                        <CardImage>
                            <img src={event.eventIcon} alt="Evt" />
                        </CardImage>

                        <CardContent>
                            <EventName onClick={handleNavigateToEventPage(event.eventId)}>{event.name}</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Held at <EventDetailsBold>{event.location}</EventDetailsBold></Venue>
                                <span>From <EventDetailsBold>{dayjs(event.startDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventDetailsBold></span>
                                <span>Till <EventDetailsBold>{dayjs(event.endDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventDetailsBold></span>
                                </EventDetails>
                                <ActionButtons>
                                        <DeclineButton onClick={handleRemoveBookMark(event.eventId)}>Remove</DeclineButton>
                                </ActionButtons>
                            </ColumnSeperator>
                        </CardContent>

                    </CardContainer>
                    ))}
                </TopModalContainer>
        </Modal>

{/* Delete Account Modal */}
        <Modal isOpen={isDeleteOpen} onClose={handleCloseDeleteModal} modalWidth={"30vw"} modalHeight={"40vh"}>
            { isSure ? (
            <>
            </>
            ) : (
                <>
                <h1 style={{"color":"#efefef"}}>Are you sure you want to delete your account?</h1>
                <ButtonContainer>
                    <Button onClick={toggleIsSure}>Yes</Button>
                </ButtonContainer>
                </>
                )}
        </Modal>

        </>
    );
};

export { Header };