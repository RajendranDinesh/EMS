import React, { useState, useContext, useEffect } from "react";
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
import axios from 'axios';

export function SignupForm(props) {

  const { switchToSignin } = useContext(AccountContext);
  const [data, setData] = useState({
    fname: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        const response = await axios.post('http://localhost:5000/register', data);
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
          window.location = '/';
        }
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          alert(error.response.data.message);
        }
      }
  };

  useEffect(() => {
    document.title = "SignUp | EMS"
  }, []);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" name="fname" onChange={handleChange} value={data.fname} autoComplete="off" required/>
        <Input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} autoComplete="off" required/>
        <Input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} autoComplete="off" required/>
        <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} value={data.confirmPassword} autoComplete="off" required/>
      
      
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}