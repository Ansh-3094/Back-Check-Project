import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
  const authStatus = useSelector((state) => state.auth.status);
  const hasToken = Boolean(localStorage.getItem("accessToken"));

  // Protected routes: require a valid session
  if (authentication) {
    // If there's a token but Redux auth state isn't ready yet, wait (avoid flicker)
    if (hasToken && !authStatus) {
      return null;
    }

    // No valid session -> redirect to landing
    if (!hasToken || !authStatus) {
      return <Navigate to="/" replace />;
    }

    return children;
  }

  // Public-only routes (e.g. login/signup): if already logged in, send to main app
  if (!authentication && hasToken && authStatus) {
    return <Navigate to="/explore" replace />;
  }

  return children;
}

export default AuthLayout;
