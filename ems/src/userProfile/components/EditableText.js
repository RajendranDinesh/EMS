import React, { useState } from 'react';
import ModeEditIcon from './icons/edit.png';
import Tick from './icons/tick.png';
import styled from 'styled-components';

const EditableTextContainer = styled.div`
    position: relative;
    display: flex;
    margin-top: 10px;

    input{
        flex: 1;
        border: none;
        padding: 0.5rem;
        font-size: inherit;
        outline: none;
    }

    text{
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
    }
`;

const Text = styled.div`
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    `;

const InputContainer = styled.div`
    display: flex;
    
    input{
      background-color: transparent;
      color: inherit;
      border-bottom: 2px solid #ccc;
    }`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const EditIcon = styled.div`
    margin-left: 0.5rem;
    cursor: pointer;
    
    img{
    width: 25px;
    height: 25px;
    }
`;

const EditableTextField = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditedValue(event.target.value);
  };

  return (
    <EditableTextContainer>
      {isEditing ? (
        <InputContainer>
          <input
            type="text"
            value={editedValue}
            onChange={handleChange}
            onBlur={handleSave}
            autoFocus
          />
          <EditIcon onClick={handleSave}>
            <img src={Tick} alt="edit" />
          </EditIcon>
        </InputContainer>
      ) : (
        <TextContainer>
          <Text onClick={handleEdit}>
            {value}
          </Text>
          <EditIcon onClick={handleEdit}>
            <img src={ModeEditIcon} alt="edit" />
          </EditIcon>
        </TextContainer>
      )}
    </EditableTextContainer>
  );
};

export default EditableTextField;
