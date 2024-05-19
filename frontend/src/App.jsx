import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

import Admin from "./components/Admin/Admin";

import PatientMain from "./components/Patient/PatientMain";
import PharmacistMain from "./components/Pharmacist/PharmacistMain";
import DoctorMain from "./components/Doctor/DoctorMain";
import Protected from "./components/Protected";

import Navbar from "./components/Navbar";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  const getAuthTokenFromLocalStorage = () => {
    return localStorage.getItem("authToken");
  };
  useEffect(() => {
    const checkAuthTokenBeforeUnload = (event) => {
      const token = getAuthTokenFromLocalStorage();
      if (!token) {
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
  }, [authToken]);

  return (
    <>
      <AuthProvider>
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="login"
            element={
              <Login isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            }
          />
          <Route
            path="register"
            element={
              <Register isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            }
          />
          <Route
            path="patient-main"
            element={
              <Protected isSignedIn={isSignedIn}>
                <PatientMain />
              </Protected>
            }
          />
          <Route
            path="doctor-main"
            element={
              <Protected isSignedIn={isSignedIn}>
                <DoctorMain />
              </Protected>
            }
          />
          <Route path="pharmacist-main" element={<PharmacistMain />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
