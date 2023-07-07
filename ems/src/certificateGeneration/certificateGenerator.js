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
    height: 89vh;
    width: 35vw;
    border: 1px solid black;
    position: relative;
    margin-top: 5vh;
    margin-bottom: 5vh;
`;

const ComponentArea = styled.div`
    display: flex;
    flex-direction: column;
    height: 89vh;
    width: 25vw;
    border: 1px solid black;
    position: relative;
    margin-top: 5vh;
    margin-bottom: 5vh;
    align-items: center;
    text-align: center;
    overflow-y: scroll;

    &::-webkit-scrollbar{width: 10px};
    &::-webkit-scrollbar-track{background: #f1f1f1};
    &::-webkit-scrollbar-thumb{background: #888};
    &::-webkit-scrollbar-thumb:hover{background: #555};
`;

const CertificateGenerator = () => {


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
