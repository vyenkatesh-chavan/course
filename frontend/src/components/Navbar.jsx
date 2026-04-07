import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, LayoutDashboard, BookOpen, Award, Briefcase, Bot } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
          isActive 
            ? "bg-indigo-50 text-indigo-700" 
            : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
        }`}
      >
        <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 tracking-tight">
              SheRise
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              <NavLink to="/skills" icon={BookOpen}>Skills</NavLink>
              <NavLink to="/schemes" icon={Award}>Schemes</NavLink>
              <NavLink to="/ideas" icon={Briefcase}>Projects</NavLink>
              <NavLink to="/chat" icon={Bot}>Chat Assistant</NavLink>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              <User className="w-5 h-5 mr-1.5" /> 
              <span className="hidden sm:inline">{user?.name}</span>
            </Link>
            <button 
              onClick={logout}
              className="flex items-center bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-full font-medium transition-all"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="md:hidden border-t border-gray-100 bg-white/90 backdrop-blur-md overflow-x-auto">
        <div className="flex justify-around items-center p-2 min-w-max gap-2 px-4">
           <NavLink to="/dashboard" icon={LayoutDashboard}>Dash</NavLink>
           <NavLink to="/skills" icon={BookOpen}>Skills</NavLink>
           <NavLink to="/schemes" icon={Award}>Schemes</NavLink>
           <NavLink to="/ideas" icon={Briefcase}>Projects</NavLink>
           <NavLink to="/chat" icon={Bot}>Chat</NavLink>
        </div>
      </div>
    </nav>
  );
}