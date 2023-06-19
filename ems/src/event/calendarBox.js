import styled from "styled-components";
import Navbar from "./nav.js";
import React from "react";

const BoxContainer = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 25%;
background-color: #010001;
padding: 20px;
padding-right: 10px;`

const TopBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 10%;
`

export function CalendarBox() {
    return (

        <BoxContainer>
            <TopBox>
                <Navbar />
            </TopBox>
        </BoxContainer>
    );
}