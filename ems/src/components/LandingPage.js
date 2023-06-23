import styled from "styled-components";
import Navbar from './styles/Navbar.js'
import Carousel from "@itseasy21/react-elastic-carousel";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MusicImg from './styles/music.png'
import Event1 from './styles/event.png'
import Event2 from './styles/event_2.png'

import './styles/formstyles.css'

const AppContainer = styled.div`
    width: 100%,
    height: 100%,
    display: flex;
    justify-content: center;
    align-items: center;
`

const CarouselContainer = styled.div`
    width: 100vw,  
`

const BoxContainer = styled.div`
    color: #efefef;
    width: 60vw;
    height: 15vh;
    background-color: #0b0535;
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
    width: 30vw;
    height: 100%;
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Page = () => {
    return (
        <AppContainer>
            <Navbar></Navbar>
            <CarouselContainer>
                <Carousel itemsToShow={1} enableAutoPlay autoPlaySpeed={10000} >
                    <img style={{"height":"70vh", "width":"85vw", "borderRadius":"10px"}} src={MusicImg} alt="Music" />
                    <img style={{"height":"70vh", "width":"85vw", "borderRadius":"10px"}} src={Event2} alt="Music" />
                    <img style={{"height":"70vh", "width":"85vw", "borderRadius":"10px"}} src={Event1} alt="Music" />
                </Carousel>
                <BoxContainer>
                    <DropDown>
                    <div class="form-control">
                        <input type="text" required></input>
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
                    <div class="form-control">
                        <input type="text" required></input>
                        <label>
                            <span style={{"transition-delay":"0ms"}}>L</span>
                            <span style={{"transition-delay":"50ms"}}>o</span>
                            <span style={{"transition-delay":"100ms"}}>c</span>
                            <span style={{"transition-delay":"150ms"}}>a</span>
                            <span style={{"transition-delay":"200ms"}}>t</span>
                            <span style={{"transition-delay":"250ms"}}>i</span>
                            <span style={{"transition-delay":"300ms"}}>o</span>
                            <span style={{"transition-delay":"350ms"}}>n</span>
                        </label>
                    </div>
                    </DropDown>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DropDown style={{margin:`20px`}}>
                        <DatePicker className="date"></DatePicker>
                    </DropDown>
                    </LocalizationProvider>
                </BoxContainer>
            </CarouselContainer>
            
        </AppContainer>    
    );
};

export default Page;