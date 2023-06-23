import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./user/Login";

function AnimatedRoute(){
    const location = useLocation();

    return (
        <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route path="/login" element={<Login />} />
      </Routes>
      </AnimatePresence>
    )
}

export default AnimatedRoute;