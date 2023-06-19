import React, { useContext, useState } from "react";
import axios from 'axios';

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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    }
  );

  const handleChange = (e) => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/login', data);
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
          window.location = '/';
        }
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        }
      }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required/>
        <Input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required/>
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="3em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}