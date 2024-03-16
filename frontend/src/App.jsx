import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Protected from "./components/Protected";
const App = () => {
  const [authToken, setAuthToken] = useState(true);
  useEffect(() => {
    console.log("States", authToken);
  }, [authToken]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected authToken={authToken}>
              <Home />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
