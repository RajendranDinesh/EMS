import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from 'react-quill';
import Dropzone from "react-dropzone";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Modal } from "../../userProfile/components/Modal";
import EditableTextField from "../../userProfile/components/EditableText";

import Edit from './icons/edit.png';
import Tick from './icons/tick.png';
import Pencil from '../../userProfile/components/icons/pencil.png';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


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
    margin-left: auto;
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

const DatePickerContainer = styled.div`
    margin-top: 1vh;
    background-color: #fffefe;
    border: #010101;
    border-radius: 5px;
    width: 200px;
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
    eProfile,
    isMod,
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
    setEProfile
}) => {

    const [isEventEditOpen, setIsEventEditOpen] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;
    const { id } = useParams();

    const handleOpenEventEditModal = () => {
        setIsEventEditOpen(true);
    };

    const handleCloseEventEditModal = () => {
        setIsEventEditOpen(false);
    };

    const handleENameChange = async (newName) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/name`, 
            {name: newName}, 
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz',}}
            );

            if (response.status === 200) {
                setEName(newName);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
        
        };
    
    const handleStartDateChange = async (newDate) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/startDate`,
            {startDate: newDate},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setEStartDate(newDate);
            }
        } catch (error) {
            alert("Error updating Event Start Date, Please try again later.")
        }
    };

    const handleEndDateChange = async (newDate) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/endDate`,
            {endDate: newDate},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setEEndDate(newDate);
            }
        } catch (error) {
            alert("Error updating Event End Date, Please try again later.")
        }
    };

    const handleRegStartChange = async (newRegStart) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/regStartDate`,
            {regStartDate: newRegStart},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setERegStart(newRegStart);
            }
        } catch (error) {
            alert("Error updating Event Registration Start Date, Please try again later.")
        }
    };

    const handleRegEndChange = async (newRegEnd) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/regEndDate`,
            {regEndDate: newRegEnd},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );
            
            if (response.status === 200) {
                setERegEnd(newRegEnd);
            }
        } catch (error) {
            alert("Error updating Event Registration End Date, Please try again later.")
        }
    };

    const handleLocationChange = async (newLocation) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/location`,
            {location: newLocation},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setELocation(newLocation);
            }
        } catch (error) {
            alert("Error updating Event Location, Please try again later.")
        }
    };

    const handleParticipantsMaxChange = async (newParticipantsMax) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/maxParticipants`,
            {max_participants: newParticipantsMax},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );
            
            if (response.status === 200) {
                setEParticipantsMax(newParticipantsMax);
            }
        } catch (error) {
            alert("Error updating Event Max Participants, Please try again later.")
        }
    };

    const handleParticipantsChange = async (newParticipants) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/participants`,
            {participants: newParticipants},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setEParticipants(newParticipants);
            }
        } catch (error) {
            alert("Error updating Event Participants, Please try again later.")
        }
    };

    const handlePriceChange = async (newPrice) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/price`,
            {price: newPrice},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setEPrice(newPrice);
            }
        } catch (error) {
            alert("Error updating Event Price, Please try again later.")
        }
    };

    const handleOrganisationChange = async (newOrganisation) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/organisation`,
            {organisation: newOrganisation},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setOrganisation(newOrganisation);
            }
        } catch (error) {
            alert("Error updating Event Organisation, Please try again later.")
        }
    };

    const handleDescriptionChange = async (newDescription) => {
        const token = Cookies.get('authToken');

        try {
            const response = await axios.put(`${API_URL}/event/${id}/description`,
            {description: newDescription},
            {headers: {Authorization: `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'eventaz'}}
            );

            if (response.status === 200) {
                setDescription(newDescription);
            }

        } catch (error) {
            alert("Error updating Event Description, Please try again later.")
        }
    };


    const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);

    const handleOpenDescriptionEdit = () => {
        setIsDescriptionEditOpen(true);
    };

    const handleCloseDescriptionEdit = () => {
        setIsDescriptionEditOpen(false);
    };

    const handleEventIconChange = async (acceptedFiles) => {
        try {
            const token = Cookies.get('authToken');
            const formData = new FormData();
            formData.append('eventIcon', acceptedFiles[0]);
            
            const response = await axios.put(
              `${API_URL}/event/${id}/icon`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                  'Bypass-Tunnel-Reminder': 'eventaz',
                },
              }
            );
        
            if (response.status === 200) {
              const profilePicture = response.data.url;
              toast.success("Image Uploaded Successfully")
              setEProfile(profilePicture);
            }
          } catch (err) {
              console.log(err);
              toast.error("An Error Occured while Uploading Image, Try Later")
          }
    };

    const handleFileDrop = (acceptedFiles) => { 
        handleEventIconChange(acceptedFiles);
    };

    return (
        <>
            <Body>
                <Left>
                    <img src={eProfile} alt="logo" height="150px" width="150px" style={{"borderRadius":"100%"}}/>
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
                    <DateText>Start Date: {dayjs(eRegStart).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</DateText>
                    <DateText>End Date: {dayjs(eRegEnd).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</DateText>
                </DateContainer>

                <ActionButtons>
                    {isMod? (<ActionButton onClick={handleOpenEventEditModal}><ActionButtonText href={() => false}>Edit</ActionButtonText></ActionButton>
                    ) : (<></>)}
                    <ActionButton><ActionButtonText href={() => false}>Share</ActionButtonText></ActionButton>
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
                            <a>{organisation}</a>
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePickerContainer>
                                    <DatePicker onChange={handleStartDateChange} timezone='Asia/Kolkata' value={dayjs(eStartDate)}/>
                                </DatePickerContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box style={{"width":"350px"}}>
                            <Title>End Date</Title>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePickerContainer>
                                    <DatePicker onChange={handleEndDateChange} className='custom-date-picker-header' timezone='Asia/Kolkata' value={dayjs(eEndDate)}/>
                                </DatePickerContainer>
                            </LocalizationProvider>
                        </Box>
                    </BoxContainer>

                    <BoxContainer>
                        <Box style={{"width":"350px"}}>
                            <Title>Registration Start Date</Title>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerContainer>
                                <DatePicker onChange={handleRegStartChange} className='custom-date-picker-header' timezone='Asia/Kolkata' value={dayjs(eRegStart)}/>
                            </DatePickerContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box>
                            <Title>Registration End Date</Title>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePickerContainer>
                                <DatePicker onChange={handleRegEndChange} className='custom-date-picker-header' timezone='Asia/Kolkata' value={dayjs(eRegEnd)}/>
                            </DatePickerContainer>
                            </LocalizationProvider>
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
                            <ReactQuill style={{"backgroundColor":"white", "color":"black", "border":"2px solid #000"}} theme="snow" value={description} onChange={handleDescriptionChange}/>
                            ) : (
                                <div style={{"color":"#efefef"}} dangerouslySetInnerHTML={{ __html: description }} />
                            )}
                        </Box>
                    </BoxContainer>
                </TopContainer>
            </>
            </Modal>
            <ToastContainer/>
        </>
    );
}

export default Header;