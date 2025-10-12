// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landing_Page/Landing_Page";
import SignUp from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import BookingConsultation from "./Components/BookingConsultation";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* keep this as a placeholder until you build it */}
        <Route
          path="/appointments"
          element={<h2 style={{ padding: 24 }}>Appointments Page (placeholder)</h2>}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        <Route path="/booking" element={<BookingConsultation />} />
      </Routes>
    </BrowserRouter>
  );
}
