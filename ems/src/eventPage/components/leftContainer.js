import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Dropzone from "react-dropzone";

import Calendar from "./icons/calendar.png"
import Location from "./icons/location.png"
import User from "./icons/user.png"
import Rupee from "./icons/rupee.png"
import PdfUpload from "./icons/pdf_upload.png"
import Tick from "./icons/tick.png"

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Cookies from "js-cookie";
import { Modal } from "../../userProfile/components/Modal";
import { SweetAlert } from "../../components/SweetAlert";
dayjs.extend(utc);
dayjs.extend(timezone);

const Body = styled.div`
    height: 75vh;
    max-width: 30vw;
    display: flex;
    align-items: center;
`;

const Container = styled.div`
    height: 70vh;
    width: 25vw;
    border-radius: 10px;
    border: 2px solid gray;
    background-color: #efefef;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    &::-webkit-scrollbar{display: none};
`;

const ItemContainer = styled.div`
    height: 9vh;
    width: 15vw;
    background-color: #efefef;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    align-items: center;
`;

const Button = styled.button`
    background-color: #8739F9;
    color: #efefef;
    border: 2px solid #1f253d;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;

    height: 60px;
    width: 140px;

    &:hover {
        background-color: #C651CD;
        border: 2px solid #efefef;
    }
`;

const ButtonText = styled.a`
    color: inherit;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TextTitle = styled.a`
    font-size: 1.38em;
    font-family: 'Montserrat', sans-serif;
    color: black;
    text-decoration: none;
    margin-left: 10px;
`;

const TextItem = styled.a`
    font-size: 1em;
    font-family: 'Montserrat', sans-serif;
    color: black;
    text-decoration: none;
    margin-left: 10px;
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;
    &::-webkit-scrollbar{display: none};
    color: #efefef;
`;

const TeamInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    overflow-x: none;
    flex-wrap: wrap;
    margin-top: 2vh;
    margin-bottom: 4vh;

    border: 1px solid #efefef;
    border-radius: 10px;
`;

const MemberInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px
`;

const MemberName = styled.a`
    font-size: 2em;
`;

const MemberEmail = styled.a`
    font-size: 1.1em;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    flex-wrap: wrap;
`;

const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 50vh;
    width: 80%;

    border: 1px #efefef dashed;
`;

const UploadAbstractButton = styled.button`
        background-color: #8739F9;
        color: #efefef;
        border: 2px solid #1f253d;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        margin-bottom: 10px;

        height: 60px;
        width: 140px;

        &:hover {
            background-color: #C651CD;
            border: 2px solid #efefef;
        }

        display: flex;
        align-items: center;
        justify-content: center;
    `;

const AbstractContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    border: 1px solid #efefef;
    border-radius: 10px;

    width: 90%;
    padding: 20px;

    margin-top: 2vh;
    margin-bottom: 2vh;
`;

const TeamName = styled.a`
    font-size: 2em;
    margin-right: 20px;
`;

const AbstractButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 1vh;
`;

const ViewAbstractButton = styled.button`
    background-color: #8739F9;
    color: #efefef;
    border: 2px solid #1f253d;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;
    margin-right: 20px;

    height: 60px;
    width: 140px;

    &:hover {
        background-color: #C651CD;
        border: 2px solid #efefef;
    }

    display: flex;
    align-items: center;
    justify-content: center;
`;

const AcceptAbstractButton = styled.button`
    background-color: #4caf50;
    color: #efefef;
    border: 2px solid #1f253d;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;
    margin-right: 20px;

    height: 60px;
    width: 70px;

    &:hover {
        border: 2px solid #efefef;
    }

    display: flex;
    align-items: center;
    justify-content: center;
`;

const RejectAbstractButton = styled.button`
    background-color: #f44336;
    color: #efefef;
    border: 2px solid #1f253d;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;

    height: 60px;
    width: 70px;

    &:hover {
        border: 2px solid #efefef;
    }

    display: flex;
    align-items: center;
    justify-content: center;
`;

