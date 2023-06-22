import styled from "styled-components";
import Navbar from './styles/Navbar.js'
import Carousel from "@itseasy21/react-elastic-carousel";

import MusicImg from './styles/music.png'

const AppContainer = styled.div`
    width: 100%,
    height: 100%,
`

const CarouselContainer = styled.div`
    width: 100%,  
`

const Page = () => {
    return (
        <AppContainer>
            <Navbar></Navbar>
            <CarouselContainer>
                <Carousel itemsToShow={1} autoPlaySpeed={3000}>
                    <img style={{"height":"70vh", "width":"75vw", "borderRadius":"20px"}} src={MusicImg} alt="Music" />
                </Carousel>
            </CarouselContainer>
        </AppContainer>    
    );
};

export default Page;