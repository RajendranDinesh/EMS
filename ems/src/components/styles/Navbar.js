import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { SweetAlert } from '../SweetAlert';
import Cookies from 'js-cookie';

import { DropDown } from "../../event/dropDown"
import UserDefault from './img/user_default.png'
import logo from './logo.png';
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
    color: #8739F9;
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
    background-color: #8739F9;
    padding: 5px;

    &:hover {
        background-color: #C651CD;
        transition: background-color 0.8s ease-out;
    }

    `;

const handleLogin = () => {
    window.location.href = "/login";
}

const Navbar = () => {
    const [activeDropDown, setActiveDropDown] = useState(false);

    const userToken = Cookies.get('authToken');

    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const [isOrg, setIsOrg] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const checkSession = async () => {
        try {

            if (!userToken) {
                setUser(null);
                return;
            }

            const response = await axios.get(`${API_URL}/user/name`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        // 'Bypass-Tunnel-Reminder': 'eventaz'
                    }
                });
            const { name, profilePicture } = response.data;
            setUser(name);
            if (profilePicture === "") {
                setProfilePicture(UserDefault);
                return;
            }
            setProfilePicture(profilePicture);

        } catch (error) {
            if (error.response.status === 403) {

                await SweetAlert({
                    title: 'Session Expired',
                    children: <div style={{textAlign: "center"}}>Your session has timed out. Please login again.</div>
                });

                Cookies.remove('authToken');
                setUser(null);
                window.location.href = "/login";
                return;
            }

            console.log(error);
            alert(error)
            setUser(null);
            
        }
        };

        const checkOrganisation = async () => {
            try {
                const response = await axios.get(`${API_URL}/organisation/checkorganisation`, { 
                    headers: {Authorization: `Bearer ${userToken}`, 
                    'Bypass-Tunnel-Reminder': 'eventaz'
                }});
                
                if (response.status === 200) {
                    setIsOrg(true);
                }
                else {
                    setIsOrg(false);
                }
            } catch (error) {
                setIsOrg(false);
                if (error.status === 500){
                    await SweetAlert({
                        title: "Opps",
                        children: "Something went wrong. Please try again later.",
                        icon: "error"
                    })
                }
            }
        }

        checkSession();
        checkOrganisation();
    }, [userToken, API_URL]);
        
  return (
    <NavbarContainer>
        <NavImgContainer>
            <NavImg src={logo}></NavImg>
            <Title>HAXGUZ</Title>
        </NavImgContainer>        
        <NavSideContainer>
            { user? (
                <NavSideContainer2 onClick={() => setActiveDropDown((prev) => !prev)}>
                    <NavImg src={profilePicture}></NavImg>
                    <NavSideLink2>{user}</NavSideLink2>
                    { activeDropDown && <DropDown isOrg={isOrg}/>}
                </NavSideContainer2>
            ) : (<NavSideLink onClick={handleLogin}>Login</NavSideLink>)}
        </NavSideContainer>
    </NavbarContainer>
  );
};

export default Navbar;