import styled from "styled-components";
import Navbar from './styles/Navbar.js'
import {CarouselBox} from "./carouselBox.js";
import './styles/formstyles.css'
import './styles/cardstyle.css'


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import im1 from './styles/img/img1.jpg'

const AppContainer = styled.div`
    width: 100vw,
    height: 200%,
    display: flex;
    justify-content: center;
    align-items: center;
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 115vh;
    margin-top: 100px;
    `;

const NavbarContainer = styled.nav`
    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
    width: 90vw;
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

const Page = () => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('./Event');
    };



const [events, setEvents] = useState([]);
const data = () => {
    const eventdata = [
      { title: "Event Title",location: "BITSathy, TN",price: "Event price",organiser: "Event organiser",timestamps: "Event timestamps",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
      { title: "Event Title",location: "BITSathy, TN",price: "Event price",organiser: "Event organiser",timestamps: "Event timestamps",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
      { title: "Event Title",location: "BITSathy, TN",price: "Event price",organiser: "Event organiser",timestamps: "Event timestamps",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
      { title: "Event Title",location: "BITSathy, TN",price: "Event price",organiser: "Event organiser",timestamps: "Event timestamps",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
      { title: "Event Title",location: "BITSathy, TN",price: "Event price",organiser: "Event organiser",timestamps: "Event timestamps",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    ];
    
    setEvents(eventdata);
  };

useEffect(() => {
    document.title = "Event Management System";
    data();
}, []);

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
                
                <div className="containers">
                {events.map(event =>
                    <div className="item-container">
                    
                        <div className="img-container loading">
                            <img src={im1} alt="im1"></img>
                        </div>

                        <div className="body-container">
                            
                            <div className="overlay"></div>

                            <div className="event-info">
                             
                                <p className="title loading">{event.title}</p>
                                <div className="separator"></div>
                                <p className="info loading">{event.location}</p>
                                <p className="price loading">{event.price}</p>
                                
                                <div className="additional-info">
                                    <p className="info loading">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span> {event.organiser}</span>
                                    </p>
                                    <p className="info loading">
                                        <i className="fas fa-calendar-alt"></i>
                                        <span>{event.timestamps}</span>
                                    </p>
                                    <p className="info description loading">
                                        {event.description} <span onClick={handleClick} >Read More</span>
                                    </p>
                                    
                                </div>
                            </div>
                            <button className="action loading" onClick={handleClick} >Book It</button>
                        </div>
                    </div>
                    )}; 
                </div>
            </MainContainer>
            
        </AppContainer> 
    );
};


export default Page;