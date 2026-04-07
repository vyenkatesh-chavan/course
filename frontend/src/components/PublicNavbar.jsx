import { Link, useLocation } from "react-router-dom";

export default function PublicNavbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 tracking-tight">
              SheRise
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
             {location.pathname !== '/admin-login' && (
               <Link 
                 to="/admin-login" 
                 className="text-gray-500 font-semibold hover:text-indigo-600 transition"
               >
                 Admin Login
               </Link>
             )}
             
             {location.pathname !== '/login' && (
               <Link 
                 to="/login" 
                 className="text-gray-600 font-bold hover:text-indigo-600 transition ml-2"
               >
                 Login (User)
               </Link>
             )}
             
             {location.pathname !== '/register' && (
               <Link 
                 to="/register" 
                 className="bg-indigo-600 text-white font-bold px-5 py-2 rounded-xl shadow-sm hover:bg-indigo-700 transition"
               >
                 Signup (User)
               </Link>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}
