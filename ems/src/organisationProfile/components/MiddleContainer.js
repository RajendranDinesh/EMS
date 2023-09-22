import styled from "styled-components";
import axios from "axios";
import Dropzone from 'react-dropzone';
import Cookies from "js-cookie";

import Pencil from "./icons/pencil.png";

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    width: 23vw;
    height: 50vh;
    border-radius: 10px;
    color: #efefef;
    font-family: monospace;
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
    font-size: 1.3em;
`;

const Text = styled.a`
    font-size: 1.8em;
    font-weight: 600;
    text-align: center;
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

const MiddleContainer = ({name, desc, eProfile, setEProfile}) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const handleFileDrop = async (files) => {
        try {
            const token = Cookies.get('authToken');
            const formData = new FormData();
            formData.append('profilePicture', files[0]);
        
            const response = await axios.put(
              `${API_URL}/organisation/profile/picture`,
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
              setEProfile(profilePicture);
            }
          } catch (err) {
              console.log(err);
              alert('Error updating profile picture. Please try again later.');
          }
    };

    return (
        <TopContainer>
            <ImageContainer>
                <img width="150px" height="150px" style={{"borderRadius":"100%", "border":"5px solid #50597b"}} alt="BIT" src={eProfile} />
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
            </NameContainer>

            <DescriptionContainer>
                {desc}
            </DescriptionContainer>

        </TopContainer>
    );
};

export { MiddleContainer };