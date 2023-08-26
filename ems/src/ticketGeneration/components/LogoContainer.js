import React from "react";
import styled from "styled-components";

import logo from "../../components/styles/logo.png"

const TicketLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16vh;
    width: 13vw;
    margin: 1vh 0 1vh 0;
`;

const TicketLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 16vh;
    width: 13vw;
`;

const LogoContainer = () => {

    return (

        <TicketLogoContainer>
                    <TicketLogo>
                        <img src={logo} height={"100px"} width={"100px"} alt=""/>
                    </TicketLogo>
        </TicketLogoContainer>
        
    )
};

export { LogoContainer };