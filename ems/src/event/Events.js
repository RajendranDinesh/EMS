import styled from "styled-components";
import { CalendarBox } from "./calendarBox.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SweetAlert } from "../components/SweetAlert.js";

import EventDefault from './icons/event.png'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const AppContainer = styled.div`
width: 100vw,
height: 100%
`;

const EventsContainer = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
`;

const EventContainer = styled.div`
    display: flex;

    justify-content: space-evenly;
    align-items:center;

    color: #efefef;
    background-color: #8739F9;
    border-radius: 10px;

    height: 32vh;
    width: 40vw;
    margin: 2em;

    &:hover {
        cursor: pointer;
    }
`;

const EventDetailContainer = styled.div`
    display:flex;
    flex-direction: column;

    span {
        font-size: 14.4px;
    }
`;

const EventIcon = styled.img`
    height: 8em;
    width: 8em;
`;

const EventName = styled.a`
    font-size: 24px;
`;

const EventStartDate = styled.a`
    font-size: 24px;
`;

const EventLocation = styled.a`
    font-size: 24px;
`;

const Events = () => {

    const API_URL = process.env.REACT_APP_API_URL;
    
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const searchDate = searchParams.get('searchDate');
    const searchLocation = searchParams.get('searchLocation');
    const searchEventType = searchParams.get('searchEventType');

    const [eventData, setEventData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        document.title = "Search Results | Haxguz";

        const searchParams = { searchDate, searchLocation, searchEventType };
    
        async function getEventData() {
            try {
                const response = await axios.get(`${API_URL}/events/search`, { params: searchParams});
                
                if (response.data.events.length === 0) {
                    await SweetAlert({
                        icon: 'error',
                        title: 'Oops...',
                        children: 'No events found!',
                    });

                    navigate('/');
                }

                const events = response.data.events;

                events.forEach((event) => {
                    if (event.eventIcon === ""){
                        event.eventIcon = EventDefault;
                    }
                });

                setEventData(response.data.events);
            } catch (error) {
                alert(error.response);
                console.log(error);
            }
        }
    
        getEventData();
    });

    const handleNavigateToEvent = (eventId) => {
        navigate(`/event/${eventId}`);
    }

    return (
        <AppContainer>
            <CalendarBox searchDate={searchDate}>
            </CalendarBox>
            <EventsContainer>

                {eventData.map((event) =>
                <EventContainer onClick={() => handleNavigateToEvent(event.eventId)}>
                    <EventIcon alt="Onnum Illa" src={event.eventIcon}/>
                    <EventDetailContainer>
                        <EventName><span>NAME:</span> {event.name}</EventName>
                        <EventName><span>PRICE:</span> {event.price}</EventName>
                        <EventName><span>Type Of Event:</span>{event.eventType}</EventName>
                        <EventStartDate><span>REGISTRATION START DATE:</span>{dayjs(event.regStartDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventStartDate>
                        <EventStartDate><span>START DATE:</span> {dayjs(event.startDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventStartDate>
                        <EventLocation><span>LOCATION:</span>{event.location}</EventLocation>
                    </EventDetailContainer>
                </EventContainer>)
                }

            </EventsContainer>
        </AppContainer>
    );
    }

export default Events;