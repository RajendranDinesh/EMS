import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";

import { Modal } from "./Modal";
import { logout } from "../../Logout";

import Account from "./icons/account.png"
import Star from "./icons/star.png"
import Logout from "./icons/logout.png"

import EditableTextField from "./EditableText";

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
`;

const HeaderLeftItem = styled.div`
    display: flex;
    width: 110px;
    height: 61%;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: background .3s;
    margin-left: 20px;
    color: #efefef;

    &:hover {
        background: #50597b;
        border-bottom: 4px solid #11a8ab;
        text-decoration: none;
    }
`;


const HeaderRight = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
        border-bottom: 4px solid #11a8ab;
        text-decoration: none;
    }
`;

const TopContainer = styled.div`
    color: #efefef;
    overflow-y: scroll;
    &::-webkit-scrollbar{display: none};
`

const Title = styled.div`
    font-size: 20px;
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

    const handleOpenAccountModal = () => {
        setIsAccountOpen(true);
    };

    const handleOpenFavouritesModal = () => {
        setIsFavouritesOpen(true);
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
        setIsSure(!isSure);
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete('http://localhost:5000/user/delete',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200)
            {
                localStorage.removeItem('token');
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
                <HeaderLeftItem onClick={handleOpenFavouritesModal}><img style={{"width":"30px", "height":"30px"}} src={Star} alt=""/><a style={{"padding":"10px"}} href={() => false}>Favourites</a></HeaderLeftItem>
            </HeaderLeft>

            <HeaderRight>
                <HeaderRightItem onClick={logout}><img style={{"width":"30px", "height":"30px"}} src={Logout} alt=""/><a style={{"padding":"10px"}} href={() => false}>Logout</a></HeaderRightItem>
            </HeaderRight>
        </HeaderContainer>

        <Modal isOpen={isAccountOpen} onClose={handleCloseAccountModal} modalHeight={"600px"} modalWidth={"700px"}>
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

        <Modal isOpen={isFavouritesOpen} onClose={handleCloseFavouritesModal}>
            <h1>Favourites</h1>
        </Modal>

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