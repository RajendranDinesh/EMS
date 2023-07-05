import React, {useState} from 'react';
import styled from 'styled-components';

import { Modal } from './Modal';
import EditableTextField from './EditableText';

import Plane from './icons/plane.png';
import Calendar from './icons/calendar.png';
import AddEvent from './icons/add_event.png';

import Edit from '../../eventPage/components/icons/edit.png';
import Tick from '../../eventPage/components/icons/tick.png';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    height: 240px;
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


const TopCreateContainer = styled.div`
    color: #efefef;
    overflow-y: scroll;
    &::-webkit-scrollbar{display: none};
`

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

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const EditIcon = styled.div`
    margin-left: 0.5rem;
    cursor: pointer;
    
    img{
    width: 25px;
    height: 25px;
    }
`;

const LeftContainer = ({
    eName,
    organisation,
    eStartDate,
    eEndDate,
    eRegStart,
    eRegEnd,
    eLocation,
    eParticipants,
    eParticipantsMax,
    ePrice,
    description,
    setEEndDate,
    setELocation,
    setEName,
    setEParticipants,
    setEParticipantsMax,
    setEPrice,
    setERegEnd,
    setERegStart,
    setEStartDate,
    setOrganisation,
    setDescription,
}) => {

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

    const [isEventCreateOpen, setIsEventCreateOpen] = useState(false);

    const handleOpenEventCreateModal = () => {
        setIsEventCreateOpen(true);
    };

    const handleCloseEventCreateModal = () => {
        setIsEventCreateOpen(false);
    };

    const handleENameChange = (newName) => {
        setEName(newName);
        };
    
    const handleStartDateChange = (newDate) => {
    setEStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setEEndDate(newDate);
        };

    const handleRegStartChange = (newRegStart) => {
    setERegStart(newRegStart);
    };

    const handleRegEndChange = (newRegEnd) => {
    setERegEnd(newRegEnd);
    };

    const handleLocationChange = (newLocation) => {
    setELocation(newLocation);
    };

    const handleParticipantsMaxChange = (newParticipantsMax) => {
    setEParticipantsMax(newParticipantsMax);
    };

    const handleParticipantsChange = (newParticipants) => {
    setEParticipants(newParticipants);
    };

    const handlePriceChange = (newPrice) => {
    setEPrice(newPrice);
    };

    const handleOrganisationChange = (newOrganisation) => {
    setOrganisation(newOrganisation);
    };

    const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);

    const handleOpenDescriptionEdit = () => {
        setIsDescriptionEditOpen(true);
    };

    const handleCloseDescriptionEdit = () => {
        setIsDescriptionEditOpen(false);
    };

    const handleFileDrop = (files) => { 
        console.log(files);
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

            <ListItem onClick={handleOpenEventCreateModal}>
            <img src={AddEvent} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Create Event</a>
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

            <Modal isOpen={isEventCreateOpen} onClose={handleCloseEventCreateModal} modalHeight={"600px"} modalWidth={"700px"}>
            <>
                <EditContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600", "color":"#efefef"}} href={() => false}>Create Event</a>
                </EditContainer>
                <TopCreateContainer>

                    <BoxContainer>
                        <Box>
                            <Title>Name</Title>
                            <EditableTextField value={eName} onSave={handleENameChange}/>
                        </Box>

                        <Box style={{"width":"350px"}}>
                            <Title>Organisation</Title>
                            <EditableTextField value={organisation} onSave={handleOrganisationChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"350px"}}>
                            <Title>Location</Title>
                            <EditableTextField value={eLocation} onSave={handleLocationChange}/>
                        </Box>

                        <Box>
                            <Title>Price</Title>
                            <EditableTextField value={ePrice} onSave={handlePriceChange}/>
                        </Box>
                    </BoxContainer>
                    
                    <BoxContainer>
                        <Box>
                            <Title>Start Date</Title>
                            <EditableTextField value={eStartDate} onSave={handleStartDateChange}/>
                        </Box>
                        <Box style={{"width":"350px"}}>
                            <Title>End Date</Title>
                            <EditableTextField value={eEndDate} onSave={handleEndDateChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"350px"}}>
                            <Title>Registration Start Date</Title>
                            <EditableTextField value={eRegStart} onSave={handleRegStartChange}/>
                        </Box>
                        <Box>
                            <Title>Registration End Date</Title>
                            <EditableTextField value={eRegEnd} onSave={handleRegEndChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box>
                            <Title>Participants</Title>
                            <EditableTextField value={eParticipants} onSave={handleParticipantsChange}/>
                        </Box>
                        <Box style={{"width":"350px"}}>
                            <Title>Maximum Participants</Title>
                            <EditableTextField value={eParticipantsMax} onSave={handleParticipantsMaxChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"700px"}}>
                            <TitleContainer>
                                <Title style={{"marginBottom":"20px"}}>Description</Title>
                                {isDescriptionEditOpen ? 
                                (
                                <EditIcon onClick={handleCloseDescriptionEdit}>
                                    <img src={Tick} alt="edit" />
                                </EditIcon>
                                ) : (
                                <EditIcon onClick={handleOpenDescriptionEdit}>
                                    <img src={Edit} alt="edit" />
                                </EditIcon>
                                )
                                }
                            </TitleContainer>
                            {isDescriptionEditOpen ? (
                            <ReactQuill style={{"backgroundColor":"white", "color":"black", "border":"2px solid #000"}} theme="snow" value={description} onChange={setDescription}/>
                            ) : (
                                <div style={{"color":"#efefef"}} dangerouslySetInnerHTML={{ __html: description }} />
                            )}
                        </Box>
                    </BoxContainer>
                </TopCreateContainer>
            </>
            </Modal>
        </>
    );
};

export {LeftContainer};