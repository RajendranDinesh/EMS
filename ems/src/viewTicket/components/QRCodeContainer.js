import React from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";

const QRCodeContain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 48vh;
    width: 18vw;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
`;

const QRCodeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    width: 180px;
`;

const QRCodeTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 180px;
`;

const QRCodeText = styled.a`
    font-size: 16px;
    font-weight: 600;
    color: black;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
`;


const QRCodeContainer = ({
    qrValue
}) => {
    return (<QRCodeContain>
        <QRCodeBox>
            <QRCode value={qrValue} size={180} />
        </QRCodeBox>

        <QRCodeTextContainer>
            <QRCodeText>Ticket Code</QRCodeText>
            <QRCodeText style={{ "fontWeight": "none" }}>#{qrValue}</QRCodeText>
        </QRCodeTextContainer>
    </QRCodeContain>)
};

export { QRCodeContainer };