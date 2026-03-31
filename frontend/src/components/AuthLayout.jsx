import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
  const authStatus = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);

  if (authentication && loading) {
    return null;
  }

  if (authentication && !authStatus) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthLayout;
