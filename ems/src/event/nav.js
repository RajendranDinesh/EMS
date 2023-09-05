import React, { useState } from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavLink = styled.a`
    color: #efefef;
    text-decoration: none;
    position: relative;

    font-size: 30px;
    font-weight: 500;

    &.active {
        border-bottom: 2px solid #17537a;
    }
    
    &::after {
        content: "";
        display: block;
        width: 1px;
        margin: 0 auto;
        height: 2px;
        background-color: #efefef;
        transition: width 0.3s ease-out;
    }

    &:not(.active):hover::after {
        width: 100%;
        background-color: #efefef;
    }

`;

const Navbar = () => {
    
  return (
    <NavbarContainer>
        <NavLink href="">Search Results</NavLink>
    </NavbarContainer>
  );
};

export default Navbar;