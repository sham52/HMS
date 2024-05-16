import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Protected from "./components/Protected";
import Main from "./components/Main";

import Admin from "./components/Admin/Admin";

import PatientMain from "./components/Patient/PatientMain";
import PharmacistMain from "./components/Pharmacist/PharmacistMain";
import DoctorMain from "./components/Doctor/DoctorMain";

import Navbar from "./components/Navbar";

const App = () => {
  const [authToken, setAuthToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const authTokenFromCookie = getAuthTokenFromCookie();
    if (!authTokenFromCookie) {
      navigate("/login");
    } else {
      setAuthToken(authTokenFromCookie);
    }
  }, []);

  const getAuthTokenFromCookie = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    return cookieValue ? cookieValue.split("=")[1] : null;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Protected authToken={authToken} />}>
          <Route path="/patient-main" element={<PatientMain />} />
          <Route path="/doctor-main" element={<PatientMain />} />
          <Route path="/pharmacist-main" element={<PatientMain />} />
          <Route path="/admin" element={<PatientMain />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
