import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:100;

  @media (max-width: 1080px) {
    width: 100%;
    height: 100%;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 4px;
  height: 400px;
  width: 550px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #1f253d;

  @media (max-width: 1080px) {
    width: 20em;
    height: 40em;
  }
`;

const ModalClose = styled.button`
  background-color: #ccc;
  border: none;
  padding: 8px 16px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover{
    background-color: #aaa;
  }
`;

const Modal = ({ isOpen, onClose, children, modalHeight, modalWidth }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent style={{"height":modalHeight, "width":modalWidth}}>
        {children}
        <ModalClose onClick={onClose}>
          Close
        </ModalClose>
      </ModalContent>
    </ModalContainer>
  );
};

export { Modal };
