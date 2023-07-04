import styled from "styled-components";

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #efefef;
    margin: 20px;
`;

const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightContainer = () => {
    return(
        <TopContainer>
            <HeaderText>RightContainer</HeaderText>
        </TopContainer>
    );
};

export { RightContainer };