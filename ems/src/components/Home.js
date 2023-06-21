import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #010001;
`;

const SplineWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 60%;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50%;
    height: 60%;
`;

const Eventaz = styled.a`
    font-size: 3.5em;
    color: #fff;
    text-decoration: none;
    margin: 0.5em;
    font-family: "Bowlby One SC", bold;
`

const Img = styled.div`
    width: 50%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #010001;
    height: 20vh;
`;

const Button = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #fff;
    background-color: #7bdfa0;
    border-radius: 5px;
    padding: 0.5em;
    margin: 0.5em;
    font-family: "Bowlby One SC", bold;
    font-size: 1.5em;
`;

const Frame = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const SpecialContain = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 30%;
`;


const Home = () => {
    return (
        <>
        <HomeWrapper>
            <TextWrapper>
                <Eventaz>EVENTAz</Eventaz>
                <Img>
                <svg viewBox="0 0 220 220" fill="none">
                    <path d="M135.196 67L187.158 157C189.467 161 186.58 166 181.962 166H78.0385C73.4197 166 70.5329 161 72.8423 157L124.804 67C127.113 63 132.887 63 135.196 67Z" fill="rgb(255, 255, 255)" stroke="rgb(255, 255, 255)" stroke-width="8"></path>
                    <path d="M115.196 67L167.158 157C169.467 161 166.58 166 161.962 166H58.0385C53.4197 166 50.5329 161 52.8423 157L104.804 67C107.113 63 112.887 63 115.196 67Z" stroke="#7bdfa0" stroke-width="8" stroke-linejoin="round"></path>
                </svg>
                </Img>
            </TextWrapper>
            <SplineWrapper>
                <Frame>
                    <SpecialContain>
                        <Eventaz>Host</Eventaz>
                    </SpecialContain>
                    <SpecialContain>
                        <Eventaz>Sell</Eventaz>
                    </SpecialContain>
                    <SpecialContain>
                        <Eventaz>Analyze</Eventaz>
                    </SpecialContain>
                </Frame>
            </SplineWrapper>
        </HomeWrapper>
        <ButtonWrapper>
            <Button to="/events">Events</Button>
        </ButtonWrapper>
        </>
    );
    }

export default Home;