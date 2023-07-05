import React from "react";
import styled from "styled-components";

const Body = styled.div`
    background-color: #1f253d;
    height: 25vh;
    max-width: 100vw;
    display: flex;
    padding: 0 2.5vw;
    align-items: center;
`;

const Left = styled.div`
    background-color: #1f253d;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5vw;
`;

const HeaderText = styled.a`
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
    text-decoration: none;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: #f1f1f1;
    }
`;

const LocationText = styled.a`
    color: #efefef;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    margin: 0;
    padding-left: 10vw;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    letter-spacing: 0.1rem;

    &:hover {
        color: #f1f1f1;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ActionButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: auto;
    height: 100%;
`;

const ActionButton = styled.button`
    background-color: #fff;
    color: #1f253d;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    height: 60px;
    width: 120px;

    &:hover {
        background-color: #11a8ab;
        color: #fff;
    }
`;

const ActionButtonText = styled.a`
    color: inherit;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: all 0.1s ease-in-out;
`;

const Header = () => {
    return (
        <Body>
            <Left>
                <img src="https://pbs.twimg.com/profile_images/903154868478590976/mmrzduot_400x400.jpg" alt="logo" height="150px" width="150px" style={{"borderRadius":"100%"}}/>
            </Left>
            
            <TextContainer>
                <HeaderText href={() => false}>BIT Prayukti</HeaderText>
                <LocationText href={() => false}>By Bannari Amman Institute Of Technology</LocationText>
            </TextContainer>

            <ActionButtons>
                <ActionButton><ActionButtonText>Edit</ActionButtonText></ActionButton>
                <ActionButton><ActionButtonText>Share</ActionButtonText></ActionButton>
            </ActionButtons>
        </Body>
    );
}

export default Header;