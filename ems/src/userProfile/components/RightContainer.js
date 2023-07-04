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

const RightContainer = () => {
    return(
        <TopContainer>
            <ItemContainer>
                <HeaderText>Address</HeaderText>
                <SubText>Dubai Kurukku Santhu, Dubai</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>Date Of Birth</HeaderText>
                <SubText>12 Sept. 1960</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>E-Mail</HeaderText>
                <SubText>pitchu@mani.com</SubText>
            </ItemContainer>

            <ItemContainer>
                <HeaderText>Events Attended</HeaderText>
                <SubText>12</SubText>
            </ItemContainer>
        </TopContainer>
    );
};

export { RightContainer };