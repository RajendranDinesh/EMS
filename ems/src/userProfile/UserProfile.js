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

const UserProfile = () => {

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
              <LeftContainer />
              <MiddleContainer name={name} desc={desc} />
              <RightContainer address={address} dob={dob} email={email}/>
            </Container>
        </Body>
    );
}

export default UserProfile;