import { LeftContainer } from './components/LeftContainer'
import { RightContainer } from './components/RightContainer'
import { MiddleContainer } from './components/MiddleContainer'
import { Header } from './components/Header'

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
    margin-top: 20px;
    width: 70vw;
`

const UserProfile = () => {

    const [address, setAddress] = useState('Update Your Address Here');
    const [desc, setDesc] = useState('Update Your Description Here');
    const [password, setPassword] = useState('Update Your Password Here');
    const [dob, setDob] = useState('Update Your Date of Birth Here');
    const [email, setEmail] = useState('Update Your Email Here');
    const [name, setName] = useState('Update Your Name Here');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const response = await axios.get('http://localhost:5000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setName(response.data.user.fname);
                setEmail(response.data.user.email);
                setDob(response.data.user.dateOfBirth);
                setDesc(response.data.user.desc);
                setAddress(response.data.user.address);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


    const handleAddressChange = async (newAddress) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/user/profile/address', {
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
            const response = await axios.put('http://localhost:5000/user/profile/name', {
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
            const response = await axios.put('http://localhost:5000/user/profile/email', {
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
            const response = await axios.put('http://localhost:5000/user/profile/dob', {
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
            const response = await axios.put('http://localhost:5000/user/profile/password', {
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
            const response = await axios.put('http://localhost:5000/user/profile/description', {
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
              />
              <MiddleContainer name={name} desc={desc} />
              <RightContainer address={address} dob={dob} email={email}/>
            </Container>
        </Body>
    );
}

export default UserProfile;