import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

import { SweetAlert } from '../components/SweetAlert';
import CustomComponent from './components/customComponent';

const MainContainer = styled.div`
    overflow: hidden;
`;

const A4SheetContainer = styled.div`
display:flex;
  position: fixed;
  min-height: 600px;
  min-width: 900px;
  border: 1px dashed black;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

const A4Sheet = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 600px;
    min-width: 900px;
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
    margin-top: 5vh;
    margin-bottom: 5vh;
    align-items: center;
    text-align: center;
    float: right;
    margin-right: 5vw;
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

  const API_URL = process.env.REACT_APP_API_URL;

  const { id } = useParams();

  const [background, setBackground] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isCertificateGenerated, setIsCertificateGenerated] = useState(false);
  const [xCoordinate, setxCoordinate] = useState(0);
  const [yCoordinate, setyCoordinate] = useState(0);

  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('24');
  const [fontColor, setFontColor] = useState('#000000');

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

    const onDrop = (acceptedFiles) => {
      if(isCertificateGenerated){
        setIsCertificateGenerated(false);
      }
        const image = acceptedFiles[0];
        setBackgroundImage(image);
        const reader = new FileReader();

        reader.onload = (e) => {
            setBackground(e.target.result);
        }

        reader.readAsDataURL(image);
    };
  useEffect(() => {
    document.title = "Certificate | HAXGUZ";;
  });

    const onGenerateClick = async () => {
      try {
          const formData = new FormData();
          formData.append('background', backgroundImage);
          formData.append('eventId', id);
          formData.append('xCoordinate', xCoordinate);
          formData.append('yCoordinate', yCoordinate);
          formData.append('fontFamily', fontFamily);
          formData.append('fontSize', fontSize);
          formData.append('fontColor', fontColor);

          const response = await axios.post(`${API_URL}/certificate/create`,
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${Cookies.get("authToken")}`,
                      'Bypass-Tunnel-Reminder': 'eventaz',
                  },
              });

          if (response.status === 201) {
              await SweetAlert({
                  title: "Success",
                  children: "Certificate Generated Successfully",
                  icon: "success",
              });
              setIsCertificateGenerated(true);
          }

      }
      catch (error) {
          if (error.response.status === 400) {
              await SweetAlert({
                  title: "Error",
                  children: "Please Choose a Background Image",
                  icon: "error",
              })
          }
          else {
              console.log(error);
          }
      }
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
        <CustomComponent text="Name of The Participant" xCoordinate={xCoordinate} yCoordinate={yCoordinate} setxCoordinate={setxCoordinate} setyCoordinate={setyCoordinate} fontColor={fontColor} fontFamily={fontFamily} fontSize={fontSize} handleFontColorChange={handleFontColorChange} handleFontFamilyChange={handleFontFamilyChange} handleFontSizeChange={handleFontSizeChange}/>
        <button onClick={onGenerateClick}>Generate</button>
      </ComponentArea>

    </MainContainer>
  );
};

export default CertificateGenerator;
