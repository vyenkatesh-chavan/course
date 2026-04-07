import { useAuth } from "../context/AuthContext";
import { Shield, Users, Award, Briefcase, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             System Admin 
             <Shield className="w-8 h-8 text-indigo-600" />
          </h1>
          <p className="mt-2 text-lg text-gray-500 max-w-2xl">
            Welcome, <strong>{user?.name}</strong>. Manage the SheRise community directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-xl"><Award className="w-6 h-6 text-green-600"/></div>
            <div>
               <p className="text-sm text-gray-500 font-bold">Manage Schemes</p>
               <Link to="/schemes" className="text-indigo-600 text-sm font-bold mt-1 hover:underline">Access Database &rarr;</Link>
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-xl"><Users className="w-6 h-6 text-blue-600"/></div>
            <div>
               <p className="text-sm text-gray-500 font-bold">Community Skills</p>
               <Link to="/skills" className="text-indigo-600 text-sm font-bold mt-1 hover:underline">Review Skills &rarr;</Link>
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-xl"><Briefcase className="w-6 h-6 text-purple-600"/></div>
            <div>
               <p className="text-sm text-gray-500 font-bold">Business Ideas</p>
               <Link to="/ideas" className="text-indigo-600 text-sm font-bold mt-1 hover:underline">Manage Ideas &rarr;</Link>
            </div>
         </div>
         
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-gray-50 p-3 rounded-xl"><Settings className="w-6 h-6 text-gray-600"/></div>
            <div>
               <p className="text-sm text-gray-500 font-bold">System Status</p>
               <p className="text-green-600 text-sm font-bold mt-1">100% Operational</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
         <h2 className="text-2xl font-bold mb-4">Operations Center</h2>
         <p className="text-gray-600">
           As an administrator, you have permission to bypass standard route parameters and publish 
           Government Schemes directly via the <Link to="/schemes" className="text-indigo-600 font-bold hover:underline">Schemes Endpoint</Link>.
         </p>
      </div>
    </div>
  );
}
