import React from "react";
import styled from "styled-components";
import Calendar from "./icons/calendar.png"
import Location from "./icons/location.png"

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const Body = styled.div`
    height: 75vh;
    width: 70vw;
    display: flex;
    align-items: center;
`;

const Essentials = styled.div`
    height: 10vh;
    width: 100%;
    background-color: #efefef;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 15px;
    align-items: center;
`;

const ItemContainer = styled.div`
    height: 9vh;
    width: 15vw;
    background-color: #efefef;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    align-items: center;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TextTitle = styled.a`
    font-size: 1.38em;
    font-family: 'Montserrat', sans-serif;
    color: black;
    text-decoration: none;
    margin-left: 10px;
`;

const TextItem = styled.a`
    font-size: 1em;
    font-family: 'Montserrat', sans-serif;
    color: black;
    text-decoration: none;
    margin-left: 10px;
`;

const Container = styled.div`
    height: 60vh;
    width: 64vw;
    border-radius: 10px;
    border: 2px solid gray;
    background-color: #efefef;
    display: block;
    padding: 2.5vw;

    overflow-y: scroll;

    &::-webkit-scrollbar{width: 10px};
    &::-webkit-scrollbar-track{background: #f1f1f1};
    &::-webkit-scrollbar-thumb{background: #888};
    &::-webkit-scrollbar-thumb:hover{background: #555};
`;

const RightContainer = ({ eStartDate, eEndDate, eLocation, description}) => {

    return (
            <Body>
                <Container>
                    <Essentials>
                        <ItemContainer>
                            <img src={Calendar} width={"30px"} height={"30px"} alt=""></img>
                            <TextContainer>
                                <TextTitle href={() => false}>Start Date</TextTitle>
                                <TextItem href={() => false}>{dayjs(eStartDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</TextItem>
                            </TextContainer>
                        </ItemContainer>

                        <ItemContainer>
                            <img src={Calendar} width={"30px"} height={"30px"} alt=""></img>
                            <TextContainer>
                                <TextTitle href={() => false}>End Date</TextTitle>
                                <TextItem href={() => false}>{dayjs(eEndDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</TextItem>
                            </TextContainer>
                        </ItemContainer>

                        <ItemContainer>
                            <img src={Location} width={"30px"} height={"30px"} alt=""></img>
                            <TextContainer>
                                <TextTitle href={() => false}>Location</TextTitle>
                                <TextItem href={() => false}>{eLocation}</TextItem>
                            </TextContainer>
                        </ItemContainer>


                    </Essentials>
                    <h1>Event Details</h1>
                    <div style={{"color":"#000"}} dangerouslySetInnerHTML={{ __html: description }} />
                </Container>
            </Body>
    );
};

export default RightContainer;