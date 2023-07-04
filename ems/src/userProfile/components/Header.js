import styled from "styled-components";

import Account from "./icons/account.png"
import Star from "./icons/star.png"

const HeaderContainer = styled.div`
    display: flex;
    background: #394264;
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
    height: 75%;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: background .3s;
    margin-left: 20px;
    color: #efefef;

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
                <HeaderLeftItem><img style={{"width":"30px", "height":"30px"}} src={Account}/><a style={{"padding":"10px"}}>Account</a></HeaderLeftItem>
                <HeaderLeftItem><img style={{"width":"30px", "height":"30px"}} src={Star}/><a style={{"padding":"10px"}}>Favourites</a></HeaderLeftItem>
            </HeaderLeft>
        </HeaderContainer>
    );
};

export { Header };