import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Events from './event/Events';
import Page from './components/LandingPage'
import  AnimatedRoute  from './AnimatedRoutes.js';
import UserProfile from './userProfile/UserProfile';
import OrganisationProfile from './organisationProfile/OrganisationProfile';
import TicketGenerator from './ticketGeneration/ticketGenerator';
import CertificateGenerator from './certificateGeneration/certificateGenerator';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <AnimatedRoute></AnimatedRoute>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/events" element={<Events />} />

        {token ? (
          <Route path="/user" element={<UserProfile />} />
          ) : (
            <Route path="/user" element={<Navigate to="/login" replace={true} />} />
        )}
        
        <Route path="/organisation" element={<OrganisationProfile />} />
        <Route path="/ticket" element={<TicketGenerator />} />
        <Route path="/certificate" element={<CertificateGenerator />} />

        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </Router>
  );
};

export default App;
