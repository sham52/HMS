import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ authToken, children }) => {
  if (!authToken) return <Navigate to="/login" />;
  return children;
};

export default Protected;
