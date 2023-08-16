import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Events from './event/Events';
import Page from './components/LandingPage'
import AnimatedRoute  from './AnimatedRoutes.js';
import UserProfile from './userProfile/UserProfile';
import OrganisationProfile from './organisationProfile/OrganisationProfile';
import TicketGenerator from './ticketGeneration/ticketGenerator';
import CertificateGenerator from './certificateGeneration/certificateGenerator';
import ResetPage from './loginSignup/resetPage';

const App = () => {
  const authToken = Cookies.get('authToken');

  return (
    <Router>
      <AnimatedRoute></AnimatedRoute>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/events" element={<Events />} />

        {authToken ? (
          <Route path="/user" element={<UserProfile />} />
          ) : (
            <Route path="/user" element={<Navigate to="/login" replace={true} />} />
        )}

        <Route path="/reset-password" element={<ResetPage />} />
        
        <Route path="/organisation" element={<OrganisationProfile />} />
        <Route path="/ticket" element={<TicketGenerator />} />
        <Route path="/certificate" element={<CertificateGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;
