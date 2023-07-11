import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./user/Login";
import EventPage from "./eventPage/EventPage";

function AnimatedRoute(){
    const location = useLocation();

    return (
        <AnimatePresence>
          <Routes key={location.pathname} location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/event/:id" element={<EventPage />} />
          </Routes>
      </AnimatePresence>
    )
}

export default AnimatedRoute;