import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from 'react-quill';
import Dropzone from "react-dropzone";
import 'react-quill/dist/quill.snow.css';

import { Modal } from "../../userProfile/components/Modal";
import EditableTextField from "../../userProfile/components/EditableText";

import Edit from './icons/edit.png';
import Tick from './icons/tick.png';
import Pencil from '../../userProfile/components/icons/pencil.png';

const Body = styled.div`
    background-color: #1f253d;
    height: 25vh;
    max-width: 100vw;
    display: flex;
    padding: 0 2.5vw;
    align-items: center;
`;

const Left = styled.div`
    background-color: #1f253d;
    display: flex;
    margin-right: 5vw;
`;

const HeaderText = styled.a`
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
    text-decoration: none;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: #f1f1f1;
    }
`;

const LocationText = styled.a`
    color: #efefef;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    margin: 0;
    padding-left: 10vw;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    letter-spacing: 0.1rem;

    &:hover {
        color: #f1f1f1;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ActionButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: auto;
    height: 100%;
`;

const ActionButton = styled.button`
    background-color: #fff;
    color: #1f253d;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    height: 60px;
    width: 120px;

    &:hover {
        background-color: #11a8ab;
        color: #fff;
    }
`;

const ActionButtonText = styled.a`
    color: inherit;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: all 0.1s ease-in-out;
`;

const TopContainer = styled.div`
    color: #efefef;
    overflow-y: scroll;
    &::-webkit-scrollbar{display: none};
`

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
`;

const Box = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 10px;
    width: 265px;
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const EditContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
    color: #efefef;
`;

const DateText = styled.div`
    font-size: 20px;
    margin-top: 10px;
    font-family: 'Montserrat', sans-serif;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const EditIcon = styled.div`
    margin-left: 0.5rem;
    cursor: pointer;
    
    img{
    width: 25px;
    height: 25px;
    }
`;

const UploadImage = styled.div`
    position: absolute;
    margin-top: 0px;
    margin-left: 132px;
    border-radius: 100%;
    border: 2.5px solid #efefef;
    padding: 2.5px;
    cursor: pointer;
    z-index: 0;

    &:hover {
        border: 2.5px solid #50597b;
    }
    
