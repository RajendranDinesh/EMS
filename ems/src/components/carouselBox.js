import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "@itseasy21/react-elastic-carousel";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from "styled-components";
import './styles/formstyles.css'

import MusicImg from './styles/img/music.png'
import Event1 from './styles/img/event.png'
import Event2 from './styles/img/event_2.png'


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axios from 'axios';
import { SweetAlert } from './SweetAlert';
dayjs.extend(utc);
dayjs.extend(timezone);

const CarouselContainer = styled.div`
    width: 100vw,
    
`

const BoxContainer = styled.div`
    color: #efefef;
    width: 60vw;
    height: 15vh;
    background-color: #8739F9;
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);

    justify-content: center;
    align-items: center;
    border-radius: 20px;
`

const DropDown = styled.div`
    width: 20vw;
    height: 100%;
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Search = styled.div`
    width: 5vw;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.1);
    }
`;

const SearchResults = styled.div`
    width: 100%;
    max-height: 20vh;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;

    background-color: transparent;
    bottom: 10vh;

    border: 1px solid #efefef;
    border-radius: 0.64em;

    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SearchItem = styled.div`
    width: 100%;
    height: 3vh;
    background-color: transparent;
    padding: 0.5em;
    padding-left: 1em;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    font-size: 16px;

    &:hover {
        background-color: #efefef;
        color: #8739F9;
    }
`;

export function CarouselBox() {

    const API_URL = process.env.REACT_APP_API_URL;

    const [isEventSearchOpen, setIsEventSearchOpen] = useState(false);
    const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false);

    const searchEventTypes = ['Paper Presentation', 'Project Competition', 'Symposium', 'Workshop', 'Coding', 'Gaming', 'Quiz', 'Design', 'Other'];
    const [searchEventType, setSearchEventType] = useState("");

    const [availableLocations, setAvailableLocations] = useState([]);
    const [searchLocation, setSearchLocation] = useState("");

    const [searchDate, setSearchDate] = useState();

    const handleChangeSearchEvent = (e) => {
        setSearchEventType(e.target.textContent);
        setIsEventSearchOpen(false);
    }

    const handleChangeSearchEventTypes = (e) => {
        setSearchEventType(e.target.value);

        if (e.target.value === "") {
            setIsEventSearchOpen(false);
        }
        else {
            setIsEventSearchOpen(true);
        }
    }

    const handleChangeSearchLocation = (e) => {
        setIsLocationSearchOpen(false);
        setSearchLocation(e.target.textContent);
    }

    const handleChangeSearchLocations = (e) => {
        setSearchLocation(e.target.value);

        if (e.target.value === "") {
            setIsLocationSearchOpen(false);
        }
        else {
            setIsLocationSearchOpen(true);
        }
    }

    const handleSearchDateChange = (date) => {
        setSearchDate(date);
    }

    const navigate = useNavigate();

    const search = async () => {

        const searchParams = {
            searchDate,
            searchLocation,
            searchEventType
        };

        if (searchDate === undefined || searchDate === null || searchEventType === "") {
            await SweetAlert({
                icon: 'error',
                title: 'Oops...',
                children: 'Please fill all the fields!',
            });

            return;
        }

        try {
            const query = new URLSearchParams(searchParams).toString();

            navigate(`/events?${query}`)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getEventLocations() {
            const response = await axios.get(`${API_URL}/events/location`);
            
            setAvailableLocations(response.data.locations);
        }

        getEventLocations();
    }, [API_URL])

    return (
    <CarouselContainer>
                <Carousel itemsToShow={1} enableAutoPlay autoPlaySpeed={10000} >
                    <img style={{"height":"70vh", "width":"75vw", "borderRadius":"10px"}} src={MusicImg} alt="Music" />
                    <img style={{"height":"70vh", "width":"75vw", "borderRadius":"10px"}} src={Event2} alt="Music" />
                    <img style={{"height":"70vh", "width":"75vw", "borderRadius":"10px"}} src={Event1} alt="Music" />
                </Carousel>
                <BoxContainer>
                    <DropDown>
                    <div className="form-control">
                        {isEventSearchOpen &&
                        <SearchResults>
                            {searchEventTypes.filter((item) => {
                                if (searchEventType === "") {
                                    return item;
                                }
                                else if (item.toLowerCase().includes(searchEventType.toLowerCase())) {
                                    return item;
                                }
                            }).map((item, index) => {
                                return (
                                    <SearchItem key={index} onClick={handleChangeSearchEvent}>{item}</SearchItem>
                                )})}
                        </SearchResults>}
                        <input type="text" required value={searchEventType} onChange={handleChangeSearchEventTypes} onClick={() => setIsEventSearchOpen(!isEventSearchOpen)}></input>
                        <label>
                            <span style={{transitionDelay:`0ms`}}>L</span>
                            <span style={{transitionDelay:`50ms`}}>o</span>
                            <span style={{transitionDelay:`100ms`}}>o</span>
                            <span style={{transitionDelay:`150ms`}}>k</span>
                            <span style={{transitionDelay:`200ms`}}>i</span>
                            <span style={{transitionDelay:`250ms`}}>n</span>
                            <span style={{transitionDelay:`300ms`}}>g</span>
                            <span style={{transitionDelay:`350ms`}}> </span>
                            <span style={{transitionDelay:`400ms`}}>F</span>
                            <span style={{transitionDelay:`450ms`}}>o</span>
                            <span style={{transitionDelay:`500ms`}}>r</span>
                        </label>
                    </div>
                    </DropDown>
                    <DropDown>
                    <div className="form-control">
                    {isLocationSearchOpen &&
                        <SearchResults>
                            {availableLocations.filter((item) => {
                                if (searchLocation === "") {
                                    return item;
                                }
                                else if (item.toLowerCase().includes(searchLocation.toLowerCase())) {
                                    return item;
                                }
                            }).map((item, index) => {
                                return (
                                    <SearchItem key={index} onClick={handleChangeSearchLocation}>{item}</SearchItem>
                                )})}
                        </SearchResults>}
                        <input type="text" required value={searchLocation} onChange={handleChangeSearchLocations} onClick={() => setIsLocationSearchOpen(!isLocationSearchOpen)}></input>
                        <label>
                            <span style={{transitionDelay:"0ms"}}>L</span>
                            <span style={{transitionDelay:"50ms"}}>o</span>
                            <span style={{transitionDelay:"100ms"}}>c</span>
                            <span style={{transitionDelay:"150ms"}}>a</span>
                            <span style={{transitionDelay:"200ms"}}>t</span>
                            <span style={{transitionDelay:"250ms"}}>i</span>
                            <span style={{transitionDelay:"300ms"}}>o</span>
                            <span style={{transitionDelay:"350ms"}}>n</span>
                        </label>
                    </div>
                    </DropDown>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DropDown>
                            <DatePicker className="date" timezone='Asia/Kolkata' onChange={handleSearchDateChange}/>
                        </DropDown>
                        <Search>
                            <SearchOutlinedIcon style={{"color":`#efefef`}} onClick={search}></SearchOutlinedIcon>
                        </Search>
                    </LocalizationProvider>
                </BoxContainer>
            </CarouselContainer>
    )
}