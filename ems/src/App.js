import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Events from './event/Events';
import Login from './user/Login';
import Page from './components/LandingPage'

const App = () => {
  //const user = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </Router>
  );
};

export default App;
