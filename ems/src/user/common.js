import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const MutedLink = styled.a`
  font-size: 16px;
  color: #7848f4;
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 16px;
  color: #7848f4;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  outline: none;
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 10px;
  padding: 0px 10px;
  border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  transition: all 200ms ease-in-out;
  font-size: 12px;
  margin: 0 0 11px 0;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #7848f4;
  }
`;

export const SubmitButton = styled.button`
  width: 70%;
  align-items: center;
  justify-content: center;
  padding: 11px 20%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: linear-gradient(
    58deg,
    rgba(120, 100, 200, 230) 20%,
    rgba(120,72,244,255) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;