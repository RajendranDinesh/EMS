import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Events from './event/Events';
import Page from './components/LandingPage'
import  AnimatedRoute  from './AnimatedRoutes.js';

const App = () => {
  //const user = localStorage.getItem('token');

  return (
    <Router>
      <AnimatedRoute></AnimatedRoute>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/page" element={<Page />} />
      </Routes>
    </Router>
  );
};

export default App;
