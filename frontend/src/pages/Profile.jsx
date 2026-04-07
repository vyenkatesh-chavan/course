import { useAuth } from "../context/AuthContext";
import { User, BookOpen, Award, Briefcase, ChevronRight, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full mix-blend-multiply blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="w-24 h-24 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow-md relative z-10">
          <User className="w-10 h-10 text-indigo-600" />
        </div>
        
        <div className="text-center md:text-left relative z-10 flex-grow">
          <h1 className="text-3xl font-extrabold text-gray-900">{user?.name}</h1>
          <p className="text-gray-500 font-medium mb-1">{user?.email}</p>
          <div className="flex gap-2 justify-center md:justify-start mt-3">
             <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
               Role: {user?.role || 'user'}
             </span>
             {user?.interests?.length > 0 && (
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md">
                 {user.interests.length} Interests
               </span>
             )}
          </div>
        </div>

        <button 
          onClick={logout}
          className="md:ml-auto flex items-center justify-center gap-2 bg-white text-red-600 border border-red-100 px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-red-50 hover:border-red-200 transition"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Saved Skills */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl"><BookOpen className="w-5 h-5 text-blue-600" /></div>
              <h2 className="text-xl font-bold text-gray-900">Bookmarked Skills</h2>
           </div>
           
           <div className="space-y-4">
             {user?.savedSkills && user.savedSkills.length > 0 ? user.savedSkills.map(skill => (
               <div key={skill._id} className="p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition border border-transparent hover:border-gray-100">
                 <h3 className="font-bold text-gray-900">{skill.title}</h3>
                 <p className="text-sm text-gray-500 mt-1 line-clamp-1">{skill.description}</p>
               </div>
             )) : (
               <div className="text-center py-6 text-gray-400">
                 <p className="text-sm">No skills saved yet.</p>
                 <Link to="/skills" className="inline-flex items-center text-blue-600 font-medium text-sm mt-2 hover:underline">Explore Skills <ChevronRight className="w-4 h-4" /></Link>
               </div>
             )}
           </div>
        </div>

        {/* Saved Schemes */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-50 rounded-xl"><Award className="w-5 h-5 text-green-600" /></div>
              <h2 className="text-xl font-bold text-gray-900">Enrolled Schemes</h2>
           </div>
           
           <div className="space-y-4">
             {user?.savedSchemes && user.savedSchemes.length > 0 ? user.savedSchemes.map(scheme => (
               <div key={scheme._id} className="p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition border border-transparent hover:border-gray-100">
                 <h3 className="font-bold text-gray-900">{scheme.name}</h3>
                 {scheme.link && (
                    <a href={scheme.link} target="_blank" rel="noreferrer" className="text-xs text-green-600 font-bold mt-2 inline-block">Official Portal &rarr;</a>
                 )}
               </div>
             )) : (
               <div className="text-center py-6 text-gray-400">
                 <p className="text-sm">No schemes saved yet.</p>
                 <Link to="/schemes" className="inline-flex items-center text-green-600 font-medium text-sm mt-2 hover:underline">Explore Schemes <ChevronRight className="w-4 h-4" /></Link>
               </div>
             )}
           </div>
        </div>

        {/* Saved Ideas */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-50 rounded-xl"><Briefcase className="w-5 h-5 text-purple-600" /></div>
              <h2 className="text-xl font-bold text-gray-900">My Project Ideas</h2>
           </div>
           
           <div className="space-y-4">
             {user?.savedIdeas && user.savedIdeas.length > 0 ? user.savedIdeas.map(idea => (
               <div key={idea._id} className="p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition border border-transparent hover:border-gray-100">
                 <h3 className="font-bold text-gray-900">{idea.title}</h3>
                 <span className="inline-block px-2 mt-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">Inv: {idea.investmentLevel}</span>
               </div>
             )) : (
               <div className="text-center py-6 text-gray-400">
                 <p className="text-sm">No ideas saved yet.</p>
                 <Link to="/ideas" className="inline-flex items-center text-purple-600 font-medium text-sm mt-2 hover:underline">Explore Ideas <ChevronRight className="w-4 h-4" /></Link>
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}