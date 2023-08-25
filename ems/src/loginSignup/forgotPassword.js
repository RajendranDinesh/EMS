import styled from "styled-components";
import React, { useContext, useState } from "react";
import axios from "axios";

import { Loader } from "./loader/loader";
import { AccountContext } from "./accountContext";
import { Done } from "../userProfile/components/loader/Checker";
import { Cross } from "../userProfile/components/loader/Error";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
`;

const Text = styled.a`
    font-size: 16px;
    color: #fff;
    margin-top: 30px;
    text-align: start;
`;

const FText = styled.a`
    font-size: 24px;
    color: #fff;
    margin-top: 8px;
    text-align: start;
`;

const Input = styled.input`
    height: 8vh;
    outline: none;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 0px 10px;
    font-size: 16px;
    font-weight: 520;
    margin-bottom: 10px;
    transition: all 200ms ease-in-out;

    &::placeholder {
        color: gray;
    }

    &:focus {
        border: 2px solid gray;
    }
`;

const Button = styled.button`
    width: 60%;
    height: 8vh;
    border: 2px solid #efefef;
    border-radius: 8px;
    background-color: transparent;
    color: #efefef;
    font-size: 16px;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    align-self: center;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        color: #000;
    }
`;

const DText = styled.a`
    font-size: 13.6px;
    color: #fff;
    text-align: start;
    margin-top: 10px;
`;

const Link = styled.a`
    font-size: 16px;
    color: #fff;
    cursor: pointer;
`;

const ResultContainer = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
`;

export function ForgotPassword(props, isOpen)  {

    document.title = "Forgot Password | HAXGUZ";
    const API_URL = process.env.REACT_APP_API_URL;

    const { switchToSignup } = useContext(AccountContext);

    const [email, setEmail] = useState("");
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailSentFailed, setIsEmailSentFailed] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const goSignUp = () => {
        isOpen = false;
        switchToSignup();
    };

    const handleSendOTP = async () => {

        setIsButtonVisible(false);
        setIsRequestSent(true);

        try {
            const response = await axios.post(`${API_URL}/user/forgot-password`, { email: email });
            setIsEmailSent(true);

            if(response.status === 200) {
                setIsEmailSentFailed(false);
            }
            else {
            alert(response.data.message);
            setIsEmailSent(true);
            setIsEmailSentFailed(true);
            }
    } catch (error) {
            alert(error.response.data.message);
            setIsEmailSent(true);
            setIsEmailSentFailed(true);
        }
    };

    return (
        <Container>
            <FText>Forgot Password?</FText>
            <Text>Email</Text>
            <Input type="email" placeholder="Enter Your Email Address" onChange={handleEmailChange} name="email" autoComplete="off" required/>
            {isButtonVisible? (<Button onClick={handleSendOTP}>Send OTP</Button>) : (null)}
            <ResultContainer>
            {
                isRequestSent ? (isEmailSent ?
                    (
                        isEmailSentFailed ? (
                        <>
                            <Cross/>
                            <DText>Failed to Send OTP, Retry Later</DText>
                        </>
                        ) : (
                            <>
                                <Done/>
                                <DText>Password Reset Link Sent Successfully</DText>
                            </>
                        )
                    ) : (<Loader/>) ) : (
                    null
                    )
            }
            </ResultContainer>
            <DText>Don't Have an Account? <Link onClick={goSignUp}>SignUp Now</Link></DText>
        </Container>
    );
};