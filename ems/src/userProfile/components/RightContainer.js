import styled from "styled-components";

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    width: 280px;
    height: 400px;
    border-radius: 10px;
    color: #efefef;
    padding-left: 20px;
    justify-content: center;
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

const RightContainer = ({address, dob, email}) => {
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
                <SubText>12</SubText>
            </ItemContainer>
        </TopContainer>
    );
};

export { RightContainer };