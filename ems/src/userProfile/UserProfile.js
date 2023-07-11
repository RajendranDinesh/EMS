import { LeftContainer } from './components/LeftContainer'
import { RightContainer } from './components/RightContainer'
import { MiddleContainer } from './components/MiddleContainer'
import { Header } from './components/Header'
import UserDefault from "./components/icons/user_default.png";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';

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

const UserProfile = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [address, setAddress] = useState('Update Your Address Here');
    const [desc, setDesc] = useState('Update Your Description Here');
    const [password, setPassword] = useState('Update Your Password Here');
    const [dob, setDob] = useState('Update Your Date of Birth Here');
    const [email, setEmail] = useState('Update Your Email Here');
    const [name, setName] = useState('Update Your Name Here');
    const [eProfile, setEProfile] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    window.location.href = '/login';
                    return;
                };

                const response = await axios.get(`${API_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
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
        fetchData();
    }, [API_URL]);


    const handleAddressChange = async (newAddress) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/user/profile/address`, {
                address: newAddress
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
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
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/user/profile/name`, {
                name: newName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
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
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/user/profile/email`, {
                email: newEmail
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
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
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/user/profile/dob`, {
                dob: newDob
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
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
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/user/profile/password`, {
                password: newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
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
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/user/profile/description`, {
                description: newDesc
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200)
            {setDesc(newDesc);}
        } catch (err) {
            alert('Error updating Description. Please try again later.');
        }
    };


    //event details

    var [eName, setEName] = useState('BIT Prayukt');
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
    const [eventId, setEventId] = useState(0);

    // const handleEDescChange = async (newDesc, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/event/${eventId}/description`, {
    //             description: newDesc
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setDescription(newDesc);}
    //     } catch (err) {
    //         alert('Error updating Description. Please try again later.');
    //     }
    // };

    // const handleESetEStartDate = async (newEStartDate, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/startdate`, {
    //             eStartDate: newEStartDate
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setEStartDate(newEStartDate);}
    //     } catch (err) {
    //         alert('Error updating Event Starting Date. Please try again later.');
    //     }
    // };

    // const handleESetEEndDate = async (newEEndDate, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/enddate`, {
    //             eEndDate: newEEndDate
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setEEndDate(newEEndDate);}
    //     } catch (err) {
    //         alert('Error updating Event Ending Date. Please try again later.');
    //     }
    // };

    // const handleESetERegStart = async (newERegStart, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/regstart`, {
    //             eRegStart: newERegStart
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setERegStart(newERegStart);}
    //     } catch (err) {
    //         alert('Error updating Registration Starting Date. Please try again later.');
    //     }
    // };

    // const handleESetERegEnd = async (newERegEnd, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/regend`, {
    //             eRegEnd: newERegEnd
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setERegEnd(newERegEnd);}
    //     } catch (err) {
    //         alert('Error updating Registration Ending Date. Please try again later.');
    //     }
    // };

    // const handleESetELocation = async (newELocation, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/location`, {
    //             eLocation: newELocation
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setELocation(newELocation);}
    //     } catch (err) {
    //         alert('Error updating Location. Please try again later.');
    //     }
    // };

    // const handleESetEParticipantsMax = async (newEParticipantsMax, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/participantsmax`, {
    //             eParticipantsMax: newEParticipantsMax
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setEParticipantsMax(newEParticipantsMax);}
    //     } catch (err) {
    //         alert('Error updating Maximum Participants. Please try again later.');
    //     }
    // };

    // const handleESetEParticipants = async (newEParticipants, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/participants`, {
    //             eParticipants: newEParticipants
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setEParticipants(newEParticipants);}
    //     } catch (err) {
    //         alert('Error updating Participants. Please try again later.');
    //     }
    // };

    // const handleESetEPrice = async (newEPrice, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/price`, {
    //             ePrice: newEPrice
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setEPrice(newEPrice);}
    //     } catch (err) {
    //         alert('Error updating Price. Please try again later.');
    //     }
    // };

    // const handleESetEName = async (newEName, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/name`, {
    //             eName: newEName
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setEName(newEName);}
    //     } catch (err) {
    //         alert('Error updating Event Name. Please try again later.');
    //     }
    // };

    // const handleESetEOrganisation = async (newEOrganisation, eventId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.put(`${API_URL}/user/event/${eventId}/organisation`, {
    //             organisation: newEOrganisation
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 200)
    //         {setOrganisation(newEOrganisation);}
    //     } catch (err) {
    //         alert('Error updating Organisation. Please try again later.');
    //     }
    // };

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
                // setDescription={handleEDescChange}
                // setEStartDate={handleESetEStartDate}
                // setEEndDate={handleESetEEndDate}
                // setELocation={handleESetELocation}
                // setEParticipants={handleESetEParticipants}
                // setEPrice={handleESetEPrice}
                // setEParticipantsMax={handleESetEParticipantsMax}
                // setERegEnd={handleESetERegEnd}
                // setERegStart={handleESetERegStart}
                // setEName={handleESetEName}
                // setOrganisation={handleESetEOrganisation}
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
              <RightContainer address={address} dob={dob} email={email}/>
            </Container>
        </Body>
    );
}

export default UserProfile;