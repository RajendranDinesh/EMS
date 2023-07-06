import styled from "styled-components";
import React, { useState } from "react";

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
    width: 70vw;
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
    width: 110px;
    height: 61%;
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

    return(
        <>
        <HeaderContainer>
            <HeaderLeft>
                <HeaderLeftItem onClick={handleOpenAccountModal}><img style={{"width":"30px", "height":"30px"}} src={Account} alt=""/><a style={{"padding":"10px"}} href={() => false}>Account</a></HeaderLeftItem>
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
            </>
        </Modal>

        <Modal isOpen={isFavouritesOpen} onClose={handleCloseFavouritesModal}>
            <h1>Favourites</h1>
        </Modal>
        </>
    );
};

export { Header };