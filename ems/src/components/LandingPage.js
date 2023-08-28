import styled from "styled-components";
import Navbar from './styles/Navbar.js'
import {CarouselBox} from "./carouselBox.js";
import './styles/formstyles.css'
import './styles/cardstyle.css'
import { SweetAlert } from "./SweetAlert.js";
import Cookies from "js-cookie";

import ChatBot from 'react-simple-chatbot';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import im1 from './styles/img/img1.jpg'
import logo from './styles/logo.png'
import UserDefault from './styles/img/user_default.png'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const AppContainer = styled.div`
    background-color: #1f253d;
    color: #ffffff;
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
    color: #ffffff;
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
    color: #ffffff;
    text-decoration: none;
    margin: 20px;
    font-size: 40px;
    font-weight: 500;
`
const Flogo = styled.a`
    color: #8739F9;
    text-decoration: none;
    font-size: 40px;
    font-weight: 500;
    margin-top: 1em;
    margin-bottom: 0.5em;
`
const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #1f253d;
    color: #ffffff;
`
const Theme = styled.div`
	background: '#C9FF8F',
	headerBgColor: '#197B22',
	headerFontSize: '20px',
	botBubbleColor: '#0F3789',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#FF5733',
	userFontColor: 'white',
`

const GradientSplitter = styled.div`
    margin-top: 10vh;
    height: 1.25vh;
    border-radius: 100%;
    width: 90vw;
    background: linear-gradient(180deg, rgba(31,37,61,1) 0%, rgba(135,57,249,1) 40%, rgba(31,37,61,1) 80%);
`;

const Page = () => {
    const navigate = useNavigate();
  
    const handleClick = (eventId) => {
      navigate(`./event/${eventId}`);
    };


const userToken = Cookies.get('authToken');
const [events, setEvents] = useState([]);
const [user, setUser] = useState(null);
const [profilePicture, setProfilePicture] = useState(null);

const config = {
	botAvatar: logo,
    userAvatar: profilePicture,
	floating: true,
};

const steps = [
	{
        id: 'greet',
        message: `hi ${user}, how can I help you?`,
        trigger: '0',
    },{
		id: '0',
        options: [
			{ value: 1, label: 'Create Event', trigger: '2' },
			{ value: 2, label: 'Register an event', trigger: '3' },
			{ value: 3, label: 'Edit Event', trigger: '4' },
			{ value: 4, label: 'Moderator Request', trigger: '5' },
			{ value: 5, label: 'Tickets', trigger: '6' },
			{ value: 6, label: 'Certifictaes', trigger: '7' },
		]
	},{
		id: '1',
        message: 'Still Not Resolved?',
        trigger: '8',
	},{
		id: '2',
		message: "user -> profile -> create event *if you are an normal user you need to get the moderator access to create an event*",
        trigger: '1',
	},{
		id: '3',
		message: "Hover the event in the main page -> Book -> Register",
        trigger: '1',
	},{
		id: '4',
		message: "Hover the event in the main page -> edit *only the event creator can edit the event*",
        trigger: '1',
	},{
		id: '5',
		message: "user -> profile -> moderator request -> organanisation emailid *only the organanisation can approve the request* ",
        trigger: '1',
	},{
		id: '6',
		message: "after registering the event the register button will appeared as Ticket",
        trigger: '1',
	},{
		id: '7',
		message: "Once the event creator upload the certificates the ticket will be appeared as certificate",
        trigger: '1',
	},{
		id: '8',
		options: [
            { value: 1, label: 'Yes', trigger: '9' },
            { value: 2, label: 'No', trigger: '10' },
            { value: 3, label: 'Main Menu', trigger: '0' },
        ]
    },{
        id: '9',
        component: (<div>Reach Out to us trough our <a href="/contactus">contact page</a> in the footer.</div>),
        asMessage: true,
        end: true
	},{
        id: '10',
        message: "Thank you for using HAXGUZBot! have a great day.",
        end: true
    }
];


const API_URL = process.env.REACT_APP_API_URL;

const MAX_WORDS = 5;
const limitWords = (str, wordLimit) => {
    const words = str.trim().split(' ');
    const limitedWords = words.slice(0, wordLimit);
    return limitedWords.join(' ');
};

useEffect(() => {
    const dataFetch = async () => {

    try {
        const response = await axios.get(`${API_URL}/event/getall`, 
        {headers: {'Bypass-Tunnel-Reminder': 'eventaz'}}
        );
        setEvents(response.data);
    } catch (error) {   
        console.log(error);
    }

  }
  const checkSession = async () => {
    try {

        if (!userToken) {
            setUser(null);
            return;
        }

        const response = await axios.get(`${API_URL}/user/name`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Bypass-Tunnel-Reminder': 'eventaz'
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
  
  document.title = "HAXGUZ";
  dataFetch();
  checkSession();
  }, [API_URL, userToken]);


    return (
        <>
        <AppContainer>
            <Navbar></Navbar>
            <CarouselBox/>

            <MainContainer>
                <NavbarContainer>
                    <NavImgContainer>
                        <Title>UpComing Events</Title>
                    </NavImgContainer>        
                    <NavSideContainer>
                        <NavSideLink></NavSideLink>
                    </NavSideContainer>
                </NavbarContainer>
                
                <div className="containers">
                {events.map(event =>
                    <div className="item-container">
                    
                        <div className="img-container loading">
                            <img src={event.eventIcon} alt="im1"></img>
                        </div>

                        <div className="body-container">
                            
                            <div className="overlay"></div>

                            <div className="event-info">
                             
                                <p className="title loading" onClick={() => handleClick(event.eventId)}>{event.name}</p>
                                <div className="separator"></div>
                                <p className="info loading">{event.location}</p>
                                <p className="price loading">₹{event.price}</p>
                                
                                <div className="additional-info">
                                    <p className="info loading">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span> {event.organisation}</span>
                                    </p>
                                    <p className="info loading">
                                        <i className="fas fa-calendar-alt"></i>
                                        <span>Registration Starting Date </span>
                                        <span>{dayjs(event.regStartDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</span>
                                    </p>
                                    <p className="info loading">
                                        <i className="fas fa-calendar-alt"></i>
                                        <span>Event Starting Date </span><br></br>
                                        <span>{dayjs(event.startDate).utc().tz('Asia/Kolkata').format('DD/MM/YYYY')}</span>
                                    </p>
                                    <p className="info description loading">
                                        <div dangerouslySetInnerHTML={{__html : limitWords(event.description, MAX_WORDS)}} /> 
                                        <span onClick={() => handleClick(event.eventId)} >Read More</span>
                                    </p>
                                    
                                </div>
                            </div>
                            <button className="action loading" onClick={() => handleClick(event.eventId)} >Book It</button>
                        </div>
                    </div>
                    )} 
                </div>
            </MainContainer>
        </AppContainer>
        <Theme>
            {user &&
			<ChatBot
				headerTitle="HAXGUZBot"
				steps={steps}
				{...config}
            />}
        </Theme>
        <Footer>
            <GradientSplitter></GradientSplitter>
            <Flogo>HAXGUZ</Flogo>
            <a href={() => false}>hello how are you?</a>
            <a href={() => false}>we as a student developers created this web app to seamlessly manage and organize events from end to end</a>
            <a href={() => false}>Contact us</a>
            <p>&#169; 2023 Team HAXGUZ</p>
        </Footer>
        </>
    );
};


export default Page;