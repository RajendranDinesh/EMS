import styled from "styled-components";


const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #efefef;
    margin: 20px;
    width: 300px;
    height: 400px;
    border-radius: 20px;
`;

const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.div`
    display:flex;
    justify-content: center;
    
`;

const MiddleContainer = () => {
    return (
        <TopContainer>
            <ImageContainer>
                <img width="150px" alt="Anne Hathaway picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHHni3MMXIp6Kipd3Yt9vlqXemLlZBWDG2g&usqp=CAU" />
            </ImageContainer>
            <HeaderText>MiddleContainer</HeaderText>
        </TopContainer>
    );
};

export { MiddleContainer };