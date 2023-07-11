import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "./components/header";
import LeftContainer from "./components/leftContainer";
import RightContainer from "./components/rightContainer";

const Body = styled.div`
    background-color: #efefef;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    background-image: url("https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg");
    height: 75vh;
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const EventPage = () => {

    const { id } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/event/${id}`)
        .then((response) => {
            setEName(response.data.name);
            setEStartDate(response.data.startDate);
            setEEndDate(response.data.endDate);
            setERegStart(response.data.regStartDate);
            setERegEnd(response.data.regEndDate);
            setELocation(response.data.location);
            setEParticipantsMax(response.data.maxParticipants);
            setEParticipants(response.data.participants);
            setEPrice(response.data.price);
            setOrganisation(response.data.organisation);
            setDescription(response.data.description);
        }).catch((error) => {
            console.log(error);
        });
    }, [API_URL, id]);

    const [eName, setEName] = useState('');
    const [eStartDate, setEStartDate] = useState('');
    const [eEndDate, setEEndDate] = useState('');
    const [eRegStart, setERegStart] = useState('');
    const [eRegEnd, setERegEnd] = useState('');
    const [eLocation, setELocation] = useState('');
    const [eParticipantsMax, setEParticipantsMax] = useState('');
    const [eParticipants, setEParticipants] = useState('');
    const [ePrice, setEPrice] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Body>
            <Header 
            eName={eName}
            organisation={organisation} 
            eStartDate={eStartDate}
            eEndDate={eEndDate}
            eRegStart={eRegStart}
            eRegEnd={eRegEnd}
            eLocation={eLocation}
            eParticipants={eParticipants}
            eParticipantsMax={eParticipantsMax}
            ePrice={ePrice}
            description={description}
            setDescription={setDescription}
            setEStartDate={setEStartDate}
            setEEndDate={setEEndDate}
            setELocation={setELocation}
            setEParticipants={setEParticipants}
            setEPrice={setEPrice}
            setEParticipantsMax={setEParticipantsMax}
            setERegEnd={setERegEnd}
            setERegStart={setERegStart}
            setEName={setEName}
            setOrganisation={setOrganisation}
            />
            <Container>
                <LeftContainer eStartDate={eStartDate} eEndDate={eEndDate} eLocation={eLocation} eParticipants={eParticipants} ePrice={ePrice} eParticipantsMax={eParticipantsMax}/>
                <RightContainer description={description}></RightContainer>
            </Container>
        </Body>
    );
};

export default EventPage;