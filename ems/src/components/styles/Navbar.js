import React, { useState } from "react";
import styled from "styled-components";
import { DropDown } from "../../event/dropDown"
import './styles.css'

const NavbarContainer = styled.nav`
    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
    height: 12vh;
`;

const NavSideContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: 50px;
    border-radius: 50px;
    `;

const NavImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    `;

const NavImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    `;

const NavSideLink = styled.div`
    color: #efefef;
    text-decoration: none;
    margin-right: 20px;
    height: 50px;
    width: 125px;
    border-radius: 15px;
    background-color: #7848f4;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 17px;
    font-weight: 500;

    &:hover {
        cursor: pointer;
    }
`

const Title = styled.a`
    color: #7848f4;
    text-decoration: none;
    margin: 20px;
    font-size: 40px;
    font-weight: 500;
`

const NavSideLink2 = styled.div`
    color: #efefef;
    text-decoration: none;
    margin: 20px;
`;

const NavSideContainer2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: 50px;
    border-radius: 50px;
    background-color: #394264;
    padding: 5px;

    &:hover {
        background-color: #7848f4;
        transition: background-color 0.8s ease-out;
    }

    `;



const handleLogin = () => {
    window.location.href = "/login";
}

const Navbar = () => {
    const [activeDropDown, setActiveDropDown] = useState(false);
    const user = localStorage.getItem('token');
    
  return (
    <NavbarContainer>
        <NavImgContainer>
            <NavImg></NavImg>
            <Title>Eventaz</Title>
        </NavImgContainer>        
        <NavSideContainer>
            { user? (
                <NavSideContainer2 onClick={() => setActiveDropDown((prev) => !prev)}>
                    <NavImg></NavImg>
                    <NavSideLink2>Dinesh P R</NavSideLink2>
                    { activeDropDown && <DropDown />}
                </NavSideContainer2>
            ) : (<NavSideLink onClick={handleLogin}>Login</NavSideLink>)}
        </NavSideContainer>
    </NavbarContainer>
  );
};

export default Navbar;