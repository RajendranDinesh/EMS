import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { QRCodeContainer } from "./components/QRCodeContainer";
import { DetailsContainer } from "./components/DetailsContainer";

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

const ViewTicket = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [background, setBackground] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [qrValue, setQrValue] = useState("");

    const { id } = useParams();

    const onGenerateClick = async () => {
        try {
            const response = await axios.get(`${API_URL}/ticket/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("authToken")}`,
                        'Bypass-Tunnel-Reminder': 'eventaz',
                    },
                });
            setQrValue(response.data.qrContent);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <Container>
                <h1>View Your Ticket</h1>
                <TicketContainer>
                    <Ticket background={background}>
                        <DetailsContainer />
                        <QRCodeContainer qrValue={qrValue}/>
                    </Ticket>
                </TicketContainer>
            </Container>

        </>
    );
};

export default ViewTicket;