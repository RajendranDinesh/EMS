import React from 'react';
import styled from 'styled-components';

import CustomComponent from './components/customComponent';

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const A4Sheet = styled.div`
    display: flex;
    flex-direction: row;
    height: 90vh;
    width: 35vw;
    border: 1px solid black;
    position: relative;
    margin-top: 5vh;
    margin-bottom: 5vh;
`;

const ComponentArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
    width: 20vw;
    border: 1px solid black;
    margin-top: 5vh;
    margin-bottom: 5vh;
    padding: 1rem;
`;

const CertificateGenerator = () => {
  const handleDragStop = (event, draggableData) => {
    // Handle drag stop event for the draggable components
    // You can update the state to track the position of the component or perform any necessary logic
    console.log('Drag stopped:', draggableData);
  };

  return (
    <MainContainer>

      <A4Sheet>
        {/* Render your A4 sheet background image here */}

      </A4Sheet>

      <ComponentArea>
        <h2>Draggable Component Area</h2>
        <CustomComponent text="BIT Prayukti" />
        <CustomComponent text="BIT" />
      </ComponentArea>

    </MainContainer>
  );
};

export default CertificateGenerator;
