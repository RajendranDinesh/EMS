import React from "react";
import styled from "styled-components";

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

const QRCode = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    width: 180px;
    background-color: black;
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


const QRCodeContainer = () => {
    return (<QRCodeContain>
        <QRCode>

        </QRCode>

        <QRCodeTextContainer>
            <QRCodeText>Ticket Code</QRCodeText>
            <QRCodeText style={{"fontWeight":"none"}}>#280404</QRCodeText>
        </QRCodeTextContainer>
    </QRCodeContain>)
};

export { QRCodeContainer };