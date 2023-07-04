import styled from "styled-components";
import React, { useState } from "react";

import { Modal } from "./Modal";

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #efefef;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
`;

const Header = () => {

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

    const [address, setAddress] = useState('Update Your Address Here');
    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };

    return(
        <>
        <HeaderContainer>
            <HeaderLeft>
                <HeaderLeftItem onClick={handleOpenAccountModal}><img style={{"width":"30px", "height":"30px"}} src={Account}/><a style={{"padding":"10px"}}>Account</a></HeaderLeftItem>
                <HeaderLeftItem onClick={handleOpenFavouritesModal}><img style={{"width":"30px", "height":"30px"}} src={Star}/><a style={{"padding":"10px"}}>Favourites</a></HeaderLeftItem>
            </HeaderLeft>

            <HeaderRight>
                <HeaderRightItem><img style={{"width":"30px", "height":"30px"}} src={Logout}/><a style={{"padding":"10px"}}>Logout</a></HeaderRightItem>
            </HeaderRight>
        </HeaderContainer>

        <Modal isOpen={isAccountOpen} onClose={handleCloseAccountModal}>
            <TopContainer>
                <a>Edit Details</a>

                <Title>Address</Title>
                <EditableTextField value={address} onSave={handleAddressChange}/>
            </TopContainer>
        </Modal>

        <Modal isOpen={isFavouritesOpen} onClose={handleCloseFavouritesModal}>
            <h1>Favourites</h1>
        </Modal>
        </>
    );
};

export { Header };