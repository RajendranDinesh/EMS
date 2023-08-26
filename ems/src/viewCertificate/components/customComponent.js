import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const Text = styled.div`
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  color: ${props => props.fontColor};
  cursor: move;
`;

const PropText = styled.a`
  font-family: monospace;
  font-size: 16px;
  color: #000000;
  cursor: default;
`;

const PropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  border: 1px solid black;
  padding: 10px;
  line-height: 2;
`;

const CustomComponent = ({ text, setxCoordinate, setyCoordinate, fontFamily, fontSize, fontColor, handleFontColorChange, handleFontFamilyChange, handleFontSizeChange }) => {

  const logevent = (data) => {
    setxCoordinate(data.x);
    setyCoordinate(data.y);
  }
  return (
    <>
      <PropContainer>
        <PropText>Properties for {text}</PropText>
        <div>
          <label>
            <PropText>Font Family:</PropText>
            <select value={fontFamily} onChange={handleFontFamilyChange}>
              <option value="Allura">Allura</option>
              <option value="Arial">Arial</option>
              <option value="Bebas Neue">Bebas Neue</option>
              <option value="Grand Hotel">Grand Hotel</option>
              <option value="Kaushan Script">Kaushan Script</option>
              <option value="Monospace">Monospace</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>
        </div>
        <div>
          <label>
          <PropText>Font Size:</PropText>
            <input
              type="number"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </label>
        </div>
        <div>
          <label>
          <PropText>Font Color:</PropText>
            <input
              type="color"
              value={fontColor}
              onChange={handleFontColorChange}
            />
          </label>
        </div>
      </PropContainer>

      <Draggable onStop={logevent} position={null}>
        <Text
          fontFamily={fontFamily}
          fontSize={fontSize+'px'}
          fontColor={fontColor}
        >
          {text}
        </Text>
      </Draggable>

    </>
  );
};

export default CustomComponent;
