import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { SweetAlert } from "../components/SweetAlert";
import {Html5QrcodeScanner} from "html5-qrcode";

import UserDefault from "./icons/user_default.png";

const Page = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const ValidatorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`;

const InputField = styled.input`
  width: 70%;
  height: 52px;
  outline: none;
  border: 2px solid rgba(200, 200, 200);
  border-radius: 10px;
  padding: 0px 10px;
  border-bottom: 2px solid rgba(200, 200, 200, 0.4);
  transition: all 200ms ease-in-out;
  font-size: 16px;

  margin: 11px 0 11px 0;

  &::placeholder {
    color: rgba(200, 200, 225, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #7848f4;
  }
`;

const SubmitButton = styled.button`
  width: 50%;
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

const TicketValidator = () => {
    const [qrCodeDetected, setQRCodeDetected] = useState(false);
    const { id } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const [ticketCode, setTicketCode] = useState("");
    const [userData, setUserData] = useState(null);
    const authToken = Cookies.get("authToken");

    useEffect(() => {

      document.title = "Haxguz | Ticket Validator";

      if (!authToken) {
        window.location.href = "/login";
      }
        function onScanSuccess(decodedText, decodedResult) {
            setTicketCode(decodedText);
            setQRCodeDetected(true);
        }
    
        function onScanFailure(error) {
        }
    
        let html5QrcodeScanner = new Html5QrcodeScanner(
          "reader",
          { fps: 10, qrbox: { width: 250, height: 250 } }, false
        );
    
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    
        return () => {
          html5QrcodeScanner.clear();
        };
      }, [qrCodeDetected, authToken]);

    const handleTicketCodeChange = (e) => {
        setTicketCode(e.target.value)
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${API_URL}/ticket/validator/${id}`,
            {ticketCode: ticketCode},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Bypass-Tunnel-Reminder': 'eventaz',
                },
            },
            );

            if (response.status === 200){
              setUserData(response.data.user);
              alert("user registered");
            }
            else{
                alert("user not registered")
            }
        } catch (error) {
            console.log(error);
            await SweetAlert({
                title:"OOps",
                icon:"error",
                children:"Please Try Again Later"
            });
        }
    }; 

    return (
        <Page>
          <h1>Ticket Validator</h1>
            <ValidatorContainer>
                <div id="reader" style={{
                width: '60vw',
                height: '60vh',
                display: qrCodeDetected ? 'none' : 'block'
                }} />
                <InputField type="text" placeholder="Ticket Identifier" onChange={handleTicketCodeChange} value={ticketCode} autoComplete="off" required/>
                <SubmitButton type="submit" onClick={handleSubmit}>Validate</SubmitButton>
            </ValidatorContainer>
            {userData && (
              <>
              { userData.profilePicture === "" ? <img src={UserDefault} alt="Default Profile"/> :
                <img src={userData.profilePicture} alt="Profile"/>}
              <p>{userData.fname}</p>
              <p>{userData.email}</p>
              </>
            )}
        </Page>
    );
};

export default TicketValidator;