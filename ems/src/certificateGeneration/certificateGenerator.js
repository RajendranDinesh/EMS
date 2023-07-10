import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

import CustomComponent from './components/customComponent';

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    overflow: hidden;
`;

const A4SheetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 89vh;
  width: 70vw;
  border: 1px dashed black;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

const A4Sheet = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 87vh;
    width: 69vw;
    border: 1px solid black;
    position: relative;
    background-color: #ffffff;
    background-image: url(${props => props.background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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
`;

const BackGround = styled.button`
    display: flex;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #efefef;
    margin: 1em;
    font-size: 0.9em;
    font-weight: bold;
    height: 2em;
    cursor: pointer;
`;

const CertificateGenerator = () => {

  const [background, setBackground] = useState(null);

    const onDrop = (acceptedFiles) => {
        const image = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setBackground(e.target.result);
        }

        reader.readAsDataURL(image);
    };

  return (
    <MainContainer>

      <A4SheetContainer>
        <A4Sheet background={background}>
        
          {background? (null) : (
          <BackGround>
            <Dropzone onDrop={onDrop} multiple={false}>
              {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                      <input {...getInputProps()} accept="image/*"></input>
                      <>Change Background</>
                  </div>)}
            </Dropzone>
          </BackGround>)}
        
        </A4Sheet>
      </A4SheetContainer>

      <ComponentArea>
        <h2>Draggable Component Area</h2>
        <CustomComponent text="Name of The Participant" />
      </ComponentArea>

    </MainContainer>
  );
};

export default CertificateGenerator;
