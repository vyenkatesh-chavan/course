import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center text-xl text-gray-500 font-semibold tracking-wide">Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center text-xl text-gray-500 font-semibold tracking-wide">Loading...</div>;

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
