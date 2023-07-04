import React, {useState} from 'react';
import styled from 'styled-components';

import { Modal } from './Modal';

import Plane from './icons/plane.png';
import Calendar from './icons/calendar.png'

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    height: 180px;
    width: 300px;
    border-radius: 10px;
`;

const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #11a8ab;
    border-radius: 10px 10px 0 0;
    color: #efefef;
    width: 300px;
    height: 60px;
`;

const ListItem = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    transition: all 0.2s ease-in-out;
    color: #efefef;
    padding-left: 20px;

    &:hover {
        background-color: #50597b;
        border-bottom: 4px solid #11a8ab;
    }
`;

const TopModalContainer = styled.div`
    position: relative;
    color: #efefef;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 20px;
    
    &::-webkit-scrollbar{display: none};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: #394264;
`;

const CardImage = styled.div`
  img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-left: 10px;
    margin-top: 12.5px;
  }
`;

const CardContent = styled.div`
  padding: 15px;
`;

const EventName = styled.h3`
  margin: 0;
  font-size: 24px;
`;

const EventDetails = styled.p`
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

const Venue = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

const ColumnSeperator = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  justify-content: space-between;
`;

const ActionButtons = styled.div`
  button {
    margin-right: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 40px;
    width: 80px;
  }
`;

const AcceptButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  transition: 0.3s
`;

const DeclineButton = styled.button`
  background-color: #f44336;
  color: #fff;
`;

const LeftContainer = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleOpenEventModal = () => {
        setIsEventOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleCloseEventModal = () => {
        setIsEventOpen(false);
    };

    return (
        <>
        <TopContainer>
            <HeaderText>
                <a href={() => false} style={{"fontSize":"20px"}}>MENU BOX</a>
            </HeaderText>
            
            <ListItem onClick={handleOpenModal}>
                <img src={Plane} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Invites</a>
            </ListItem>

            <ListItem onClick={handleOpenEventModal}>
            <img src={Calendar} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Events</a>
            </ListItem>
        </TopContainer>


            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <TopModalContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Invites</a>

                    <CardContainer>
                        <CardImage>
                            <img src="https://picsum.photos/200/300" alt="Event Imag" />
                        </CardImage>

                        <CardContent>
                            <EventName>Event Name</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Event Venue</Venue>
                                <span>Event Date and Time</span>
                                </EventDetails>
                                <ActionButtons>
                                    <AcceptButton>Accept</AcceptButton>
                                    <DeclineButton>Decline</DeclineButton>
                                </ActionButtons>
                            </ColumnSeperator>
                        </CardContent>

                    </CardContainer>

                    <CardContainer>
                        <CardImage>
                            <img src="https://picsum.photos/200/300" alt="Event Imge" />
                        </CardImage>

                        <CardContent>
                            <EventName>Event Name</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Event Venue</Venue>
                                <span>Event Date and Time</span>
                                </EventDetails>
                                <ActionButtons>
                                    <AcceptButton>Accept</AcceptButton>
                                    <DeclineButton>Decline</DeclineButton>
                                </ActionButtons>
                            </ColumnSeperator>
                        </CardContent>

                    </CardContainer>

                    <CardContainer>
                        <CardImage>
                            <img src="https://picsum.photos/200/300" alt="Evet" />
                        </CardImage>

                        <CardContent>
                            <EventName>Event Name</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Event Venue</Venue>
                                <span>Event Date and Time</span>
                                </EventDetails>
                                <ActionButtons>
                                    <AcceptButton>Accept</AcceptButton>
                                    <DeclineButton>Decline</DeclineButton>
                                </ActionButtons>
                            </ColumnSeperator>
                        </CardContent>

                    </CardContainer>

                    <CardContainer>
                        <CardImage>
                            <img src="https://picsum.photos/200/300" alt="Eent" />
                        </CardImage>

                        <CardContent>
                            <EventName>Event Name</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Event Venue</Venue>
                                <span>Event Date and Time</span>
                                </EventDetails>
                                <ActionButtons>
                                    <AcceptButton>Accept</AcceptButton>
                                    <DeclineButton>Decline</DeclineButton>
                                </ActionButtons>
                            </ColumnSeperator>
                        </CardContent>

                    </CardContainer>
                </TopModalContainer>
            </Modal>

            <Modal isOpen={isEventOpen} onClose={handleCloseEventModal}>
                <TopModalContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Events Attended</a>

                    <CardContainer>
                        <CardImage>
                            <img src="https://picsum.photos/200/300" alt="Evt" />
                        </CardImage>

                        <CardContent>
                            <EventName>Event Name</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Event Venue</Venue>
                                <span>Event Date and Time</span>
                                </EventDetails>
                            </ColumnSeperator>
                        </CardContent>

                    </CardContainer>
                </TopModalContainer>
            </Modal>
        </>
    );
};

export {LeftContainer};