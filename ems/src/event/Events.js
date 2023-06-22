import styled from "styled-components";
import { CalendarBox } from "./calendarBox.js";

const AppContainer = styled.div`
width: 100%,
height: 100%
`

const Events = () => {
    return (
        <AppContainer>
            <CalendarBox>
            </CalendarBox>
        </AppContainer>
    );
    }

export default Events;