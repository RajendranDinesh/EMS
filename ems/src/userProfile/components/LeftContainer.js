import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from 'react-select';

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
import EventDefault from './icons/event.png';
import TrashCan from './icons/trash_can.png';
import Plus from './icons/plus.png';

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
    background: #8739F9;
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

    span {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        background: #8739F9;
        font-size: 20px;
        padding: 6.4px;
        margin-left: 40px;
        width: 40px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &:hover {
        background-color: #50597b;
        border-bottom: 4px solid #8739F9;

        span {
            background: #efefef;
            color: #8739F9;
            transition: all 0.4s ease-in-out;
        }
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

  :hover {
    cursor: pointer;
  }
`;

const EventDetails = styled.p`
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &:hover {
    cursor: pointer;
  }

    span {
        margin-right: 10px;
        margin-left: 10px;
        margin-top:5px;
    }
`;

const Venue = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

const ColumnSeperator = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
  align-items: center;
`;

const ActionButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
        margin-right: 20px;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        height: 40px;
        width: 40px;
    }
`;

const DeclineButton = styled.button`
  background-color: #f44336;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AcceptButton = styled.button`
    background-color: #4caf50;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
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

const EventDetailsBold = styled.span`
    font-weight: bold;
`;

const NotificationTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const QuestionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;

    a {
        font-size: 16px;
        margin-right: 10px;
    }
`;

const SwitchForAbstract = styled.input.attrs({ type: 'checkbox' })`
    width: 50px;
    height: 24px;
    border-radius: 20px;
    appearance: none;
    background: var(--ab, #efefef);
    position: relative;
    cursor: pointer;
    
    &:before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--b, #8739F9);
        transition: transform 0.5s ease-in-out;
        transform: translateX(var(--x, 0));
    }

    &:checked {
        --ab: #8739F9;
        --x: 24px;
        --b: #fff;
    }
    
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
        
        &:checked {
            --ab: #aaa;
            --x: 20px;
        }
    }
`;

const TeamInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow-x: none;
    flex-wrap: wrap;
    margin-top: 2vh;
    margin-bottom: 4vh;

    border: 1px solid #efefef;
    border-radius: 10px;
`;

const MemberInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px
`;

const MemberName = styled.a`
    font-size: 2em;
`;

const MemberEmail = styled.a`
    font-size: 1.1em;
`;

const DeleteTeam = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    background-color: #ff0000;
    margin-bottom: 1vh;

    border: none;
    border-radius: 5px;
    padding: 0.5em;

    font-size: 20px;
    font-weight: 500;
    color: #efefef;

    &:hover{
        transform: scale(1.08, 1.08);
        transition: 0.3s ease-in-out;
        cursor: pointer;
    }
`;

const TeamCreateModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    color: #efefef;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 20px;
    
    &::-webkit-scrollbar{display: none};
`;

const AddTeamContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;

    border: 1px solid #efefef;
    border-radius: 10px;
    padding: 2em;

    input {
        height: 5.6vh;
        width: 60%;
        font-size: 22.6px;
    }

    button {
        height: 6.2vh;
        border: 1px solid #000;
        border-radius: 10px;
        background-color: #4caf50;

        font-size: 20px;
        font-weight: 550;

        &:hover{
            transform: scale(1.08, 1.08);
            transition: 0.3s ease-in-out;
            cursor: pointer;
        }
    }
`;

const TeamNameEdit = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 70%;
    padding: 1vh;

    border: 1px solid #efefef;
    border-radius: 10px;
    margin-top: 1vh;
    margin-bottom: 1vh;
