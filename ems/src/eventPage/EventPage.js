import React from "react";
import styled from "styled-components";

import Header from "./components/header";
import LeftContainer from "./components/leftContainer";

const Body = styled.div`
    background-color: #efefef;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    background-image: url("https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg");
    height: 75vh;
    max-width: 100vw;
`;

const EventPage = () => {
    return (
        <Body>
            <Header/>
            <Container>
                <LeftContainer/>
            </Container>
        </Body>
    );
};

export default EventPage;