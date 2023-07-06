import { LeftContainer } from './components/LeftContainer'
import { RightContainer } from './components/RightContainer'
import { MiddleContainer } from './components/MiddleContainer'
import { Header } from './components/Header'

import React, { useState } from 'react';
import styled from 'styled-components'

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

const OrganisationProfile = () => {

    const [address, setAddress] = useState('Update Your Address Here');
    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };

    const [name, setName] = useState('Update Your Name Here');
    const handleNameChange = (newName) => {
    setName(newName);
    };

    const [email, setEmail] = useState('Update Your Email Here');
    const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
    };

    const [dob, setDob] = useState('Update Your Date of Birth Here');
    const handleDobChange = (newDob) => {
    setDob(newDob);
    };

    const [password, setPassword] = useState('Update Your Password Here');
    const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    };

    const [desc, setDesc] = useState('Update Your Description Here');
    const handleDescChange = (newDesc) => {
    setDesc(newDesc);
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
    const [authUserCount, setAuthUserCount] = useState('0');
    const [eventsOrganised, setEventsOrganised] = useState('0');

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
              <RightContainer address={address} authUserCount={authUserCount} eventsOrganised={eventsOrganised} email={email}/>
            </Container>
        </Body>
    );
}

export default OrganisationProfile;