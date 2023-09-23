import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Events from './event/Events';
import Page from './components/LandingPage'
import AnimatedRoute  from './AnimatedRoutes.js';
import UserProfile from './userProfile/UserProfile';
import OrganisationProfile from './organisationProfile/OrganisationProfile';
import AdminProfile from './adminPanel/adminProfile';
import TicketGenerator from './ticketGeneration/ticketGenerator';
import CertificateGenerator from './certificateGeneration/certificateGenerator';
import ResetPage from './loginSignup/resetPage';
import ViewTicket from './viewTicket/viewTicket';
import ViewCertificate from './viewCertificate/viewCertificate';
import ContactUsPage from './components/contactus';
import TicketValidator from './ticketValidator/ticketValidator';
import LeagueDetails from './components/leagueDetails';
import { PaymentSuccessUser, PaymentSuccessTeam, PaymentCancelled } from './components/payments';
import Terms from './components/mandatory/terms';
import Privacy from './components/mandatory/privacyPolicy';
import Refund from './components/mandatory/refundingPolicy';
import AdminLogin from './adminPanel/adminLogin';
import Analytics from './analysisPage/analytics';

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

        <Route path="/create-ticket/:id" element={<TicketGenerator />} />
        <Route path="/view-ticket/:id" element={<ViewTicket />} />
        <Route path="/create-certificate/:id" element={<CertificateGenerator />} />
        <Route path="/view-certificate/:id" element={<ViewCertificate />} />
        <Route path="/ticket-validator/:id" element={<TicketValidator />}/>
        <Route path="/analytics/:id" element={<Analytics />} />
        
        <Route path='/event/user/payment-success/:id' element={<PaymentSuccessUser />} />
        <Route path='/event/team/payment-success/:id/:teamname' element={<PaymentSuccessTeam />} />
        <Route path='/event/payment-cancelled/:id' element={<PaymentCancelled />} />
        
        <Route path='/league' element={<LeagueDetails />}/>
        <Route path='/terms-and-conditions' element={<Terms />}/>
        <Route path='/privacy-policy' element={<Privacy />}/>
        <Route path='/refund-policy' element={<Refund />}/>
        <Route path="/contactus" element={<ContactUsPage />}/>

        <Route path="/admin" element={<AdminProfile />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
