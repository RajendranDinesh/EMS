import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';

import Login from "./loginSignup/Login";
import EventPage from "./eventPage/EventPage";

function AnimatedRoute(){
    const location = useLocation();
    const authToken = Cookies.get("authToken");

    return (
        <AnimatePresence>
          <Routes key={location.pathname} location={location}>
            <Route path="/login" element={authToken? (<Navigate to="/" replace={true} />):(<Login />)}/>
            <Route path="/event/:id" element={<EventPage />} />
          </Routes>
      </AnimatePresence>
    )
}

export default AnimatedRoute;