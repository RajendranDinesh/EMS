import React from "react";
import styled from "styled-components";

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

const LogoContainer = ({logoURL}) => {

    return (

        <TicketLogoContainer>
                    <TicketLogo>
                        <img src={logoURL} height={"100px"} width={"100px"} alt=""/>
                    </TicketLogo>
        </TicketLogoContainer>

    )
};

export { LogoContainer };