import React, {useState} from "react";
import styled from "styled-components";

import Dropzone from "react-dropzone";
import Add_Image from "./icons/add_image.png";

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
            <Dropzone onDrop={handleFileDrop} multiple={false}>
                {({getRootProps, getInputProps}) => (
                    <TicketLogo {...getRootProps()}>
                        {logo ? ( <><img src={URL.createObjectURL(logo)} height={"100px"} width={"100px"} alt=""/>
                        <input {...getInputProps()} accept="image/*"></input>
                        </>
                        ) : (
                            <>
                            <input {...getInputProps()} accept="image/*"></input>
                            <TicketLogoDrop/>
                            </>)
                            }
                        <img src={Add_Image} height={"35px"} width={"35px"} alt=""/>
                    </TicketLogo>
                )}
            </Dropzone>
        </TicketLogoContainer>
        
    )
};

export { LogoContainer };