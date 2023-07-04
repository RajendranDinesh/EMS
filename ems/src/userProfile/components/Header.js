import styled from "styled-components";
import Account from "./icons/account.png"

const HeaderContainer = styled.div`
    display: flex;
    background-color: #efefef;
    height: 10vh;
    width: 60vw;
    border-radius: 10px;
`;

const HeaderLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const HeaderLeftItem = styled.div`
    display: flex;
    width: 110px;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px;
    
    &:hover {
        background: #50597b;
        border-bottom: 4px solid #11a8ab;
        text-decoration: none;
    }
`;

const Header = () => {
    return(
        <HeaderContainer>
            <HeaderLeft>
                <HeaderLeftItem><img style={{"width":"50px", "height":"50px"}} src={Account}/><a style={{"padding":"10px"}}>Account</a></HeaderLeftItem>
                <HeaderLeftItem>Favourites</HeaderLeftItem>
            </HeaderLeft>
        </HeaderContainer>
    );
};

export { Header };