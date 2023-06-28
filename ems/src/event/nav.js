import React, { useState } from "react";
import styled from "styled-components";
import { DropDown } from "./dropDown";

const NavbarContainer = styled.nav`
    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
`;

const NavSideContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: 50px;
    border-radius: 50px;

    &:hover {
        background-color: #7bdfa0;
        transition: background-color 0.8s ease-out;
    }

    `;

const NavImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    margin-top: 20px;
    `;

const NavImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    `;

const NavLink = styled.a`
    color: #efefef;
    text-decoration: none;
    margin: 20px;
    position: relative;

    &.active {
        border-bottom: 2px solid #17537a;
    }
    
    &::after {
        content: "";
        display: block;
        width: 1px;
        margin: 0 auto;
        height: 2px;
        background-color: #000000;
        transition: width 0.3s ease-out;
    }

    &:not(.active):hover::after {
        width: 100%;
        background-color: #17537a;
    }

`;

const NavSideLink = styled.div`
    color: #efefef;
    text-decoration: none;
    margin: 20px;
    `

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("events");
    const [activeDropDown, setActiveDropDown] = useState(false);
    
  return (
    <NavbarContainer>
        <NavImgContainer>
            <NavImg></NavImg>
        </NavImgContainer>
        
        <NavLink href="#" className={activeLink === "invites" ? "active" : ""} onClick={() => setActiveLink("invites")}>Invites</NavLink>
        <NavLink href="#" className={activeLink === "events" ? "active" : ""} onClick={()=>setActiveLink("events")}>Events</NavLink>
        
        <NavSideContainer onClick={() => setActiveDropDown((prev) => !prev)}>
            <NavImg></NavImg>
            <NavSideLink>Dinesh P R</NavSideLink>
            { activeDropDown && <DropDown />}
        </NavSideContainer>
    </NavbarContainer>
  );
};

export default Navbar;