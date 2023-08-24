import React from 'react';
import styled from 'styled-components';

import { LogoContainer } from "./LogoContainer";

const TicketDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 48vh;
    width: 48vw;
    background-color: rgba(239, 239, 239, 0.6);
    border: 1px solid black;
    border-radius: 5px;
`;

const EventName = styled.div`
    display: flex;
    align-items: center;
    height: 10vh;
    width: 90%;
    color: black;
    font-size: 2em;
    font-weight: bold;
    padding-left: 1em;
`;

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    height: 7vh;
    width: 100%;
`;

const Date = styled.div`
    color: black;
    font-size: 1.25em;
    font-weight: 400;
    margin: 0 1em;
`;

const Venue = styled.div`
    display: flex;
    align-items: center;
    height: 7vh;
    width: 100%;
`;

const VenueName = styled.div`
    color: black;
    font-size: 1.25em;
    font-weight: 400;
    margin: 0 1em;
`;

const Terms = styled.div`
    display: flex;
    align-items: flex-end;
    height: 7vh;
    width: 100%;
    font-size: 0.9em;
    margin: 0 1em;
`;

const DetailsContainer = (
    {eventName, startDate, endDate, eLocation, logoURL}
) => {
    return (
        <TicketDetails>
            <LogoContainer logoURL={logoURL} />

            <EventName>{eventName}</EventName>
            <DateContainer>
                <Date>{startDate}</Date>
                |
                <Date>{endDate}</Date>
            </DateContainer>
            <Venue>
                <VenueName>Venue: {eLocation}</VenueName>
            </Venue>
            <Terms>
                Terms and Conditions Apply
            </Terms>
        </TicketDetails>
    );
}

export { DetailsContainer };