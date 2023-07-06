import styled from "styled-components";
import Pencil from "./icons/pencil.png";
import Dropzone from 'react-dropzone';

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    width: 300px;
    height: 400px;
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

const MiddleContainer = ({name, desc}) => {

    const handleFileDrop = (files) => {
        console.log(files);
    };

    return (
        <TopContainer>
            <ImageContainer>
                <img width="150px" height="150px" style={{"borderRadius":"100%", "border":"5px solid #50597b"}} alt="BIT" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Bannari_Amman_Institute_of_Technology_logo.png/220px-Bannari_Amman_Institute_of_Technology_logo.png" />
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