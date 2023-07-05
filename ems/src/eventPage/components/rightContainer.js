import React from "react";
import styled from "styled-components";

const Body = styled.div`
    height: 75vh;
    width: 70vw;
    display: flex;
    align-items: center;
`;

const Container = styled.div`
    height: 60vh;
    width: 64vw;
    border-radius: 10px;
    border: 2px solid gray;
    background-color: #efefef;
    display: block;
    padding: 2.5vw;

    overflow-y: scroll;

    &::-webkit-scrollbar{width: 10px};
    &::-webkit-scrollbar-track{background: #f1f1f1};
    &::-webkit-scrollbar-thumb{background: #888};
    &::-webkit-scrollbar-thumb:hover{background: #555};
`;

const RightContainer = ({description}) => {

    return (
            <Body>
                <Container>
                    <h1>Event Details</h1>
                    <div style={{"color":"#000"}} dangerouslySetInnerHTML={{ __html: description }} />
                </Container>
            </Body>
    );
};

export default RightContainer;