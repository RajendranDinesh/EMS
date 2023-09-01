import styled from "styled-components";

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    width: 23vw;
    height: 50vh;
    border-radius: 10px;
    color: #efefef;
    padding-left: 20px;
    justify-content: center;

    @media (max-width: 1080px) {
        margin-left: -1.8em;
        width: 85vw;
        height: 40vh;
    }
`;

const HeaderText = styled.a`
    font-size: 22.5px;
    font-weight: 600;

    @media (max-width: 1080px) {
        font-size: 18.4px;
    }
`;

const SubText = styled.a`

`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

const RightContainer = ({address, dob, email, eventsAttended}) => {
    return(
        <TopContainer>
            <ItemContainer>
                <HeaderText>Address</HeaderText>
                <SubText>{address}</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>Date Of Birth</HeaderText>
                <SubText>{dob}</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>E-Mail</HeaderText>
                <SubText>{email}</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>Events Attended</HeaderText>
                <SubText>{eventsAttended}</SubText>
            </ItemContainer>
        </TopContainer>
    );
};

export { RightContainer };