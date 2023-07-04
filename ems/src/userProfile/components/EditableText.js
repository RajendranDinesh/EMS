import React, { useState } from 'react';
import ModeEditIcon from './icons/edit.png';
import styled from 'styled-components';

const EditableTextContainer = styled.div`
    position: relative;
    display: flex;

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
    display: flex;`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const EditIcon = styled.div`
    margin-left: 0.5rem;
    cursor: pointer;
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
