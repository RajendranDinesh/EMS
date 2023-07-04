import styled from "styled-components";


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

const MiddleContainer = ({name, desc}) => {
    return (
        <TopContainer>
            <ImageContainer>
                <img width="150px" height="150px" style={{"borderRadius":"100%", "border":"5px solid #50597b"}} alt="Vadivelu" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHHni3MMXIp6Kipd3Yt9vlqXemLlZBWDG2g&usqp=CAU" />
            </ImageContainer>
            
            <NameContainer>
                <a style={{"fontSize":"25px", "fontWeight":"600"}}>{name}</a>
            </NameContainer>

            <DescriptionContainer>
                {desc}
            </DescriptionContainer>

        </TopContainer>
    );
};

export { MiddleContainer };