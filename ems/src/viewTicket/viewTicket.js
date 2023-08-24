import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { SweetAlert } from "../components/SweetAlert";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

const DownloadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    width: 10vw;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #571278;
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    margin: 1vh 0 1vh 0;
    cursor: pointer;
`;

const ViewTicket = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [background, setBackground] = useState(null);
    const [qrValue, setQrValue] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eLocation, setEventLocation] = useState("");
    const [logoURL, setLogoURL] = useState("");

    const { id } = useParams();

    const ticketRef = useRef();

    const handleDownloadClick = () => {
        const input = ticketRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'o4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            console.log(pdfHeight)
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('ticket.pdf');
        })
    }

    useEffect(() => {

        const onLoad = async () => {
            try {
                const response = await axios.get(`${API_URL}/ticket/user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("authToken")}`,
                            'Bypass-Tunnel-Reminder': 'eventaz',
                        },
                    });
                setQrValue(response.data.qrContent);
                setBackground(response.data.backgroundImageUrl);
                setEventName(response.data.eventName);
                setEventStartDate(response.data.startDate);
                setEventEndDate(response.data.endDate);
                setEventLocation(response.data.elocation);
                setLogoURL(response.data.logoURL);
            }
            catch (error) {
                console.log(error);
                if (error.response.status === 403) {
                    await SweetAlert({
                        title: "Error",
                        children: "Login and try again",
                        icon: "error",
                    })
    
                    window.location.href = "/login";
                }
            }
        };

        onLoad();
    }, [API_URL, id]);

    return (
        <>

            <Container>
                <h1>View Your Ticket</h1>
                <TicketContainer ref={ticketRef}>
                    <Ticket background={background}>
                        <DetailsContainer eventName={eventName} startDate={eventStartDate} endDate={eventEndDate} eLocation={eLocation} logoURL={logoURL}/>
                        <QRCodeContainer qrValue={qrValue} />
                    </Ticket>
                </TicketContainer>
                <DownloadButton onClick={handleDownloadClick}>Download</DownloadButton>
            </Container>

        </>
    );
};

export default ViewTicket;