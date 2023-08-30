import { LeftContainer } from './components/LeftContainer'
import { RightContainer } from './components/RightContainer'
import { MiddleContainer } from './components/MiddleContainer'
import { Header } from './components/Header'
import UserDefault from "./components/icons/user_default.png";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Cookies from 'js-cookie';
import { SweetAlert } from '../components/SweetAlert';

const Body = styled.div`
    background-color: #1f253d;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 80vw;
`

const leagues = [
    { name: 'Uranium', minEvents: 25 },
    { name: 'Astatine', minEvents: 22 },
    { name: 'Nobelium', minEvents: 20 },
    { name: 'Fermium', minEvents: 17 },
    { name: 'Curium', minEvents: 15 },
    { name: 'Bismuth', minEvents: 12 },
    { name: 'Thallium', minEvents: 10 },
    { name: 'Actinium', minEvents: 7 },
    { name: 'Polonium', minEvents: 5 },
    { name: 'Radium', minEvents: 3 },
    { name: 'Francium', minEvents: 1 },
    { name: 'Nil', minEvents: 0}
  ];

const badgeImages = {
    Francium: require('./components/icons/badges/francium.png'),
    Radium: require('./components/icons/badges/radium.png'),
    Polonium: require('./components/icons/badges/polonium.png'),
    Actinium: require('./components/icons/badges/actinium.png'),
    Thallium: require('./components/icons/badges/thallium.png'),
    Bismuth: require('./components/icons/badges/bismuth.png'),
    Curium: require('./components/icons/badges/curium.png'),
    Fermium: require('./components/icons/badges/fermium.png'),
    Nobelium: require('./components/icons/badges/nobelium.png'),
    Astatine: require('./components/icons/badges/astatine.png'),
    Uranium: require('./components/icons/badges/uranium.png'),
    Nil: require('./components/icons/badges/noevent.png')
  };

