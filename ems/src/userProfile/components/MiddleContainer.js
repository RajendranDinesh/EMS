import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

import Pencil from "./icons/pencil.png";
import Dropzone from 'react-dropzone';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    width: 23vw;
    height: 50vh;
    border-radius: 10px;
    color: #efefef;
`;

const ImageContainer = styled.div`
    display:flex;
    justify-content: center;
    margin-top: 50px;
`;

const NameContainer = styled.div`
    display:flex;
    justify-content: center;
    margin-top: 15px;
`;

const DescriptionContainer = styled.div`
    text-align: center;
    padding: 10px;

`;

const Text = styled.a`
    font-size: 25px;
    font-weight: 600;
`;

const UploadImage = styled.div`
    position: absolute;
    margin-top: 0px;
    margin-left: 120px;
    border-radius: 100%;
    border: 2.5px solid #efefef;
    padding: 2.5px;
    cursor: pointer;
    z-index: 0;

    &:hover {
        border: 2.5px solid #50597b;
    }    
`;

const Badge = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 10px;
`;

const LeagueHover = styled.div`
    position: absolute;
    box-sizing: border-box;
    z-index: 999;
    border: 1px solid black;
    padding: 10px;
    background: #1f253d;
    left: 52.5vw;
    max-width: 220px;
`;

const MiddleContainer = ({name, desc, eProfile, setEProfile, userLeague, badgeImages}) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [isLeagueVisible, setIsLeagueVisible] = useState(false);

    const handleProfilePicChange = async (acceptedFiles) => {
        try {
          const token = Cookies.get('authToken');
          const formData = new FormData();
          formData.append('profilePicture', acceptedFiles[0]);
          
          const response = await axios.put(
            `${API_URL}/user/profile/picture`,
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
        handleProfilePicChange(acceptedFiles);
    };

    const handleMouseOverLeague = () => {
        setIsLeagueVisible(true);
    }

    const handleMouseOutLeague = () => {
        setIsLeagueVisible(false);
    }

    const handleRedirectToLeague = () => {
        window.location = '/league'
    }

    return (
        <>
        <TopContainer>
            <ImageContainer>
                <img width="150px" height="150px" style={{"borderRadius":"100%", "border":"5px solid #50597b"}} alt={name} src={eProfile} />
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
            </ImageContainer>
            
            <NameContainer>
                <Text>{name}</Text>
                <Badge alt={userLeague.name} src={badgeImages[userLeague.name]} onMouseOver={handleMouseOverLeague} onMouseOut={handleMouseOutLeague} onClick={handleRedirectToLeague}/>
                {isLeagueVisible && <LeagueHover>You are in {userLeague.name} League, Click on the badge to View League Details</LeagueHover>}
            </NameContainer>

            <DescriptionContainer>
                {desc}
            </DescriptionContainer>

        </TopContainer>
        <ToastContainer/>
        </>
    );
};

export { MiddleContainer };