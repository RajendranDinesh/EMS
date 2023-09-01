import React, { useContext, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";
import { Modal } from "./Modal";
import { SweetAlert } from "../components/SweetAlert";

import { ForgotPassword } from "./forgotPassword";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    }
  );
  const [isOpen, setIsOpen] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${API_URL}/login`, data,
        {headers : {'Bypass-Tunnel-Reminder': 'eventaz'}});
        if (response.status === 201) {
          window.location = '/';
          Cookies.set('authToken', response.data.token);
        }
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          await SweetAlert({
            title: "Error",
            children: error.response.data.message,
            icon: "error"
          });
        }
        else if (error.code === "ERR_NETWORK") {
          alert("Connection refused. Please try again later.");
        }
      }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
    document.title = "Login | EMS";
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
  <>
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} autoComplete="off" required/>
        <Input type="password" placeholder="Password" name="password" onChange={handleChange} onKeyDown={handleKeyDown} value={data.password} autoComplete="off" required/>
      </FormContainer>

      <Marginer direction="vertical" margin="2em" />
      <MutedLink href="#" onClick={handleModal}>Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />

      <SubmitButton type="submit" onClick={handleSubmit}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="3em" />

      <MutedLink href="#" onClick={switchToSignup}>
        Don't have an account?{" "}
        <BoldLink href="#">
          Signup
        </BoldLink>
      </MutedLink>
      
    </BoxContainer>
    <Modal onClose={handleModal} isOpen={isOpen}>
      <ForgotPassword isOpen={isOpen}></ForgotPassword>
    </Modal>
  </>
  );
}