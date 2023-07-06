import React, { useState } from "react";
import styled from "styled-components";

import { QRCodeContainer } from "./components/QRCodeContainer";
import { DetailsContainer } from "./components/DetailsContainer";

import Dropzone from "react-dropzone";

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

const TicketGenerator = () => {

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
        <>
        
        <Container>
            <h1>Ticket Generator</h1>
            <TicketContainer>
                <BackGround>
                    <Dropzone onDrop={onDrop} multiple={false}>
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
        </Container>

        </>
    );
};

export default TicketGenerator;