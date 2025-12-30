import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("client_token");

  // Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/client/login" replace />;
  }

  return children;
}
