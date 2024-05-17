import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Main from "./components/Main";

import Admin from "./components/Admin/Admin";

import PatientMain from "./components/Patient/PatientMain";
import PharmacistMain from "./components/Pharmacist/PharmacistMain";
import DoctorMain from "./components/Doctor/DoctorMain";

import Navbar from "./components/Navbar";

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthTokenBeforeUnload = (event) => {
      const token = getAuthTokenFromCookie();
      if (!token) {
        // Prevent the page from unloading
        event.preventDefault();
        // Prompt the user to stay on the page
        event.returnValue = "";
        // Navigate to login page
        navigate("/login");
      }
    };

    window.addEventListener("beforeunload", checkAuthTokenBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", checkAuthTokenBeforeUnload);
    };
  }, []);

  const getAuthTokenFromCookie = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    return cookieValue ? cookieValue.split("=")[1] : null;
  };
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="main" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="patient-main" element={<PatientMain />} />
          <Route path="/doctor-main" element={<DoctorMain />} />
          <Route path="/pharmacist-main" element={<PharmacistMain />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
