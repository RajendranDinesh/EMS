import React, { useEffect } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1f253d;
    font-family: 'Montserrat', sans-serif;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
`;

const LeagueInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #8739F9;
    border-radius: 10px;
    border: 1px solid #efefef;
    min-width: 30vw;
    min-height: 30vh;
    margin-top: 2vh;
    margin-bottom: 2vh;

    @media (max-width: 768px) {
        min-width: 80vw;
        min-height: 10vh;
    }

    &:hover {
        box-shadow: 0px 0px 15px 0px #efefef;
        transform: scale(1.05);
        transition: 0.3s ease-in-out;
    }
`;

const Heading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    min-height: 10vh;
    font-size: 2rem;
    color: #efefef;
    font-weight: 700;
`;

const LeagueInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    min-width: 100%;

    img {
        width: 100px;
        height: 100px;

        @media (max-width: 768px) {
            width: 50px;
            height: 50px;
        }
    }

    a {
        font-size: 2.5rem;
        color: #efefef;
        font-weight: 700;
        text-shadow: 0px 0px 10px;

        animation: glow 1s ease-in-out infinite alternate;

        @keyframes glow {
            from {
                text-shadow: 0px 0px 2px #efefef;
            }
            to {
                text-shadow: 0px 0px 20px #efefef;
            }
        }

        @media (max-width: 768px) {
            font-size: 1rem;
        }
    }

    span {
        font-size: 1.5rem;
        color: #efefef;
        font-weight: 500;

        @media (max-width: 768px) {
            font-size: 1rem;
        }
    }
`;

const LeafueDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 100%;
    margin: 2rem;
`;

const leagues = [
    { name: 'Uranium', minEvents: 25 },
    { name: 'Astatine', minEvents: 22 },
    { name: 'Nobelium', minEvents: 20 },
    { name: 'Fermium', minEvents: 17 },
    { name: 'Curium', minEvents: 15 },
    { name: 'Bismuth', minEvents: 12 },
    { name: 'Thallium', minEvents: 10 },
    { name: 'Actinium', minEvents: 7 },
    { name: 'Polonium', minEvents: 5 },
    { name: 'Radium', minEvents: 3 },
    { name: 'Francium', minEvents: 1 },
    { name: 'Nil', minEvents: 0}
  ];

const badgeImages = {
    Francium: require('../userProfile/components/icons/badges/francium.png'),
    Radium: require('../userProfile/components/icons/badges/radium.png'),
    Polonium: require('../userProfile/components/icons/badges/polonium.png'),
    Actinium: require('../userProfile/components/icons/badges/actinium.png'),
    Thallium: require('../userProfile/components/icons/badges/thallium.png'),
    Bismuth: require('../userProfile/components/icons/badges/bismuth.png'),
    Curium: require('../userProfile/components/icons/badges/curium.png'),
    Fermium: require('../userProfile/components/icons/badges/fermium.png'),
    Nobelium: require('../userProfile/components/icons/badges/nobelium.png'),
    Astatine: require('../userProfile/components/icons/badges/astatine.png'),
    Uranium: require('../userProfile/components/icons/badges/uranium.png'),
    Nil: require('../userProfile/components/icons/badges/noevent.png')
  };

const LeagueDetails = () => {
    useEffect(() => {
        document.title = "Leagues | Haxguz";
    })
    return (
    <MainContainer>
        <Container>
            <Heading>League Details</Heading>
            {leagues.map((league, index) => {
             return (<LeagueInfoContainer key={index}>
                <LeagueInfo>
                    <LeafueDetails>
                        <a href={() => false}>{league.name}</a>
                        <span>Required Number of Events: {league.minEvents}</span>
                    </LeafueDetails>
                <img alt={league.name} src={badgeImages[league.name]}/>
                </LeagueInfo>
            </LeagueInfoContainer>)})}
        </Container>
    </MainContainer>);
}

export default LeagueDetails;