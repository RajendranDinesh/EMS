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
`;

const HeaderText = styled.a`
    font-size: 2em;
    font-weight: 600;
`;

const SubText = styled.a`
    font-size: 1.3em;
    font-weight: 400;
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