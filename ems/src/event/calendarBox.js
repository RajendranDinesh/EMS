import styled from "styled-components";
import Navbar from "./nav.js";
import React, {useState, useEffect} from "react";
import DateDiv from "./DateDiv.js"
import "./styles/styles.css"

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


const BoxContainer = styled.div`
height: 30%;
background-color: #1f253d;
padding: 20px;
padding-right: 10px;

`

const TopBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 99%;
height: 10%;
`

const CarousalContainer = styled.div`
    display: flex;
    align-items: center;
    width: 94%;
    height: 70%;
    padding: 20px;
    margin-top: 10px;
    `
const Line = styled.div`
    border-left: 3px solid #efefef;
    height: 90%;
    margin-right: 6px;
    margin-top: 10px;
`
const Date = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
`
const Month = styled.div`
    display: flex;
    position: absolute;
    margin-left: 10px
`

export function CalendarBox({ searchDate }) {
    const [date, setDates] = useState([]);

    const generateDates = () => {

        const dateObject = dayjs(searchDate).tz("Asia/Kolkata");

        const date = dateObject.date();
        const month = dateObject.format("MMMM");
        const year = dateObject.year();
        const dayOfWeek = dateObject.format("dddd");

        const calendarData = { date, month, year, dayOfWeek };
        
        setDates(calendarData);
      };
    
      useEffect(() => {
        generateDates();
      }, []);

    return (

        <BoxContainer>
            <TopBox>
                <Navbar />
            </TopBox>
            <CarousalContainer>
                    <DateDiv>
                      <Line></Line>
                        <Date>
                            <a style={{"font-size": "2.5rem"}} href={() => false}>{date.date}</a>
                            <a style={{"font-size": "1rem"}} href={() => false}>{date.dayOfWeek}</a>
                        </Date>
                        <Month><a style={{"font-size": "1.7rem"}} href={() => false}>{date.month}</a></Month>
                        
                    </DateDiv>
            </CarousalContainer>
        </BoxContainer>
    );
}