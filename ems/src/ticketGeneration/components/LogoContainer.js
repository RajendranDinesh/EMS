import React, {useState} from "react";
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

const TicketLogoDrop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed black;
    border-radius: 5px;
    border-color: #571278;
    height: 100px;
    width: 100px;
`;

const LogoContainer = () => {

    const [logo, setLogo] = useState(null);

    const handleFileDrop = (acceptedFiles) => {
        setLogo(acceptedFiles[0]);
    };

    return (

        <TicketLogoContainer>
                    <TicketLogo>
                        <img src="" height={"100px"} width={"100px"} alt=""/>
                    </TicketLogo>
        </TicketLogoContainer>
        
    )
};

export { LogoContainer };