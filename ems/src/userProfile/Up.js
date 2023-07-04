import { LeftContainer } from './components/LeftContainer'
import { RightContainer } from './components/RightContainer'
import { MiddleContainer } from './components/MiddleContainer'
import { Modal } from './components/Modal'
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
`

const Up = () => {

    const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

    return (
        <Body>
            <Header />
            <Container>
              <LeftContainer />
              <MiddleContainer />
              <RightContainer />
            </Container>
            {/* <div>
                <button onClick={handleOpenModal}>Open Modal</button>
                <Modal isOpen={isOpen} onClose={handleCloseModal}>
                </Modal>
            </div> */}
        </Body>
    );
}

export default Up;