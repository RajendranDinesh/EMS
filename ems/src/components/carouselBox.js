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

const CarouselContainer = styled.div`
    width: 100vw;

    img {
        height: 70vh;
        width: 75vw;
        border-radius: 10px;
    }
    
    @media (max-width: 1080px) {
        width: 100vw;
        
        img {
            height: 30vh;
            width: 90vw;
            border-radius: 10px;
        }
    }
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

    @media (max-width: 1080px) {
        width: 80vw;
        flex-direction: column;
        height: 30vh;
        bottom: 10vh;
    }
`

const DropDown = styled.div`
    width: 20vw;
    height: 100%;
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1080px) {
        width: 70vw;
        margin-left: 0;

        height: 10vh;
    }
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

    @media (max-width: 1080px) {
        position: absolute;
        right: 4vw;
        bottom: 2em;
    }
`

export function CarouselBox() {

    const search = () => {
        console.log("searching")
    }

    return (
    <CarouselContainer>
                <Carousel itemsToShow={1} enableAutoPlay autoPlaySpeed={10000} >
                    <img src={MusicImg} alt="Music" />
                    <img src={Event2} alt="Music" />
                    <img src={Event1} alt="Music" />
                </Carousel>
                <BoxContainer>
                    <DropDown>
                    <div className="form-control">
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
                    <div className="form-control">
                        <input type="text" required></input>
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
                        <DatePicker className="date"></DatePicker>
                    </DropDown>
                    <Search>
                        <SearchOutlinedIcon style={{"color":`#efefef`}} onClick={search}></SearchOutlinedIcon>
                    </Search>
                    </LocalizationProvider>
                </BoxContainer>
            </CarouselContainer>
    )
}