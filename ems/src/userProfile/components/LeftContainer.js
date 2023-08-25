import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Modal } from './Modal';
import EditableTextField from './EditableText';
import {Done} from './loader/Checker';
import {Loader} from './loader/Loader';
import {Cross} from './loader/Error';
import { SweetAlert } from '../../components/SweetAlert';

import Plane from './icons/plane.png';
import Calendar from './icons/calendar.png';
import AddEvent from './icons/add_event.png';
import Edit from '../../eventPage/components/icons/edit.png';
import Tick from '../../eventPage/components/icons/tick.png';
import AddUser from '../../organisationProfile/components/icons/add_user.png';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const Input = styled.input`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    width: 93%;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ModBox = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 10px;
    width: 265px;
    align-self: center;
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
    description,
    eventId,
    isMod,
    setEEndDate,
    setELocation,
    setEName,
    setEParticipants,
    setEParticipantsMax,
    setEPrice,
    setERegEnd,
    setERegStart,
    setEStartDate,
    setDescription,
    setEventId,
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);
    const [isEventCreateOpen, setIsEventCreateOpen] = useState(false);
    const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);
    const [isEventAdded, setIsEventAdded] = useState(false);
    const [isDoneClicked, setIsDoneClicked] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [isDoneVisible, setIsDoneVisible] = useState(true);
    const [isOpenModAccess, setIsOpenModAccess] = useState(false);

    const [isRequestClicked, setIsRequestClicked] = useState(false);
    const [isReqLoadingComplete, setIsReqLoadingComplete] = useState(false);
    const [isRequestAdded, setIsRequestAdded] = useState(false);
    const [isRequestVisible, setIsRequestVisible] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL;

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

    const handleOpenEventCreateModal = async () => {
        setIsEventCreateOpen(true);
        try{
        const eventIdResponse = await axios.get(`${API_URL}/event/nextid`);
        const eventId = eventIdResponse.data.nextId;
        handleEventIdChange(eventId);}
        catch(error){
            alert("Please try again later");
        }
    };

    const handleCloseEventCreateModal = () => {
        setIsEventCreateOpen(false);
    };

    const handleOpenDescriptionEdit = () => {
        setIsDescriptionEditOpen(true);
    };

    const handleCloseDescriptionEdit = () => {
        setIsDescriptionEditOpen(false);
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
    });

    

    const handleENameChange = (newName) => {
        setEName(newName);
        setEData({ ...eData, name: newName });
    };

    const handleEventIdChange = (newEventId) => {
        setEventId(newEventId);
        setEData({ ...eData, eventId: newEventId });
    };
    
    const handleStartDateChange = (newDate) => {
        setEData({ ...eData, startDate: newDate });
        setEStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setEData({ ...eData, endDate: newDate });
        setEEndDate(newDate);
    };

    const handleRegStartChange = (newRegStart) => {
        setEData({ ...eData, regStartDate: newRegStart });
        setERegStart(newRegStart);
    };

    const handleRegEndChange = (newRegEnd) => {
        setEData({ ...eData, regEndDate: newRegEnd });
        setERegEnd(newRegEnd);
    };

    const handleLocationChange = (newLocation) => {
        setEData({ ...eData, location: newLocation });
        setELocation(newLocation);
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

    const handleOpenModAccess = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/modrequest`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                    },
            });


            if (response.status === 200) {
                const orgMail = response.data.email;

                setIsOpenModAccess(true);
                setIsRequestVisible(false);
                setModRequest(orgMail);
            }
            else if (response.status === 204){
                setIsOpenModAccess(true);
                setIsRequestVisible(true);
            }
        } catch (error) {
            setIsOpenModAccess(false);
            await SweetAlert({
                icon: "error",
                title: "OOps...",
                children: <p>{error.message}</p>
            })
        }
    };

    const handleCloseModAccess = () => {
        setIsOpenModAccess(false);
    };

    const [modRequest, setModRequest] = useState("");
    const handleModRequestChange = (newModRequest) => {
        setModRequest(newModRequest.target.value);
        setIsRequestVisible(true);
    };

    const handleSendRequest = async () => {
        setIsRequestVisible(false);
        setIsRequestClicked(true);
        try {
            const response = await axios.put(`${API_URL}/user/modrequest`, {
                organisation: modRequest,
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'true'
                    },
            });

            if (response.status === 200) {
                setIsReqLoadingComplete(true);
                setIsRequestAdded(true);
            }
            else if (response.status === 201){
                setIsReqLoadingComplete(true);
                setIsRequestClicked(false);
                await SweetAlert({
                    icon: 'error',
                    title: 'Oope..',
                    children: <p>{response.data}</p>
                })
            }
        } catch (error) {
            if (error.response.status >= 400 && error.response.status < 500) {
                setIsReqLoadingComplete(true);
                setIsRequestAdded(false);
                console.log(error);
                await SweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    children: <p>{error.response}</p>,
                });
            }
        }
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
                <a style={{"fontSize":"20px"}} href={() => false}>Events Attended</a>
            </ListItem>

            {isMod? (
            <ListItem onClick={handleOpenEventCreateModal}>
                <img src={AddEvent} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Create Event</a>
            </ListItem>
            ) : (
            <ListItem onClick={handleOpenModAccess}>
                <img src={AddUser} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Request Mod Access</a>
            </ListItem>)}
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

                        {isMod?
                        (<Box style={{"width":"350px"}}>
                            <Title>Organisation</Title>
                            <a style={{"fontSize":"16px"}}>{organisation}</a>
                        </Box>) : (<></>)}
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

            <Modal isOpen={isOpenModAccess} onClose={handleCloseModAccess} modalHeight={"440px"} modalWidth={"320px"}>
                <>
                <EditContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600", "color":"#efefef"}} href={() => false}>Request Moderator Access</a>
                </EditContainer>
                    <ModBox>
                        <Title style={{"color":"#efefef"}}>Organisation E-Mail Id</Title>
                        <Input value={modRequest} onChange={handleModRequestChange}></Input>
                        <ButtonContainer>
                            {isRequestClicked? (isReqLoadingComplete? (
                                isRequestAdded? (<><Done/><a href={() => false} style={{"color":"#efefef"}}>Requested Access</a></>) : (<><Cross/><a href={() => false} style={{"color":"#efefef"}}>Please Try Again Later</a></>)
                                ) : (<Loader/>)) : (<></>)}
                            {isRequestVisible? 
                            (<Button onClick={handleSendRequest}>
                                Request
                            </Button>) 
                            : (<><a style={{color: `#efefef`}} href={() => false}>Access Not Granted</a> {/*<Button onClick={() => {}}>Clear</Button>*/}</>)}
                        </ButtonContainer>
                    </ModBox>
                </>
            </Modal>
        </>
    );
};

export {LeftContainer};