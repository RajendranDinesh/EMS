import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { QRCodeContainer } from "./components/QRCodeContainer";
import { DetailsContainer } from "./components/DetailsContainer";

import Dropzone from "react-dropzone";
import Cookies from "js-cookie";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100vh;
    width:100vw;
`;

const TicketContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:72vh;
    width: 82vw;
    border: 1px dashed black;
`;

const Ticket = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height:68vh;
    width: 80vw;
    border: 1px solid black;
    background-image: url(${props => props.background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const BackGround = styled.button`
    display: flex;
    position: absolute;
    top: 10em;
    left: 10em;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #efefef;
    margin: 1em;
    font-size: 0.9em;
    font-weight: bold;
    cursor: pointer;
`;

const GenerateButton = styled.button`
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid black;
    background-color: #efefef;
    margin: 1em;
    font-size: 0.9em;
    font-weight: bold;
    padding: 0.25em 1em;
`;

const TicketGenerator = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [background, setBackground] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const onBackgroundDrop = (acceptedFiles) => {
        const image = acceptedFiles[0];
        setBackgroundImage(image);
        const reader = new FileReader();

        reader.onload = (e) => {
            setBackground(e.target.result);
        }

        reader.readAsDataURL(image);
    };

    const onGenerateClick = async () => {
        try{
            const formData = new FormData();
            formData.append('background', backgroundImage);
            formData.append('eventId', "64ad2e1b679bb2adcdd2c0ad");

            const response = await axios.post(`${API_URL}/ticket/create`,
                formData,
                {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                },
            });

        console.log(response);
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        <>
        
        <Container>
            <h1>Ticket Generator</h1>
            <TicketContainer>
                <BackGround>
                    <Dropzone onDrop={onBackgroundDrop} multiple={false}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} accept="image/*"></input>
                        <>Change Background</>
                    </div>)}
                    </Dropzone>
                </BackGround>
                <Ticket background={background}>
                    <DetailsContainer/>
                    <QRCodeContainer/>
                </Ticket>
            </TicketContainer>
            <GenerateButton onClick={onGenerateClick}>Generate</GenerateButton>
        </Container>

        </>
    );
};

export default TicketGenerator;