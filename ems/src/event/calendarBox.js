import styled from "styled-components";
import Navbar from "./nav.js";
import React, {useState, useEffect} from "react";
import Carousel from "@itseasy21/react-elastic-carousel";
import DateDiv from "./DateDiv.js"
import "./styles/styles.css"

const BoxContainer = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 30%;
background-color: #010001;
padding: 20px;
padding-right: 10px;`

const TopBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 10%;
`

const CarousalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 94%;
    height: 70%;
    padding: 20px;
    margin-top: 10px;
    `
const Line = styled.div`
    border-left: 3px solid #7bdfa0;
    height: 90%;
    margin-right: 2px;
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

export function CalendarBox() {
    const [dates, setDates] = useState([]);

    const generateDates = () => {
        const calendarData = [
          { date: 1, month: 'January', year: 2023, dayOfWeek: 'Monday' },
          { date: 2, month: 'February', year: 2023, dayOfWeek: 'Tuesday' },
          { date: 3, month: 'March', year: 2023, dayOfWeek: 'Wednesday' },
          { date: 11, month: 'April', year: 2023, dayOfWeek: 'Thursday' },
          { date: 12, month: 'May', year: 2023, dayOfWeek: 'Friday' },
          { date: 31, month: 'June', year: 2023, dayOfWeek: 'Saturday' },
          { date: 18, month: 'July', year: 2023, dayOfWeek: 'Sunday' },
          { date: 29, month: 'August', year: 2023, dayOfWeek: 'Tuesday' },
          { date: 25, month: 'September', year: 2023, dayOfWeek: 'Wednesday' },
          { date: 15, month: 'October', year: 2023, dayOfWeek: 'Sunday' },
          { date: 9, month: 'November', year: 2023, dayOfWeek: 'Thursday' },
          { date: 30, month: 'December', year: 2023, dayOfWeek: 'Wednesday' },
        ];
        
        setDates(calendarData);
      };
    
      // Call the generateDates function to populate the dates array
      useEffect(() => {
        generateDates();
      }, []);

      const breakPoints =[
        {width: 1, itemsToShow: 1},
        {width: 550, itemsToShow: 2},
        {width: 768, itemsToShow: 7},
        {width: 1200, itemsToShow: 4}
      ];

    return (

        <BoxContainer>
            <TopBox>
                <Navbar />
            </TopBox>
            <CarousalContainer>
                <Carousel breakPoints={breakPoints}>
                    {dates.map(date => 
                    <DateDiv>
                      <Line></Line>
                        <Date><a style={{"font-size": "2.5rem"}}>{date.date}</a><a style={{"font-size": "1rem"}}>{date.dayOfWeek}</a></Date>
                        <Month><a style={{"font-size": "1.7rem"}}>{date.month}</a></Month>
                        
                    </DateDiv>)}
                </Carousel>
            </CarousalContainer>
        </BoxContainer>
    );
}