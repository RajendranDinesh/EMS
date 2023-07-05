import React from "react";
import styled from "styled-components";

import Calendar from "./icons/calendar.png"
import Location from "./icons/location.png"
import User from "./icons/user.png"
import Rupee from "./icons/rupee.png"

const Body = styled.div`
    height: 75vh;
    max-width: 30vw;
    display: flex;
    align-items: center;
`;

const Container = styled.div`
    height: 65vh;
    width: 25vw;
    margin: 0 auto;
    border-radius: 10px;
    border: 2px solid gray;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ItemContainer = styled.div`
    height: 10vh;
    width: 15vw;
    margin: 0 auto;
    background-color: #efefef;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    align-items: center;
`;

const TextItem = styled.a`
    font-size: 1.5em;
    font weight: bold;
    font-family: 'Montserrat', sans-serif;
    color: black;
    text-decoration: none;
    margin-left: 10px;
`;

const Button = styled.button`
    background-color: #fff;
    color: #1f253d;
    border: 2px solid #1f253d;
    border-radius: 5px;
    padding: 20px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    height: 60px;
    width: 140px;

    &:hover {
        background-color: #1f253d;
        color: #fff;
        border: 2px solid #efefef;
    }
`;

const ButtonText = styled.a`
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

const LeftContainer = () => {
    return (
        <Body>
            <Container>

                <ItemContainer>
                    <img src={Calendar} width={"50px"} height={"50px"} alt=""></img>
                    <TextItem href={() => false}>28/04/2024</TextItem>
                </ItemContainer>

                <ItemContainer>
                    <img src={Location} width={"50px"} height={"50px"} alt=""></img>
                    <TextItem href={() => false}>Erode</TextItem>
                </ItemContainer>

                <ItemContainer>
                    <img src={User} width={"50px"} height={"50px"} alt=""></img>
                    <TextItem href={() => false}>500</TextItem>
                </ItemContainer>

                <ItemContainer>
                    <img src={Rupee} width={"50px"} height={"50px"} alt=""></img>
                    <TextItem href={() => false}>1200</TextItem>
                </ItemContainer>

                <Button>
                    <ButtonText href={() => false}>Register</ButtonText>
                </Button>
            </Container>
        </Body>
    );
}

export default LeftContainer;