import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { SweetAlert } from "../components/SweetAlert";
import Header from "./components/header";
import LeftContainer from "./components/leftContainer";
import RightContainer from "./components/rightContainer";
import Cookies from "js-cookie";

import EventDefault from "./components/icons/event.png";
dayjs.extend(utc);
dayjs.extend(timezone);

const Body = styled.div`
    background-color: #394264;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
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

        async function getData() {
            await axios.get(`${API_URL}/event/${id}`,
        { headers: {'Bypass-Tunnel-Reminder': 'eventaz',} })
        .then((response) => {
            document.title = `${response.data.name} | EMS`
            setEName(response.data.name);
            setEStartDate(response.data.startDate);
            setEEndDate(response.data.endDate);
            setERegStart(response.data.regStartDate);
            setERegEnd(response.data.regEndDate);
            setELocation(response.data.location);
            setEParticipantsMax(response.data.maxParticipants);
            setEParticipants(response.data.minparticipants);
            setEPrice(response.data.price);
            setOrganisation(response.data.organisation);
            setDescription(response.data.description);
            setEProfile(response.data.eventIcon);
            setIsTeamEvent(response.data.isTeamEvent);
            setMaxNumberOfTeams(response.data.maxNumberOfTeams);
            setIsAbstractRequired(response.data.isAbstractRequired);

            if (response.data.eventIcon === "") {
                setEProfile(EventDefault);
                return;
            }
        }).catch((error) => {
            console.log(error);
        });

        const authToken = Cookies.get('authToken');

        if(authToken){
            await axios.get(`${API_URL}/event/modcheck/${id}`, { headers: {'Bypass-Tunnel-Reminder': 'eventaz', Authorization: `Bearer ${authToken}` }})
            .then((response) => {
              if(response.status === 200){
                setIsMod(true);
              }
            }).catch(async (error) => {
                if (error.status === 204 || error.status === 404){
                    setIsMod(false);
                }
                else{
                    await SweetAlert({
                        title: "Error",
                        children: error.data,
                        icon: "error"
                });
                }
            })
            await axios.get(`${API_URL}/event/hasRegistered/${id}`, { headers: {'Bypass-Tunnel-Reminder': 'eventaz', Authorization: `Bearer ${authToken}` }})
            .then((response) => {
              if(response.status === 200){
                setIsRegistered(true);
              }
            }).catch(async (error) => {
                if (error.status === 204 || error.status === 404){
                    setIsRegistered(false);
                }
                else{
                    await SweetAlert({
                        title: "Error",
                        children: error.response.data,
                        icon: "error"
                });
                }
            })
            await axios.get(`${API_URL}/event/bookmark/${id}`, { headers : {'Bypass-Tunnel-Reminder': 'eventaz', 
            Authorization: `Bearer ${authToken}`}})
            .then((response) => {
                if(response.status === 200){
                    setIsBookMarked(true);
                }
                else if(response.status === 204){
                    setIsBookMarked(false);
                }
            }).catch(async (error) => {
                console.log(error);
                await SweetAlert({
                    title: "Error",
                    children: error.data,
                    icon: "error"
                });
            })
            await axios.get(`${API_URL}/event/abstract/submitted/${id}`, { headers : {'Bypass-Tunnel-Reminder': 'eventaz', 
            Authorization: `Bearer ${authToken}`}})
            .then((response) => {
                if(response.status === 200){
                    setIsAbstractSubmitted(true);
                }
                else if(response.status === 204){
                    setIsAbstractSubmitted(false);
                }
            })
            .catch(async (error) => {
                console.log(error);
                await SweetAlert({
                    title: "Error",
                    children: error.response.data,
                    icon: "error"
                });
            });
        }}
        getData();
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
    const [eProfile, setEProfile] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [description, setDescription] = useState('');
    const [isMod, setIsMod] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isBookMarked, setIsBookMarked] = useState(false);
    const [isTeamEvent, setIsTeamEvent] = useState(false);
    const [maxNumberOfTeams, setMaxNumberOfTeams] = useState(0);
    const [isAbstractRequired, setIsAbstractRequired] = useState(false);
    const [isAbstractSubmitted, setIsAbstractSubmitted] = useState(false);
    const [isAbstractVerified, setIsAbstractVerified] = useState(false);

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
            eProfile={eProfile}
            isMod={isMod}
            isBookMarked={isBookMarked}
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
            setEProfile={setEProfile}
            setIsBookMarked={setIsBookMarked}
            />
            <Container>
                <LeftContainer eStartDate={eStartDate} eEndDate={eEndDate} eLocation={eLocation} eParticipants={eParticipants} ePrice={ePrice} eParticipantsMax={eParticipantsMax} isMod={isMod} id={id} isRegistered={isRegistered} isTeamEvent={isTeamEvent} maxNumberOfTeams={maxNumberOfTeams} isAbstractRequired={isAbstractRequired} isAbstractSubmitted={isAbstractSubmitted} isAbstractVerified={isAbstractVerified}/>
                <RightContainer description={description}></RightContainer>
            </Container>
        </Body>
    );
};

export default EventPage;