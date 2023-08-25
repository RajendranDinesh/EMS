import React, {useState} from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { Modal } from './Modal';
import EditableTextField from './EditableText';
import {Done} from './loader/Checker';
import {Loader} from './loader/Loader';
import {Cross} from './loader/Error';

import Calendar from './icons/calendar.png';
import AddEvent from './icons/add_event.png';
import Edit from '../../eventPage/components/icons/edit.png';
import Tick from '../../eventPage/components/icons/tick.png';
import AddUser from './icons/add_user.png';
import Users from './icons/users.png';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    height: 50vh;
    width: 23vw;
    border-radius: 10px;
`;

const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #11a8ab;
    border-radius: 10px 10px 0 0;
    color: #efefef;
    width: 23vw;
    height: 10vh;
`;

const ListItem = styled.div`
    display: flex;
    align-items: center;
    height: 10vh;
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    background-color: #11a8ab;
    color: #efefef;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 48px;
    width: 120px;
    transition: 0.3s;
    font-size: 18px;

    &:hover {
        background-color: #11a8ab;
        opacity: 0.9;
    }
`;

const DatePickerContainer = styled.div`
    margin-top: 1vh;
    background-color: #fffefe;
    border: #010101;
    border-radius: 5px;
    width: 200px;
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
    eventId,
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
    setEventId
}) => {

    const API_URL = process.env.REACT_APP_API_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);
    const [isEventCreateOpen, setIsEventCreateOpen] = useState(false);
    const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);
    const [isEventAdded, setIsEventAdded] = useState(false);
    const [isDoneClicked, setIsDoneClicked] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [isDoneVisible, setIsDoneVisible] = useState(true);
    const [isAcceptClicked, setIsAcceptClicked] = useState(false);
    const [isModModalOpen, setIsModModalOpen] = useState(false);

    const [modRequests, setModRequests] = useState([]);
    const [moderators, setModerators] = useState([]);

    const handleOpenModal = () => {
        getModRequests();
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

    const handleOpenEventCreateModal = async () => {
        try{
            const eventIdResponse = await axios.get(`${API_URL}/event/nextid`);
            const eventId = eventIdResponse.data.nextId;
            handleEventIdChange(eventId);}
        catch(error){
            alert("Please try again later");
        }
        setIsEventCreateOpen(true);
    };

    const [eData, setEData] = useState({
        eventId: eventId,
        name : eName,
        location: eLocation,
        price: ePrice,
        startDate: eStartDate,
        endDate: eEndDate,
        regStartDate: eRegStart,
        regEndDate: eRegEnd,
        participants: eParticipants,
        maxParticipants: eParticipantsMax,
        description: description,
        organisation: organisation
    });

    const handleEventIdChange = (newEventId) => {
        setEventId(newEventId);
        setEData({ ...eData, eventId: newEventId });
    };

    const handleCloseEventCreateModal = () => {
        setIsEventCreateOpen(false);
    };

    const handleOpenModModal = () => {
        getModerators();
        setIsModModalOpen(true);
    };

    const handleCloseModModal = () => {
        setIsModModalOpen(false);
    };

    const handleENameChange = (newName) => {
        setEName(newName);
        setEData({ ...eData, name: newName });
    };
    
    const handleStartDateChange = (newDate) => {
        setEStartDate(newDate);
        setEData({ ...eData, startDate: newDate });
    };

    const handleEndDateChange = (newDate) => {
        setEEndDate(newDate);
        setEData({ ...eData, endDate: newDate });
    };

    const handleRegStartChange = (newRegStart) => {
        setEData({ ...eData, regStartDate: newRegStart });
        setERegStart(newRegStart);
    };

    const handleRegEndChange = (newRegEnd) => {
        setERegEnd(newRegEnd);
        setEData({ ...eData, regEndDate: newRegEnd });
    };

    const handleLocationChange = (newLocation) => {
    setELocation(newLocation);
    setEData({ ...eData, location: newLocation });
    };

    const handleParticipantsMaxChange = (newParticipantsMax) => {
        setEData({ ...eData, maxParticipants: newParticipantsMax });
        setEParticipantsMax(newParticipantsMax);
    };

    const handleParticipantsChange = (newParticipants) => {
        setEData({ ...eData, participants: newParticipants });
        setEParticipants(newParticipants);
    };

    const handlePriceChange = (newPrice) => {
        setEData({ ...eData, price: newPrice });
        setEPrice(newPrice);
    };

    const handleDescriptionChange = (newDescription) => {
        setEData({ ...eData, description: newDescription });
        setDescription(newDescription);
    };

    const handleOrganisationChange = (newOrganisation) => {
    setOrganisation(newOrganisation);
    };

    const handleOpenDescriptionEdit = () => {
        setIsDescriptionEditOpen(true);
    };

    const handleCloseDescriptionEdit = () => {
        setIsDescriptionEditOpen(false);
    };

    const handleCreateEvent = async (e) => {
        handleDoneClicked();

        try {
            const response = await axios.post(`${API_URL}/event/create`, eData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                    },
            });
            
            if (response.status === 200) {
                handleEventAdded();
            }

        } catch (error) {
            console.log(error)
            if (error.status === 400) {
                setIsDoneClicked(false);
                alert("Event Already Exists");
            }
            else {
                alert("Error Creating Event, Please Try Later");
            }
        }
    };

    const handleDoneClicked = () => {
        setIsDoneClicked(true);
    };

    const handleEventAdded = () => {
        setIsLoadingComplete(true);
        setIsEventAdded(true);
        setIsDoneVisible(false);
    };

    const getModRequests = async () => {
        try {
            const response = await axios.get(`${API_URL}/organisation/modrequests`,
            { headers: { Authorization: `Bearer ${Cookies.get('authToken')}`,
        'Bypass-Tunnel-Reminder': 'eventaz' } });
            setModRequests(response.data.modrequests);
        } catch (error) {
            console.error(error);
        }
    };

    const getModerators = async () => {
        try {
            const response = await axios.get(`${API_URL}/organisation/moderators`,
            { headers: { Authorization: `Bearer ${Cookies.get('authToken')}`,
        'Bypass-Tunnel-Reminder': 'eventaz' } });
            setModerators(response.data.moderators);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAccept = async (email) => {
        try {
            await axios.put(`${API_URL}/organisation/acceptmodrequest`, {email: email},
            { headers: { Authorization: `Bearer ${Cookies.get('authToken')}`,
        'Bypass-Tunnel-Reminder': 'eventaz' } });

            setIsAcceptClicked(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecline = async (email) => {
        try {
            await axios.put(`${API_URL}/organisation/declinemodrequest`, {email: email},
            { headers: { Authorization: `Bearer ${Cookies.get('authToken')}`,
        'Bypass-Tunnel-Reminder': 'eventaz' } });
        
        setIsAcceptClicked(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveMod = async (email) => {
        try {
            await axios.delete(`${API_URL}/organisation/removemod`,{
            headers: {Authorization: `Bearer ${Cookies.get('authToken')}`,
        'Bypass-Tunnel-Remainder': 'eventaz'},
        data: {email: email}});

        getModerators();
        } catch (error){
            console.log(error);
        }
    };

    return (
        <>
        <TopContainer>
            <HeaderText>
                <a href={() => false} style={{"fontSize":"20px"}}>MENU BOX</a>
            </HeaderText>
            
            <ListItem onClick={handleOpenEventCreateModal}>
                <img src={AddEvent} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Create Event</a>
            </ListItem>

            <ListItem onClick={handleOpenEventModal}>
                <img src={Calendar} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Events Organised</a>
            </ListItem>

            <ListItem onClick={handleOpenModal}>
                <img src={AddUser} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Moderator Request</a>
            </ListItem>

            <ListItem onClick={handleOpenModModal}>
                <img src={Users} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Your Moderators</a>
            </ListItem>
            
        </TopContainer>

            {/* MODERATOR REQUESTS */}
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <TopModalContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Moderator Requests</a>

                    {modRequests.map(modRequest => 
                    <CardContainer>
                        <CardImage>
                            <img src={modRequest.profilePic} alt="Event Imag" />
                        </CardImage>

                        <CardContent>
                            <EventName>{modRequest.username}</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>{modRequest.email}</Venue>
                                </EventDetails>
                                <ActionButtons>
                                    {isAcceptClicked? (<h4>Done..</h4>) : (<>
                                    <AcceptButton onClick={() => handleAccept(modRequest.email)}>Accept</AcceptButton>
                                    <DeclineButton onClick={() => handleDecline(modRequest.email)}>Decline</DeclineButton>
                                    </>)}
                                </ActionButtons>
                            </ColumnSeperator>
                        </CardContent>
                    </CardContainer>
                    )}
                </TopModalContainer>
            </Modal>

            {/* MODERATOR'S */}
            <Modal isOpen={isModModalOpen} onClose={handleCloseModModal}>
                <TopModalContainer>
                        <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Your Moderators</a>

                        {moderators.map(moderator => 
                        <CardContainer>
                            <CardImage>
                                <img src={moderator.profilePic} alt="Event Imag" />
                            </CardImage>

                            <CardContent>
                                <EventName>{moderator.username}</EventName>
                                <ColumnSeperator>
                                    <EventDetails>
                                    <Venue>{moderator.email}</Venue>
                                    </EventDetails>

                                    <ActionButtons>
                                        <DeclineButton onClick={() => handleRemoveMod(moderator.email)}>Remove</DeclineButton>
                                    </ActionButtons>
                                </ColumnSeperator>
                            </CardContent>
                        </CardContainer>
                    )}
                </TopModalContainer>
            </Modal>

            <Modal isOpen={isEventOpen} onClose={handleCloseEventModal}>
                <TopModalContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Events Organised</a>

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
                            <a style={{"fontSize":"16px"}}>{organisation}</a>
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePickerContainer>
                                    <DatePicker onChange={handleStartDateChange} className='custom-date-picker' timezone='Asia/Kolkata'/>
                                </DatePickerContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box style={{"width":"350px"}}>
                            <Title>End Date</Title>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerContainer>
                                <DatePicker onChange={handleEndDateChange} className='custom-date-picker' timezone='Asia/Kolkata'/>
                            </DatePickerContainer>
                            </LocalizationProvider>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"350px"}}>
                            <Title>Registration Start Date</Title>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerContainer>
                                <DatePicker onChange={handleRegStartChange} className='custom-date-picker' timezone='Asia/Kolkata'/>
                            </DatePickerContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box>
                            <Title>Registration End Date</Title>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerContainer>
                                <DatePicker onChange={handleRegEndChange} className='custom-date-picker' timezone='Asia/Kolkata'/>
                            </DatePickerContainer>
                            </LocalizationProvider>
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
                            <ReactQuill style={{"backgroundColor":"white", "color":"black", "border":"2px solid #000"}} theme="snow" value={description} onChange={handleDescriptionChange}/>
                            ) : (
                                <div style={{"color":"#efefef"}} dangerouslySetInnerHTML={{ __html: description }} />
                            )}
                        </Box>
                    </BoxContainer>

                    <ButtonContainer>
                        {isDoneClicked? (isLoadingComplete? (
                            isEventAdded? (<><Done/><a href={() => false}>Event Added</a></>) : (<Cross/>)
                            ) : (<Loader/>)) : (<></>)}
                        {isDoneVisible? 
                        (<Button onClick={handleCreateEvent}>
                            Done
                        </Button>) 
                        : (<></>)}
                    </ButtonContainer>
                </TopCreateContainer>
            </>
            </Modal>
        </>
    );
};

export {LeftContainer};