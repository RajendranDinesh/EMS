import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Events from './event/Events';
import Page from './components/LandingPage'
import  AnimatedRoute  from './AnimatedRoutes.js';

const App = () => {
  //const user = localStorage.getItem('token');

  return (
    <Router>
      <AnimatedRoute></AnimatedRoute>
      <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
};

export default App;
