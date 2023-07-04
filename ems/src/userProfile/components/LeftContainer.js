import React from 'react';
import styled from 'styled-components';

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #efefef;
    margin: 20px;
    height: 180px;
    width: 300px;
    border-radius: 10px;
`;

const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #11a8ab;
    border-radius: 10px 10px 0 0;
    color: #efefef;
    width: 300px;
    height: 60px;
`;

const ListItem = styled.div`

`;

const LeftContainer = () => {
    return (
        <TopContainer>
            <HeaderText>
                <a style={{"fontSize":"20px"}}>MENU BOX</a>
            </HeaderText>
            
            <ListItem>
                <a>Invites</a>
            </ListItem>

            <ListItem>
                <a>Events</a>
            </ListItem>
        </TopContainer>
    );
};

export {LeftContainer};