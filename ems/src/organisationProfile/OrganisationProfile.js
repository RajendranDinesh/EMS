import { LeftContainer } from './components/LeftContainer';
import { RightContainer } from './components/RightContainer';
import { MiddleContainer } from './components/MiddleContainer';
import { Header } from './components/Header';
import UserDefault from "./components/icons/user_default.png";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    margin-top: 20px;
    justify-content: center;
    width: 80vw;
`

const OrganisationProfile = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [address, setAddress] = useState('Update Your Address Here');
    const handleAddressChange = async (newAddress) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/organiser/profile/address`, {
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

    const [name, setName] = useState('Update Your Name Here');
    const handleNameChange = async (newName) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/organiser/profile/name`, {
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

    const [email, setEmail] = useState('Update Your Email Here');
    const handleEmailChange = async (newEmail) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/organiser/profile/email`, {
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

    const [dob, setDob] = useState('Update Your Date of Birth Here');
    const handleDobChange = async (newDob) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/organiser/profile/dob`, {
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

    const [password, setPassword] = useState('Update Your Password Here');
    const handlePasswordChange = async (newPassword) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/organiser/profile/password`, {
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

    const [desc, setDesc] = useState('Update Your Description Here');
    const handleDescChange = async (newDesc) => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.put(`${API_URL}/organiser/profile/description`, {
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

    const [eProfile, setEProfile] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('authToken');

                if (!token) {
                    window.location.href = '/login';
                    return;
                };

                const response = await axios.get(`${API_URL}/organisation/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Bypass-Tunnel-Reminder': 'eventaz',
                    }
                });

                document.title = `${response.data.user.fname} | EMS`;

                setName(response.data.user.fname);
                setEmail(response.data.user.email);
                setDob(response.data.user.dateOfBirth);
                setDesc(response.data.user.desc);
                setAddress(response.data.user.address);
                if (response.data.user.profilePicture === "") {
                    setEProfile(UserDefault);
                    return;
                }
                setEProfile(response.data.user.profilePicture);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    window.location.href = '/login';
                } else {
                    alert('Error fetching data. Please try again later.');
                };
            }
        }
        const getAuthUserCount = async () =>{
            const response = await axios.get(`${API_URL}/organisation/authUserCount`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('authToken')}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });

            if (response.status === 200){
                setAuthUserCount(response.data.authUserCount);
                //remove the below line after testing
                setEventsOrganised(0);
            }

            else{
                alert('Error fetching data. Please try again later.');
            }
        };

        getAuthUserCount();
        fetchData();
    }, [API_URL]);

    //event details

    const [eName, setEName] = useState('BIT Prayukti');
    const [eStartDate, setEStartDate] = useState('28/04/2024');
    const [eEndDate, setEEndDate] = useState('01/05/2024');
    const [eRegStart, setERegStart] = useState('01/01/2024');
    const [eRegEnd, setERegEnd] = useState('01/03/2024');
    const [eLocation, setELocation] = useState('Erode, TamilNadu');
    const [eParticipantsMax, setEParticipantsMax] = useState('500');
    const [eParticipants, setEParticipants] = useState('100');
    const [ePrice, setEPrice] = useState('1200');
    const [organisation, setOrganisation] = useState('Bannari Amman Institute Of Technology');
    const [description, setDescription] = useState('');
    const [authUserCount, setAuthUserCount] = useState('0');
    const [eventsOrganised, setEventsOrganised] = useState('0');
    const [eventId, setEventId] = useState(0);

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
              />
              <MiddleContainer name={name} desc={desc} eProfile={eProfile} setEProfile={setEProfile}/>
              <RightContainer address={address} authUserCount={authUserCount} eventsOrganised={eventsOrganised} email={email}/>
            </Container>
        </Body>
    );
}

export default OrganisationProfile;