import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PublicNavbar from "../components/PublicNavbar";

export default function Home() {
  const { user } = useAuth();
  
  // If user is already logged in, redirect them
  if (user) {
    return <Navigate to={user.role === 'admin' ? "/admin-dashboard" : "/dashboard"} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white font-sans">
      <PublicNavbar />
      
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 md:-left-40 w-72 md:w-96 h-72 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-10 md:-right-40 w-72 md:w-96 h-72 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10 flex flex-col items-center text-center animate-fade-in-up">
        
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100/50 border border-indigo-200 text-indigo-700 font-bold text-sm mb-6 uppercase tracking-wider backdrop-blur-sm">
          Welcome to SheRise
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6">
          Empowering your <br className="hidden md:block"/> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Path to Success
          </span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join our community hub connecting aspiring professionals and entrepreneurs with curated skills, government schemes, and reliable business ideas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/register" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5"
          >
            Join the Community
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-4 rounded-xl bg-white text-gray-800 font-bold shadow-sm border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
           <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white">
             <h3 className="font-bold text-xl text-gray-900 mb-2">Build Skills</h3>
             <p className="text-gray-600 text-sm">Access diverse training programs designed to boost your income generation capabilities.</p>
           </div>
           <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white">
             <h3 className="font-bold text-xl text-gray-900 mb-2">Find Schemes</h3>
             <p className="text-gray-600 text-sm">Explore government initiatives tailored to support your goals and career transitions.</p>
           </div>
           <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white">
             <h3 className="font-bold text-xl text-gray-900 mb-2">Launch Ideas</h3>
             <p className="text-gray-600 text-sm">Analyze self-employment modules and start building a self-sustaining business.</p>
           </div>
        </div>
      </div>
      
      {/* Footer Area with invisible admin login link */}
      <footer className="absolute bottom-6 w-full text-center z-10">
        <Link to="/admin-login" className="text-xs text-gray-400 hover:text-indigo-400 transition">
           Admin Portal Access
        </Link>
      </footer>
    </div>
  );
}
