import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Protected from "./components/Protected";
import Main from "./components/Main";
import PatientMain from "./components/Patient/PatientMain";

const App = () => {
  const [authToken, setAuthToken] = useState(true);
  +useEffect(() => {
    console.log("States", authToken);
  }, [authToken]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/main"
          element={
            // <Protected authToken={authToken}>
            <Main />
            // </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-main" element={<PatientMain />} />
      </Routes>
    </>
  );
};

export default App;