const LeftContainer = ({ eStartDate, eEndDate, eLocation, eParticipants, ePrice, eParticipantsMax, isMod, id, isRegistered, isTeamEvent, maxNumberOfTeams, isAbstractRequired, isAbstractSubmitted, isAbstractVerified }) => {

    const API_URL = process.env.REACT_APP_API_URL;
    const authToken = Cookies.get('authToken');

    const handleRedirectToTicket = () => {
        window.location.href = `/create-ticket/${id}`;
    }

    const handleUserRedirectToTicket = () => {
        window.location.href = `/view-ticket/${id}`;
    };

    const handleRedirectToCertificate = () => {
        window.location.href = `/create-certificate/${id}`;
    };

    const handleUserRedirectToCertificate = () => {
        window.location.href = `/view-certificate/${id}`;
    };

    const isEventOver = dayjs(eEndDate).isBefore(dayjs());

    const handlePayment = async () => {
        await axios.post(
            `${API_URL}/create-checkout-session-solo`,
            {
                eventId: id,
            },
            {
                headers: {
                    'Bypass-Tunnel-Reminder': 'eventaz',
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then((res) => {
                console.log(res);
                window.location.href = res.data.url;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleTeamPayment = async (teamName) => {
        await axios.post(
            `${API_URL}/create-checkout-session-team`,
            {
                eventId: id,
                teamName: teamName,
            },
            {
                headers: {
                    'Bypass-Tunnel-Reminder': 'eventaz',
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then((res) => {
                console.log(res);
                window.location.href = res.data.url;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isPaymentIntimidationOpen, setIsPaymentIntimidationOpen] = useState(false);
    const [isAbstractOpen, setIsAbstractOpen] = useState(false);
    const [isAbstractSubmitOpen, setIsAbstractSubmitOpen] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [totalMembers, setTotalMembers] = useState(0);

    const handleRegistrationOpen = async () => {
        try {
            const authToken = Cookies.get('authToken');
            const response = await axios.get(`${API_URL}/teams/user`, {
                headers: {
                Authorization: `Bearer ${authToken}`,
                'Bypass-Tunnel-Reminder': 'eventaz',
            }})

            setTeamData(response.data.teamObjects);
            setIsRegistrationOpen(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleChooseTeam = async (teamName) => {
    try {
        const response = await axios.get(`${API_URL}/teams/teaminfo/${teamName.teamName}/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Bypass-Tunnel-Reminder': 'eventaz',
                }})

        setTeamName(response.data.teamName);
        setTotalMembers(response.data.totalMembers);
        handlePaymentModalOpen(true);
    } catch (error) {
        
    }
    };

    const handlePaymentModalOpen = () => {
        setIsPaymentIntimidationOpen(true);
    };

    const handlePaymentModalClose = () => {
        setIsPaymentIntimidationOpen(false);
    };

    const handleRegistrationClose = () => {
        setIsRegistrationOpen(false);
    };

    const [abstractData, setAbstractData] = useState([]);
    const handleAbstractOpen = async () => {
        try {
            const response = await axios.get(`${API_URL}/event/abstract/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                    }})

            setAbstractData(response.data);
        }
        catch (error) {
            console.log(error);
        }
        setIsAbstractOpen(true);
    }

    const handleAbstractClose = () => {
        setIsAbstractOpen(false);
    }

    const handleSubmitAbstractOpen = () => {
        setIsAbstractSubmitOpen(true);
    }

    const [abstract, setAbstract] = useState(null);
    
    const handleFileDrop = async (acceptedFiles) => {
        console.log(acceptedFiles[0]);
        setAbstract(acceptedFiles[0]);
    };

    const handleAbstractUpload = async () => {  
        const formData = new FormData();
        formData.append('abstract', abstract);
        formData.append('eventId', id);
        
        try {
            const response = await axios.post(`${API_URL}/event/abstract`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                    'Content-Type': 'multipart/form-data',
                }});

            if (response.status === 200){
                await SweetAlert({
                    title: "Success",
                    children: "Abstract Uploaded Successfully",
                    icon: "success"
                });
                setAbstract(null);
                setIsAbstractSubmitOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitAbstractClose = () => {
        setIsAbstractSubmitOpen(false);
    }

    const handleAbstractViewOpen = async (abstractId) => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${authToken}`);

            const options = {
              method: 'GET',
              headers: headers,
            };
          
            const url = `${API_URL}/event/abstract/view/${abstractId}`;
          
            fetch(url, options)
              .then((response) => response.blob())
              .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'abstract.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
              })
              .catch((error) => console.error('Error downloading file:', error));
        } catch (error) {
            console.log(error);
        }
    };

    const handleAcceptAbstract = async (abstractId) => {
        try {

        } catch (error) {
            
        }
    };

    const handleDeclineAbstract = async (abstractId) => {
        try {
            
        } catch (error) {
            
        }
    };

    return (
        <>
        <Body>
            <Container>

                <ItemContainer>
                    <img src={Calendar} width={"30px"} height={"30px"} alt=""></img>
                    <TextContainer>
                        <TextTitle href={() => false}>Start Date</TextTitle>
                        <TextItem href={() => false}>{dayjs(eStartDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</TextItem>
                    </TextContainer>
                </ItemContainer>

                <ItemContainer>
                    <img src={Calendar} width={"30px"} height={"30px"} alt=""></img>
                    <TextContainer>
                        <TextTitle href={() => false}>End Date</TextTitle>
                        <TextItem href={() => false}>{dayjs(eEndDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</TextItem>
                    </TextContainer>
                </ItemContainer>

                <ItemContainer>
                    <img src={Location} width={"30px"} height={"30px"} alt=""></img>
                    <TextContainer>
                        <TextTitle href={() => false}>Location</TextTitle>
                        <TextItem href={() => false}>{eLocation}</TextItem>
                    </TextContainer>
                </ItemContainer>

                <ItemContainer>
                    <TextContainer>
                        <TextTitle href={() => false}> Team Event {isTeamEvent? <>Yes</>:<>No</>}</TextTitle>
                    </TextContainer>
                </ItemContainer>

                {isTeamEvent ? 
                    (<>
                    <ItemContainer>
                        <img src={User} width={"30px"} height={"30px"} alt=""></img>
                        <TextContainer>
                            <TextTitle href={() => false}> Maximum Registration Allowed</TextTitle>
                            <TextItem href={() => false}>{maxNumberOfTeams}</TextItem>
                        </TextContainer>
                    </ItemContainer>
                    <ItemContainer>
                        <img src={User} width={"30px"} height={"30px"} alt=""></img>
                        <TextContainer>
                            <TextTitle href={() => false}> Minimum Team Size</TextTitle>
                            <TextItem href={() => false}>{eParticipants}</TextItem>
                        </TextContainer>
                    </ItemContainer>
                    <ItemContainer>
                        <img src={User} width={"30px"} height={"30px"} alt=""></img>
                        <TextContainer>
                            <TextTitle href={() => false}> Maximum Team Size</TextTitle>
                            <TextItem href={() => false}>{eParticipantsMax}</TextItem>
                        </TextContainer>
                    </ItemContainer>
                    </>) :
                (<ItemContainer>
                    <img src={User} width={"30px"} height={"30px"} alt=""></img>
                    <TextContainer>
                        <TextTitle href={() => false}> Maximum Registration Allowed</TextTitle>
                        <TextItem href={() => false}>{eParticipantsMax}</TextItem>
                    </TextContainer>
                </ItemContainer>)}

                <ItemContainer>
                    <img src={Rupee} width={"30px"} height={"30px"} alt=""></img>
                    <TextContainer>
                        <TextTitle href={() => false}>Price</TextTitle>
                        <TextItem href={() => false}>₹{ePrice}</TextItem>
                    </TextContainer>
                </ItemContainer>

                    <ButtonContainer>
                {authToken ? (
                    <>{isMod ? (
                        <>
                        <Button onClick={handleRedirectToTicket}>
                            <ButtonText href={() => false}>Ticket</ButtonText>
                        </Button>
                        <Button onClick={handleRedirectToCertificate}>
                            <ButtonText href={() => false}>Certificate</ButtonText>
                        </Button>
                        {isAbstractRequired ? (<Button onClick={handleAbstractOpen}>
                            <ButtonText href={() => false}>View Abstracts</ButtonText>
                        </Button>) : (<>
                        </>)}
                        </>
                    ) : (
                        isRegistered ? (<>
                            <Button onClick={handleUserRedirectToTicket}>
                                <ButtonText href={() => false}>Your Ticket</ButtonText>
                            </Button>
                            {isEventOver ? (<>
                                <Button onClick={handleUserRedirectToCertificate}>
                                    <ButtonText href={() => false}>Your Certificate</ButtonText>
                                </Button>
                                </>) : (<></>)}
                        </>) : (
                            <>
                                {isAbstractRequired? (
                                    isAbstractSubmitted? (
                                <>
                                {isAbstractVerified? (<>
                                    Your Abstract is Verified, You can now register for the event.
                                    <Button onClick={handleRegistrationOpen}>
                                        <ButtonText href={() => false}>Register</ButtonText>
                                    </Button>
                                </>) : (<>
                                    Your Abstract is Submitted, Please wait for it to be verified.
                                </>)}
                                </>) : (
                                    <Button onClick={handleSubmitAbstractOpen}>
                                        <ButtonText href={() => false}>Submit Abstract</ButtonText>
                                    </Button>
                                )) : (
                                <Button onClick={handleRegistrationOpen}>
                                    <ButtonText href={() => false}>Register</ButtonText>
                                </Button>)}
                            </>)
                    )}</>) : (<></>)}
                    </ButtonContainer>
            </Container>
        </Body>

{/*Team Choosing*/}
        <Modal isOpen={isRegistrationOpen} onClose={handleRegistrationClose} modalHeight={"50vh"} modalWidth={"45vw"}>
            {isTeamEvent? (
            <ModalContainer>
                <a href={() => false}>Choose Your Team</a>
                {Object.keys(teamData).length !== 0 && teamData.map((team, index) => (
                    <TeamInfoContainer key={index}>
                        <MemberInfo style={{"border":"1px solid #efefef", "borderRadius":"10px", "marginTop":"10px", "marginBottom":"10px"}}>
                            <a href={() => false} style={{fontSize: "2em"}}>{team.teamName}</a>Created By
                            <MemberName>
                                {team.teamLead.name}
                            </MemberName>
                            <MemberEmail>
                                {team.teamLead.email}
                            </MemberEmail>
                        </MemberInfo>
                        
                        {team.teamMembers.map((member, index) => (
                        <MemberInfo key={index}>
                            <MemberName>
                                {member.name}
                            </MemberName> 
                            <MemberEmail>
                                {member.email}
                            </MemberEmail>
                        </MemberInfo>))}

                        <Button onClick={() => {handleChooseTeam({teamName: team.teamName})}}>
                            <ButtonText href={() => false}>Use This Team</ButtonText>
                        </Button>

                    </TeamInfoContainer>
                    ))}
            </ModalContainer>
            ) : (
            <>
                <a href={() => false}>Click On Pay Now.</a>
                <Button onClick={handlePayment}>
                    <ButtonText href={() => false}>Pay Now</ButtonText>
                </Button>
            </>)}
        </Modal>

{/*Payment Intimidation*/}
        <Modal isOpen={isPaymentIntimidationOpen} onClose={handlePaymentModalClose} modalHeight={"40vh"} modalWidth={"40vw"}>
            <ModalContainer>
                <a href={() => false}>Team Name: {teamName}</a>
                <a href={() => false}>Total Members: {totalMembers}</a>
                <a href={() => false}>Total Amount: ₹{totalMembers*ePrice}</a>
                <a href={() => false}>Click On Pay Now.</a>
                <Button onClick={() => handleTeamPayment(teamName)}>
                    <ButtonText href={() => false}>Pay Now</ButtonText>
                </Button>
            </ModalContainer>
        </Modal>

{/*Abstract View*/}
        <Modal isOpen={isAbstractOpen} onClose={handleAbstractClose}>
            <ModalContainer>
                <a href={() => false} style={{fontSize: "32px"}}>Abstracts</a>

                {abstractData.map((team, index) => (
                <AbstractContainer key={index}>
                    <TeamName href={() => false}>{team.teamName? team.teamName : team.name}</TeamName>
                    <AbstractButtonContainer>
                        <ViewAbstractButton onClick={() => handleAbstractViewOpen(team.abstractId)}><ButtonText href={() => false}>View Abstract</ButtonText></ViewAbstractButton>
                        {team.accepted? (<>
                        Abstract Was Accepted
                        </>) : (
                            team.declined? (<>
                            Abstract was Declined
                            </>) : (<>
                            <AcceptAbstractButton onClick={() => handleAcceptAbstract(team.abstractId)}><ButtonText href={() => false}><img height={"30px"} width={"30px"} src={Tick} alt="Tick"/></ButtonText></AcceptAbstractButton>
                        <RejectAbstractButton onClick={() => handleDeclineAbstract(team.abstractId)}><ButtonText href={() => false}>X</ButtonText></RejectAbstractButton>  
                            </>)
                        )}
                    </AbstractButtonContainer>
                </AbstractContainer>
                ))}
            </ModalContainer>
        </Modal>
        
{/*Abstract Submit*/}
        <Modal isOpen={isAbstractSubmitOpen} onClose={handleSubmitAbstractClose}>
            <ModalContainer>
                <a href={() => false} style={{fontSize: "32px"}}>Submit Abstract</a>
                <UploadContainer>
                    {abstract? (<>
                    <a>Name of The Document: {abstract.name}</a>
                    <a>Size: {Math.round(abstract.size/(1024*1024))} MB</a>
                    <UploadAbstractButton onClick={handleAbstractUpload}>
                        Upload
                    </UploadAbstractButton>
                    </>) : (<Dropzone onDrop={handleFileDrop} multiple={false}>
                        {
                            ({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} accept="application/pdf"></input>
                                <img style={{"paddingTop":"2.5px"}} width="100px" height="100px" src={PdfUpload} alt="Event"></img>
                            </div>
                            )
                        }
                    </Dropzone>)}
                </UploadContainer>
            </ModalContainer>
        </Modal>


        </>
    );
}

export default LeftContainer;