const UserProfile = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [address, setAddress] = useState('Update Your Address Here');
    const [desc, setDesc] = useState('Update Your Description Here');
    const [password, setPassword] = useState('Update Your Password Here');
    const [dob, setDob] = useState('Update Your Date of Birth Here');
    const [email, setEmail] = useState('Update Your Email Here');
    const [name, setName] = useState('Update Your Name Here');
    const [eProfile, setEProfile] = useState('');
    const [isMod, setIsMod] = useState(false);
    const [numberOfEvents, setNumberOfEvents] = useState(0);
    const [userLeague, setUserLeague] = useState({ name: "Nil", minEvents: 0})
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = Cookies.get('authToken');

                if (!authToken) {
                    window.location.href = '/login';
                    return;
                };

                const response = await axios.get(`${API_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Bypass-Tunnel-Reminder': 'eventaz',
                    }
                });

                document.title = `${response.data.user.fname} | HAXGUZ`;

                setName(response.data.user.fname);
                setEmail(response.data.user.email);
                setDob(response.data.user.dateOfBirth);
                setDesc(response.data.user.description);
                setAddress(response.data.user.address);
                if (response.data.user.profilePicture === "") {
                    setEProfile(UserDefault);
                    return;
                }
                setEProfile(response.data.user.profilePicture);
                setOrganisation(response.data.user.organisation);
                setNumberOfEvents(response.data.eventsAttended);

                if(numberOfEvents !== 0){
                for (const league of leagues) {
                    if(numberOfEvents >= league.minEvents){
                        setUserLeague(league);
                        break;      
                    }
                }}
                
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    window.location.href = '/login';
                } else {
                    await SweetAlert({
                        icon: 'error',
                        title: 'Oops...',
                        children: '<p>Error fetching data. Please try again later.</p>',
                    });
                };
            }
        };
    const checkMod = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/modcheck`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("authToken")}`,
                        'ByPass-Tunnel-Reminder': 'eventaz'
                        },
                });

                if (response.status === 200) {
                    setIsMod(true);
                }
                else if (response.status === 204){
                    setIsMod(false);
                }
            } catch (error) {
                console.log(error);
                setIsMod(false);
            }
        };
    const checkNumberOfNotifications = async () => {
        try {
            const response = await axios.get(`${API_URL}/notifications/user/count`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'ByPass-Tunnel-Reminder': 'eventaz'
                    },
            });

            if (response.status === 200) {setNotificationCount(response.data.count);}
        } catch (error) {
            console.log(error.message);
            await SweetAlert({
                icon: 'error',
                title: 'Oops...',
                children: '<p>Something went wrong!</p>',
            });
        }
    };    
        checkNumberOfNotifications();
        checkMod();
        fetchData();
    }, [API_URL, numberOfEvents]);


    const handleAddressChange = async (newAddress) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/user/profile/address`, {
                address: newAddress
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });
            if (response.status === 200)
            {setAddress(newAddress);}
        } catch (err) {
            alert('Error updating address. Please try again later.');
        }
    };
   
    const handleNameChange = async (newName) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/user/profile/name`, {
                name: newName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });
            if (response.status === 200)
            {setName(newName);}
        } catch (err) {
            alert('Error updating name. Please try again later.');
        }
    };
    
    const handleEmailChange = async (newEmail) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/user/profile/email`, {
                email: newEmail
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });
            if (response.status === 200)
            {setEmail(newEmail);}
        } catch (err) {
            alert('Error updating email. Please try again later.');
        }
    };
    
    const handleDobChange = async (newDob) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/user/profile/dob`, {
                dob: newDob
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });
            if (response.status === 200)
            {setDob(newDob);}
        } catch (err) {
            alert('Error updating Date of Birth. Please try again later.');
        }
    };
    
    const handlePasswordChange = async (newPassword) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/user/profile/password`, {
                password: newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });
            if (response.status === 200)
            {setPassword("Password Changed");}
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                alert(error.response.data.message);
              }
        }
    };
    
    const handleDescChange = async (newDesc) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/user/profile/description`, {
                description: newDesc
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });
            if (response.status === 200)
            {setDesc(newDesc);}
        } catch (err) {
            alert('Error updating Description. Please try again later.');
        }
    };


    //event details

    var [eName, setEName] = useState('');
    const [eStartDate, setEStartDate] = useState('');
    const [eEndDate, setEEndDate] = useState('');
    const [eRegStart, setERegStart] = useState('');
    const [eRegEnd, setERegEnd] = useState('');
    const [eLocation, setELocation] = useState('');
    const [eParticipantsMax, setEParticipantsMax] = useState(0);
    const [eParticipants, setEParticipants] = useState(0);
    const [ePrice, setEPrice] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [description, setDescription] = useState('');
    const [eventId, setEventId] = useState(0);
    const [eTeamsMax, setTeamMax] = useState(0);
    const [isTeamEvent, setIsTeamEvent] = useState(false);
    const [isAbstractRequired, setIsAbstractRequired] = useState(false);
    const [selectedEventType, setSelectedEventType] = useState('');

    //event details ends here

    return (
        <Body>
            <Header
              address={address}
              setAddress={handleAddressChange}
              name={name}
              setName={handleNameChange}
              email={email}
              setEmail={handleEmailChange}
              dob={dob}
              setDob={handleDobChange}
              password={password}
              setPassword={handlePasswordChange}
              desc={desc}
              setDesc={handleDescChange}
          />
            <Container>
              <LeftContainer 
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
                eventId={eventId}
                isMod={isMod}
                eTeamsMax={eTeamsMax}
                isTeamEvent={isTeamEvent}
                isAbstractRequired={isAbstractRequired}
                notificationCount={notificationCount}
                selectedEventType={selectedEventType}
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
                setEventId={setEventId}
                setIsMod={setIsMod}
                setNotificationCount={setNotificationCount}
                setTeamMax={setTeamMax}
                setIsTeamEvent={setIsTeamEvent}
                setIsAbstractRequired={setIsAbstractRequired}
                setSelectedEventType={setSelectedEventType}
                email={email}
                username={name}
              />
              <MiddleContainer name={name} desc={desc} eProfile={eProfile} setEProfile={setEProfile} userLeague={userLeague} badgeImages={badgeImages}/>
              <RightContainer address={address} dob={dob} email={email} eventsAttended={numberOfEvents}/>
            </Container>
        </Body>
    );
}

export default UserProfile;