`;

const AddedEmails = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;

    width: 70%;
    height: 15vh;
    border: 1px solid #efefef;
    border-radius: 10px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    padding: 1vh;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const options = [
    { value: 'paper', label: 'Paper Presentation' },
    { value: 'project', label: 'Project Competition' },
    { value: 'symposium', label: 'Symposium' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'coding', label: 'Coding' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'design', label: 'Design' },
    { value: 'other', label: 'Other' },
  ]

const customStyles = {
    control: (provided, state) => ({
    ...provided,
    margin: '8px',
    width: '70%',
    border: '1px solid #efefef',
    borderRadius: '10px',
    backgroundColor: '#efefef',
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        background: state.isSelected ? '#8739F9' : 'white',
        '&:hover': {
            background: state.isSelected ? '#8732F0' : '#efefef',
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
    }),
}

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
    eTeamsMax,
    description,
    eventId,
    isMod,
    isAbstractRequired,
    isTeamEvent,
    notificationCount,
    selectedEventType,
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
    setNotificationCount,
    setTeamMax,
    setIsTeamEvent,
    setIsAbstractRequired,
    setSelectedEventType,
    email,
    username
}) => {

    const [isNotifyOpen, setIsNotifyOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);
    const [isEventCreateOpen, setIsEventCreateOpen] = useState(false);
    const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);
    const [isEventAdded, setIsEventAdded] = useState(false);
    const [isDoneClicked, setIsDoneClicked] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [isDoneVisible, setIsDoneVisible] = useState(true);
    const [isOpenModAccess, setIsOpenModAccess] = useState(false);

    const [createdEventData, setCreatedEventData] = useState([]);
    const [isEventCreatedOpen, setIsEventCreatedOpen] = useState(false);

    const [isRequestClicked, setIsRequestClicked] = useState(false);
    const [isReqLoadingComplete, setIsReqLoadingComplete] = useState(false);
    const [isRequestAdded, setIsRequestAdded] = useState(false);
    const [isRequestVisible, setIsRequestVisible] = useState(true);

    const [attendedEventData, setAttendedEventData] = useState([{name: "You Have Not Atteded Any Events", eventId: ""}]);
    const [notifications, setNotifications] = useState([{message: "There are no new Notifications", eventId: ""}]);

    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isTeamCreateModalOpen, setIsTeamCreateModalOpen] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [newTeamData, setNewTeamData] = useState([]);
    const [newTeamName, setNewTeamName] = useState("");
    const [newEmail, setNewEmail] = useState('');

    const API_URL = process.env.REACT_APP_API_URL;

    const handleOpenTeamModal = async () => {
        try {
            const authToken = Cookies.get('authToken');
            const response = await axios.get(`${API_URL}/teams/user`, {
                headers: {
                Authorization: `Bearer ${authToken}`,
                'Bypass-Tunnel-Reminder': 'eventaz',
            }})

            setTeamData(response.data.teamObjects);
            setIsTeamModalOpen(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCloseTeamModal = () => {
        setIsTeamModalOpen(false);
    };

    const handleOpenTeamCreateModal = () => {
        setNewTeamName('');
        setNewTeamData([email])
        setIsTeamModalOpen(false);
        setIsTeamCreateModalOpen(true);
    }

    const handleAddEmail = () => {
        if (newEmail.trim() !== '') {
            setNewTeamData([...newTeamData, newEmail]);
            setNewEmail('');
          }
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleNewTeamNameChange = (e) => {
        setNewTeamName(e);
    };

    const handleNewTeamEmailEntered = (e) => {
        if (e.key === "Enter"){
            handleAddEmail();
        }
    };

    const handleNewTeamSubmit = async () => {
        const authToken = Cookies.get('authToken');

        if(newTeamName.trim() === '' || newTeamData.length === 1)
        {
            alert('Please Fill The Required Fields...');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/teams/newteam`, 
            { newTeamName: newTeamName, newTeamData: newTeamData},
            { headers : {
                Authorization: `Bearer ${authToken}`,
                'Bypass-Tunnel-Reminder': 'eventaz',
            }});

            if(response.status === 200){
                handleCloseTeamCreateModal();
            }
        } catch (error) {
            if (error.response.status === 404){
                await SweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    children: error.response.data.message
                })
                return;
            }
            else if (error.response.status === 409){
                await SweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    children: error.response.data.message
                })
                return;
            }
            console.log(error.response);
            alert(error.response);
        }
    };

    const handleDeleteTeam = async ({teamName}) => {
        try {
            const response = await axios.delete(`${API_URL}/teams/delete`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'Bypass-Tunnel-Reminder': 'eventaz'
                    },
                data: {
                    teamName: teamName
                }
            });
            if (response.status === 200) {
                await SweetAlert({
                    icon: 'success',
                    title: 'Success',
                    children: <p>Team Deleted</p>
                });
                handleOpenTeamModal();
            }
        } catch (error) {
            console.log(error);
            await SweetAlert({
                icon: 'error',
                title: 'Oops...',
                children: <p>{error.message}</p>
            });
        }
    };

    const handleCloseTeamCreateModal = () => {
        setNewTeamData([]);
        handleOpenTeamModal();
        setIsTeamCreateModalOpen(false);
    };

    const handleOpenEventModal = async () => {
        try{
            const response = await axios.get(`${API_URL}/attendedevents`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                    },
            });
    
            if (response.status === 200) {
                const events = response.data.attended;
                events.forEach((event) => {
                    if (event.eventIcon === "") {
                        event.eventIcon = EventDefault;
                    }
                });
                setAttendedEventData(events);
                setIsEventOpen(true);
            }
            else {
                console.log(response)
            }
            } catch (error){
                console.log(error);
                SweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    children: <p>{error.message}</p>
                });
            }
    };

    const handleOpenNotifyModal = async () => {
        try {
            const notificationResponse = await axios.get(`${API_URL}/notifications/user`, 
            { headers: {
                Authorization: `Bearer ${Cookies.get("authToken")}`,
                'ByPass-Tunnel-Reminder': 'eventaz'
                },});
            
            if (notificationResponse.status === 200) {
                const notifications = notificationResponse.data.notifications;
                setNotifications(notifications);
                setIsNotifyOpen(true);
                setNotificationCount(0);
            }
        } catch (error) {
            await SweetAlert({
                title: "OOps...",
                icon: 'error',
                children: "Please Try Again Later..."
            });   
        }
    };

    const handleCloseNotifyModal = () => {
        setIsNotifyOpen(false);
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
        minparticipants: eParticipants,
        maxParticipants: eParticipantsMax,
        description: description,
        maxnumberofteams: eTeamsMax,
        isabstractrequired: isAbstractRequired,
        isteamevent: isTeamEvent,
        eventtype: selectedEventType.value,
    });

    const handleEventTypeChange = (selectedEventType) => {
        setSelectedEventType(selectedEventType);
        setEData({ ...eData, eventtype: selectedEventType.value });
    };

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
        setEData({ ...eData, minparticipants: newParticipants });
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

    const handleTeamMaxChange = (newTeamMax) => {
        setEData({ ...eData, maxnumberofteams: newTeamMax });
        setTeamMax(newTeamMax);
    }

    const handleIsAbstractRequired = () => {
        setEData({ ...eData, isabstractrequired: !isAbstractRequired});
        setIsAbstractRequired(!isAbstractRequired);
    };

    const handleIsTeamEvent = () => {
        setEData({ ...eData, isteamevent: !isTeamEvent});
        setIsTeamEvent(!isTeamEvent);
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

    const handleNavigateToEventPage = (eventId) => () => {
        window.location.href = `/event/${eventId}`;
    };

    const handleOpenEventCreatedModal = async () => {
        try{
            const response = await axios.get(`${API_URL}/user/createdevents`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                    },
            });
    
            if (response.status === 200) {
                const events = response.data.created;

                events.forEach((event) => {
                    if (event.eventIcon === "") {
                        event.eventIcon = EventDefault;
                    }
                });
                setCreatedEventData(events);
                setIsEventCreatedOpen(true);
            }
            else {
                console.log(response)
            }
            } catch (error){
                console.log(error);
                SweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    children: <p>{error.message}</p>
                });
            }
    };

    const handleCloseEventCreatedModal = () => {
        setIsEventCreatedOpen(false);
    };

    const handleClearAllNotifications = async () =>  {
        try {
            const deleteResponse = await axios.delete(`${API_URL}/notifications/user`, 
                { headers : {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                }}
            );

            if (deleteResponse.status === 200) {
                setNotificationCount(0);
                setNotifications([{message: "Deleted All Notifications", eventId: ""}]);
            }
        } catch (error) {
            console.log(error.message);
            await SweetAlert({
                icon: 'error',
                title: 'Oops...',
                children: <p>{error.message}</p>
            });
        }
    };

    const handleDeleteNotification = async (eventId) => {
        try {
            const deleteResponse = await axios.delete(`${API_URL}/notifications/user/${eventId}`, 
                { headers : {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                }}
            );

            if (deleteResponse.status === 200) {
                const newNotifications = notifications.filter(notification => notification.eventId !== eventId);
                setNotifications(newNotifications);
            }
        } catch (error) {
            console.log(error.message);
            await SweetAlert({
                icon: 'error',
                title: 'Oops...',
                children: <p>{error.message}</p>
            });
        }
    };

    return (
        <>
        <TopContainer>
            <HeaderText>
                <a href={() => false} style={{"fontSize":"20px"}}>MENU BOX</a>
            </HeaderText>
            
            <ListItem onClick={handleOpenNotifyModal}>
                <img src={Plane} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Notifications</a>
                <span>{notificationCount}</span>
            </ListItem>

            <ListItem onClick={handleOpenEventModal}>
                <img src={Calendar} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Events Registered</a>
            </ListItem>

            <ListItem onClick={handleOpenTeamModal}>
                <img src={Calendar} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Your Teams</a>
            </ListItem>

            {isMod? (
                <>
                    <ListItem onClick={handleOpenEventCreateModal}>
                        <img src={AddEvent} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                        <a style={{"fontSize":"20px"}} href={() => false}>Create Event</a>
                    </ListItem>
                    <ListItem onClick={handleOpenEventCreatedModal}>
                        <img src={AddEvent} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                        <a style={{"fontSize":"20px"}} href={() => false}>Events Created</a>
                    </ListItem>
                </>
            ) : (
            <ListItem onClick={handleOpenModAccess}>
                <img src={AddUser} style={{"width":"25px", "height":"25px", "marginRight":"10px"}} alt=''></img>
                <a style={{"fontSize":"20px"}} href={() => false}>Request Mod Access</a>
            </ListItem>)}
        </TopContainer>

{/* Notfications Modal */}
            <Modal isOpen={isNotifyOpen} onClose={handleCloseNotifyModal}>
                <TopModalContainer>
                    <NotificationTopContainer>
                        <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Notifications</a>
                        <ActionButtons>
                            <a href={() => false} style={{fontSize: "1.25em"}}>Clear All</a>
                            <DeclineButton onClick={handleClearAllNotifications}><img alt="Delete" src={TrashCan} style={{width: "35px", height: "35px"}}/></DeclineButton>
                        </ActionButtons>
                    </NotificationTopContainer>

                    {notifications.map((notification) => (
                    <CardContainer key={notification.eventId}>
                        <CardContent>
                            <ColumnSeperator>
                                <EventDetails onClick={handleNavigateToEventPage(notification.eventId)}>
                                <span>{notification.message}</span>
                                </EventDetails>
                                {  (notification.eventId !== "") &&
                                <ActionButtons>
                                    <DeclineButton onClick={() => handleDeleteNotification(notification.eventId)}>
                                        <img alt="Delete" src={TrashCan} style={{width: "35px", height: "35px"}}/>
                                    </DeclineButton>
                                </ActionButtons>}
                            </ColumnSeperator>
                        </CardContent>
                    </CardContainer>
                    ))}
                </TopModalContainer>
            </Modal>

{/* Events Registered Modal */}
            <Modal isOpen={isEventOpen} onClose={handleCloseEventModal}>
                <TopModalContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Events Registered</a>

                    {attendedEventData.map((event) => (
                    <CardContainer key={event.eventId}>
                        {event.eventIcon && (
                        <CardImage>
                            <img src={event.eventIcon} alt="Event" />
                        </CardImage>)}

                        <CardContent>
                            <EventName onClick={handleNavigateToEventPage(event.eventId)}>{event.name}</EventName>
                            {event.location && (
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Held at <EventDetailsBold>{event.location}</EventDetailsBold></Venue>
                                <span>From <EventDetailsBold>{dayjs(event.startDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventDetailsBold></span>
                                <span>Till <EventDetailsBold>{dayjs(event.endDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventDetailsBold></span>
                                <span>Attended The Event: {event.hasParticipated? (<>Yes</>):(<>No</>)}</span>
                                </EventDetails>
                            </ColumnSeperator>)}
                        </CardContent>

                    </CardContainer>
                    ))}
                </TopModalContainer>
            </Modal>

{/* Create Event Modal */}
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
                            <a style={{"fontSize":"16px"}} href={() => false}>{organisation}</a>
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
                        <Box style={{"width":"350px"}}>
                            <QuestionContainer>
                                <a href={() => false}>Ai u gonna select the participants?</a>
                                <SwitchForAbstract type="checkbox" onChange={handleIsAbstractRequired} defaultValue={isAbstractRequired}/>
                            </QuestionContainer>
                        </Box>
                        <Box>
                            <a href={() => false}>Whats the type of Event?</a>
                            <Select options={options} styles={customStyles} value={selectedEventType} onChange={handleEventTypeChange}/>
                        </Box>
                    </BoxContainer>

                    <Box style={{"width":"670px"}}>
                    <QuestionContainer>
                        <a href={() => false}>Is this a team event?</a>
                        <SwitchForAbstract type="checkbox" onChange={handleIsTeamEvent} />
                    </QuestionContainer>

                    {isTeamEvent? (
                        <>
                        <a style={{"fontSize":"24px"}} href={() => false}>Team Size</a>
                    <BoxContainer>
                        <Box style={{"width":"320px"}}>
                            <Title>Minimum</Title>
                            <EditableTextField value={eParticipants} onSave={handleParticipantsChange}/>
                        </Box>
                        <Box>
                            <Title>Maximum</Title>
                            <EditableTextField value={eParticipantsMax} onSave={handleParticipantsMaxChange}/>
                        </Box>
                    </BoxContainer>
                    <BoxContainer>
                        <Box>
                            <Title>Maximum Number of Teams Allowed To Register</Title>
                            <EditableTextField value={eTeamsMax} onSave={handleTeamMaxChange} />
                        </Box>
                    </BoxContainer>
                    </>) : (<>
                        <Box>
                            <Title>Maximum Number Of Participants Allowed</Title>
                            <EditableTextField value={eParticipantsMax} onSave={handleParticipantsMaxChange}/>
                        </Box>
                    </>)}
                    </Box>

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

{/* Request Mod Access Modal */}
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

{/* Events Created Modal */}
            <Modal isOpen={isEventCreatedOpen} onClose={handleCloseEventCreatedModal}>
                <TopModalContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Events Created</a>

                    {createdEventData.map((event) => (
                    <CardContainer key={event.eventId}>
                        <CardImage>
                            <img src={event.eventIcon} alt="Evt" />
                        </CardImage>

                        <CardContent>
                            <EventName onClick={handleNavigateToEventPage(event.eventId)}>{event.name}</EventName>
                            <ColumnSeperator>
                                <EventDetails>
                                <Venue>Held at <EventDetailsBold>{event.location}</EventDetailsBold></Venue>
                                <span>From <EventDetailsBold>{dayjs(event.startDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventDetailsBold></span>
                                <span>Till <EventDetailsBold>{dayjs(event.endDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</EventDetailsBold></span>
                                </EventDetails>
                            </ColumnSeperator>
                        </CardContent>

                    </CardContainer>
                    ))}
                </TopModalContainer>
            </Modal>

{/* Teams Created */}
            <Modal isOpen={isTeamModalOpen} onClose={handleCloseTeamModal}>
                <TopModalContainer>
                    <NotificationTopContainer>
                        <a style={{"fontSize":"30px", "fontWeight":"600"}} href={() => false}>Your Teams</a>
                        <ActionButtons>
                            <a href={() => false} style={{fontSize: "1.25em"}}>Create New Team</a>
                            <AcceptButton onClick={handleOpenTeamCreateModal}><img alt="Create Team" src={Plus} style={{width: "35px", height: "35px"}}/></AcceptButton>
                        </ActionButtons>
                    </NotificationTopContainer>
                    
                    {/*Repeat Starts here*/}
                    {Object.keys(teamData).length !== 0 && teamData.map((team, index) => (
                    <TeamInfoContainer key={index}>
                        <MemberInfo style={{"border":"1px solid #efefef", "borderRadius":"10px", "marginTop":"10px", "marginBottom":"10px"}}>
                            <a href={() => false} style={{fontSize: "2em"}}>{team.teamName}</a>Created By
                            <MemberName>
                                {team.teamLead.name}
                            </MemberName>
                            <MemberEmail>
                                {team.teamLead.email}
                            </MemberEmail>
                        </MemberInfo>
                        
                        {team.teamMembers.map((member, index) => (
                        <MemberInfo key={index}>
                            <MemberName>
                                {member.name}
                            </MemberName> 
                            <MemberEmail>
                                {member.email}
                            </MemberEmail>
                        </MemberInfo>))}
                    
                        {team.teamLead.name === username && <DeleteTeam onClick={() => handleDeleteTeam({teamName: team.teamName})}><img alt="Delete" src={TrashCan} style={{width: "30px", height: "30px"}}/>Delete Team</DeleteTeam>}
                    </TeamInfoContainer>
                    ))}
                        {/*Repeat Ends here*/}

                </TopModalContainer>
            </Modal>

{/* Team Creation */}
            <Modal isOpen={isTeamCreateModalOpen} onClose={handleCloseTeamCreateModal}>
                <TeamCreateModalContainer>
                    <NotificationTopContainer>
                        <a style={{"fontSize":"20px", "fontWeight":"600"}} href={() => false}>Add Team Details and Click the Green Button at The Top Right Corner</a>
                        <ActionButtons>
                            <AcceptButton onClick={handleNewTeamSubmit}><img alt="Create Team" src={Plus} style={{width: "35px", height: "35px"}}/></AcceptButton>
                        </ActionButtons>
                    </NotificationTopContainer>
                    <TeamNameEdit>
                        <Title>Team Name</Title>
                        <EditableTextField value={newTeamName} onSave={handleNewTeamNameChange} />
                    </TeamNameEdit>
                    {newTeamData.length !==0 && <AddedEmails>
                        {newTeamData.map((email, index) => <MemberEmail key={index}>{index+1}. {email}</MemberEmail>)}
                    </AddedEmails>}
                    <AddTeamContainer>
                        <input
                        type="email"
                        placeholder="Enter E-Mail"
                        value={newEmail}
                        onChange={handleEmailChange}
                        onKeyDown={handleNewTeamEmailEntered}
                        />
                        <button onClick={handleAddEmail}><img alt="Create Team" src={Plus} style={{width: "35px", height: "35px"}}/></button>
                    </AddTeamContainer>
                </TeamCreateModalContainer>
            </Modal>
        </>
    );
};

export {LeftContainer};