import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";


const OuterContiner = styled.div`
  background-color: #0b0535;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BoxContainerreset = styled.div`
  height: 50vh;
  width: 60vw;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid black;
  border-radius: 2em
  
`;

const FormContainerreset = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const InputButton = styled.input`
  width: 95%;
  height: 52px;
  outline: none;
  border: 2px solid rgba(200, 200, 200);
  border-radius: 10px;
  padding: 0px 10px;
  border-bottom: 2px solid rgba(200, 200, 200, 0.4);
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

const SubmitButtonreset = styled.button`
  margin-top: 1em;
  width: 100%;
  display: flex;
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

const ResetPage = () => {

    document.title = "Reset Password | EMS"

    const API_URL = process.env.REACT_APP_API_URL;

    const [data, setData] = useState({
      password: "",
      confirmPassword: "",
      token: ""
      });

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const searchParams = new URLSearchParams(window.location.search);
          const token = searchParams.get('token');

          data.token = token;

          const response = await axios.put(`${API_URL}/reset-password`, data, { headers : { 'Bypass-Tunnel-Reminder': 'eventaz', }});
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            alert(response.data.message);
            window.location.href = '/';
          }
        } catch (error) {
          alert(error.response.data.message);
          console.log(error);
        }
      };

    return (
        <OuterContiner>
          <BoxContainerreset>
            <FormContainerreset>
              <label>New Password</label>
              <InputButton onChange={handleChange} type="password" placeholder="Enter New Password" name="password" autoComplete="off" required/>
              <label>confirm new password</label>
              <InputButton onChange={handleChange} type="password" placeholder="Confirm New Password" name="confirmPassword" autoComplete="off" required/>
              <SubmitButtonreset type="button" name="submit" onClick={handleSubmit}>Submit</SubmitButtonreset>
            </FormContainerreset>
          </BoxContainerreset>
        </OuterContiner>
)}

export default ResetPage;