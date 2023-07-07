import styled from "styled-components";
import Navbar from './styles/Navbar.js'
import {CarouselBox} from "./carouselBox.js";
import './styles/formstyles.css'
import './styles/cardstyle.css'

import im1 from './styles/img/img1.jpg'
import im2 from './styles/img/img2.jpg'
import im3 from './styles/img/img3.jpg'

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
                    <div className="item-container">
                        <div className="img-container loading">
                            <img src={im1} alt="im1"></img>
                        </div>

                        <div className="body-container">
                            <div className="overlay"></div>

                            <div className="event-info">
                                <p className="title loading">Event Title</p>
                                <div className="separator"></div>
                                <p className="info loading">BITSathy, TN</p>
                                <p className="price loading">$10</p>

                                <div className="additional-info">
                                    <p className="info loading">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span> Bannari Amman Institute</span>
                                    </p>
                                    <p className="info loading">
                                        <i className="fas fa-calendar-alt"></i>
                                        <span>Sat, Aug 10, 10:00 AM IST</span>
                                    </p>

                                    <p className="info description loading">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <span>Read More</span>
                                    </p>
                                </div>
                            </div>
                            <button className="action loading">Book It</button>
                        </div>
                    </div>
                </div>
                
            </MainContainer>
            
        </AppContainer> 
    );
};

export default Page;