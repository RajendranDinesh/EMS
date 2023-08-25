import styled from "styled-components";

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #bebebe;
    margin: 10px;
    width: 23vw;
    height: 50vh;
    border-radius: 10px;
    color: #242424;
    padding-left: 20px;
    justify-content: center;
    font-family: monospace;
`;

const HeaderText = styled.a`
    font-size: 22.5px;
    font-weight: 600;
`;

const SubText = styled.a`

`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

const RightContainer = ({address, authUserCount, eventsOrganised, email}) => {
    return(
        <TopContainer>
            <ItemContainer>
                <HeaderText>Address</HeaderText>
                <SubText>{address}</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>Authorized Users</HeaderText>
                <SubText>{authUserCount}</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>E-Mail</HeaderText>
                <SubText>{email}</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>Events Organised</HeaderText>
                <SubText>{eventsOrganised}</SubText>
            </ItemContainer>
        </TopContainer>
    );
};

export { RightContainer };