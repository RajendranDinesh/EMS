import { LeftContainer } from './components/LeftContainer';
import { RightContainer } from './components/RightContainer';
import { MiddleContainer } from './components/MiddleContainer';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';

const Body = styled.div`
    background-color: #1f253d;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media(max-width:1080em){
        display:flex;
        justify-content:center;
        align-items:center;
        
    }
`;

const Container = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: center;
    width: 80vw;

    @media(max-width:1080px){
        display:flex;
        flex-direction:column;
    }
   
`

const AdminProfile = () => {
    
    const API_URL = process.env.REACT_APP_API_URL;
    const authToken = Cookies.get('adminToken');

    const [name, setName] = useState("");

    useEffect(() => {
        async function fetchData() {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            };
            const response = await axios.get(`${API_URL}/admin/profile`, config);

            setName(response.data.fname);
        }
        fetchData();
        document.title = "Admin Profile";
    }
    , []);

    return (
        <Body>
            <Container>
              <LeftContainer/>
              <MiddleContainer name={name}/>
              <RightContainer />
            </Container>
        </Body>
    );
}

export default AdminProfile;