`;

const Header = ({
    eName,
    organisation,
    eStartDate,
    eEndDate,
    eRegStart,
    eRegEnd,
    eLocation,
    eParticipants,
    eParticipantsMax,
    ePrice,
    description,
    setEEndDate,
    setELocation,
    setEName,
    setEParticipants,
    setEParticipantsMax,
    setEPrice,
    setERegEnd,
    setERegStart,
    setEStartDate,
    setOrganisation,
    setDescription,
}) => {

    const [isEventEditOpen, setIsEventEditOpen] = useState(false);

    const handleOpenEventEditModal = () => {
        setIsEventEditOpen(true);
    };

    const handleCloseEventEditModal = () => {
        setIsEventEditOpen(false);
    };

    const handleENameChange = (newName) => {
        setEName(newName);
        };
    
    const handleStartDateChange = (newDate) => {
    setEStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setEEndDate(newDate);
        };

    const handleRegStartChange = (newRegStart) => {
    setERegStart(newRegStart);
    };

    const handleRegEndChange = (newRegEnd) => {
    setERegEnd(newRegEnd);
    };

    const handleLocationChange = (newLocation) => {
    setELocation(newLocation);
    };

    const handleParticipantsMaxChange = (newParticipantsMax) => {
    setEParticipantsMax(newParticipantsMax);
    };

    const handleParticipantsChange = (newParticipants) => {
    setEParticipants(newParticipants);
    };

    const handlePriceChange = (newPrice) => {
    setEPrice(newPrice);
    };

    const handleOrganisationChange = (newOrganisation) => {
    setOrganisation(newOrganisation);
    };

    const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);

    const handleOpenDescriptionEdit = () => {
        setIsDescriptionEditOpen(true);
    };

    const handleCloseDescriptionEdit = () => {
        setIsDescriptionEditOpen(false);
    };

    const handleFileDrop = (files) => { 
        console.log(files);
    };

    return (
        <>
            <Body>
                <Left>
                    <img src="https://pbs.twimg.com/profile_images/903154868478590976/mmrzduot_400x400.jpg" alt="logo" height="150px" width="150px" style={{"borderRadius":"100%"}}/>
                    <UploadImage>
                        <Dropzone onDrop={handleFileDrop} multiple={false}>
                            {
                                ({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} accept="image/*"></input>
                                    <img style={{"paddingTop":"2.5px"}} width="24px" height="20px" src={Pencil} alt=""></img>
                                </div>
                                )
                            }
                        </Dropzone>
                    </UploadImage>
                </Left>
                
                <TextContainer>
                    <HeaderText href={() => false}>{eName}</HeaderText>
                    <LocationText href={() => false}>By {organisation}</LocationText>
                </TextContainer>

                <DateContainer>
                    <DateText>Registration</DateText>
                    <DateText>Start Date: {eRegStart}</DateText>
                    <DateText>End Date: {eRegEnd}</DateText>
                </DateContainer>

                <ActionButtons>
                    <ActionButton onClick={handleOpenEventEditModal}><ActionButtonText>Edit</ActionButtonText></ActionButton>
                    <ActionButton><ActionButtonText>Share</ActionButtonText></ActionButton>
                </ActionButtons>
            </Body>

            <Modal isOpen={isEventEditOpen} onClose={handleCloseEventEditModal} modalHeight={"600px"} modalWidth={"700px"}>
            <>
                <EditContainer>
                    <a style={{"fontSize":"30px", "fontWeight":"600", "color":"#efefef"}} href={() => false}>Edit Details</a>
                </EditContainer>
                <TopContainer>

                    <BoxContainer>
                        <Box>
                            <Title>Name</Title>
                            <EditableTextField value={eName} onSave={handleENameChange}/>
                        </Box>

                        <Box style={{"width":"350px"}}>
                            <Title>Organisation</Title>
                            <EditableTextField value={organisation} onSave={handleOrganisationChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"350px"}}>
                            <Title>Location</Title>
                            <EditableTextField value={eLocation} onSave={handleLocationChange}/>
                        </Box>

                        <Box>
                            <Title>Price</Title>
                            <EditableTextField value={ePrice} onSave={handlePriceChange}/>
                        </Box>
                    </BoxContainer>
                    
                    <BoxContainer>
                        <Box>
                            <Title>Start Date</Title>
                            <EditableTextField value={eStartDate} onSave={handleStartDateChange}/>
                        </Box>
                        <Box style={{"width":"350px"}}>
                            <Title>End Date</Title>
                            <EditableTextField value={eEndDate} onSave={handleEndDateChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"350px"}}>
                            <Title>Registration Start Date</Title>
                            <EditableTextField value={eRegStart} onSave={handleRegStartChange}/>
                        </Box>
                        <Box>
                            <Title>Registration End Date</Title>
                            <EditableTextField value={eRegEnd} onSave={handleRegEndChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box>
                            <Title>Participants</Title>
                            <EditableTextField value={eParticipants} onSave={handleParticipantsChange}/>
                        </Box>
                        <Box style={{"width":"350px"}}>
                            <Title>Maximum Participants</Title>
                            <EditableTextField value={eParticipantsMax} onSave={handleParticipantsMaxChange}/>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"700px"}}>
                            <TitleContainer>
                                <Title style={{"marginBottom":"20px"}}>Description</Title>
                                {isDescriptionEditOpen ? 
                                (
                                <EditIcon onClick={handleCloseDescriptionEdit}>
                                    <img src={Tick} alt="edit" />
                                </EditIcon>
                                ) : (
                                <EditIcon onClick={handleOpenDescriptionEdit}>
                                    <img src={Edit} alt="edit" />
                                </EditIcon>
                                )
                                }
                            </TitleContainer>
                            {isDescriptionEditOpen ? (
                            <ReactQuill style={{"backgroundColor":"white", "color":"black", "border":"2px solid #000"}} theme="snow" value={description} onChange={setDescription}/>
                            ) : (
                                <div style={{"color":"#efefef"}} dangerouslySetInnerHTML={{ __html: description }} />
                            )}
                        </Box>
                    </BoxContainer>
                </TopContainer>
            </>
            </Modal>
        </>
    );
}

export default Header;