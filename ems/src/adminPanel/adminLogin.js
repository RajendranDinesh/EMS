import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { SweetAlert } from "../components/SweetAlert";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 90vh;
`;

const FormContainer = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    width: 50%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    width: 50%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`;

const AdminLogin = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/admin/login`, data, {
                headers: {
                    'Bypass-Tunnel-Reminder': 'eventaz',
                }
            });

            if (response.status === 201) {
                Cookies.set('adminToken', response.data.adminToken);
                window.location.href = '/admin';
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500)
            {
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
    }

    return (
        <Container>
            <h1>Admin Login</h1>
            <FormContainer>
                <Input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" autoComplete="off" required/>
                <Input type="password" name="password" value={data.password} onChange={handleChange} onKeyDown={onKeyPress} placeholder="Password" autoComplete="off" required/>
                <Button onClick={handleSubmit}>Login</Button>
            </FormContainer>
        </Container>
    );
};

export default AdminLogin;