import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Schemes from "./pages/Schemes";
import Ideas from "./pages/Ideas";
import Chat from "./pages/Chat";
import { Toaster } from "react-hot-toast";

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 flex flex-col">
      {user && <Navbar />}

      <div className={`flex-grow ${user ? "pt-16 md:pt-16" : ""}`}>
        {user && <div className="h-14 md:hidden"></div>}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? "/admin-dashboard" : "/dashboard"} /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={user.role === 'admin' ? "/admin-dashboard" : "/dashboard"} /> : <Register />} />
          <Route path="/admin-login" element={user ? <Navigate to={user.role === 'admin' ? "/admin-dashboard" : "/dashboard"} /> : <AdminLogin />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={user?.role === 'admin' ? <Navigate to="/admin-dashboard" /> : <Dashboard />} />
            <Route path="/admin-dashboard" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-center" toastOptions={{ style: { borderRadius: '12px' } }} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;