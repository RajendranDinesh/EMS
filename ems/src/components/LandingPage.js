import styled from "styled-components";
import Navbar from './styles/Navbar.js'
import {CarouselBox} from "./carouselBox.js";
import './styles/formstyles.css'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AppContainer = styled.div`
    width: 100vw,
    height: 100%,
    display: flex;
    justify-content: center;
    align-items: center;
`

const MainContainer = styled.div`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    `;

const NavbarContainer = styled.nav`
    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
    width: 90vw;
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

const NavSideLink = styled.div`
    color: #efefef;
    text-decoration: none;
    margin-right: 20px;
    height: 50px;
    width: 125px;
    border-radius: 15px;
    background-color: #7848f4;


    display: none;
    justify-content: center;
    align-items: center;

    font-size: 17px;
    font-weight: 500;

    &:hover {
        cursor: pointer;
    }
`

const Title = styled.a`
    color: #010001;
    text-decoration: none;
    margin: 20px;
    font-size: 40px;
    font-weight: 500;
`

const EventContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 90vw;
    background-color: #efefef;
    border-radius: 20px;
    margin-left: 60px;
    margin-right: 60px;
    `;

const Page = () => {

    const [selectedId, setSelectedId] = useState(null)
    
    const items = [
        { id: 1, title: "First item", subtitle: "Subtitle 1" },
        { id: 2, title: "Second item", subtitle: "Subtitle 2" },
        { id: 3, title: "Third item", subtitle: "Subtitle 3" }
        ]

        
    return (
        
        <AppContainer>
            <Navbar></Navbar>
            <CarouselBox/>

            <MainContainer>
                <NavbarContainer>
                    <NavImgContainer>
                        <Title>UpComing Events</Title>
                    </NavImgContainer>        
                    <NavSideContainer>
                        <NavSideLink>Login</NavSideLink>
                    </NavSideContainer>
                </NavbarContainer>
                
                <EventContainer>
                </EventContainer>
                
            </MainContainer>
            
        </AppContainer> 
    );
};

export default Page;