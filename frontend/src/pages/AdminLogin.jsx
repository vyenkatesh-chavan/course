import { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/users/login", form);
      
      // If we want we could enforce that only role === admin logs in here,
      // but the backend handles it or App.routes will just route them correctly based on role.
      if (res.data?.user?.role !== 'admin') {
         toast.error("Unauthorized: Not an admin account");
         setLoading(false);
         return;
      }

      toast.success("Admin authorized!");
      login(res.data.token);
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      <div className="absolute top-0 -left-10 w-72 h-72 bg-gray-800 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="w-full max-w-md p-6 relative z-10">
        <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight">Admin Gateway</h1>
            <p className="text-gray-400 mt-2 text-sm font-medium">Authorized personnel only.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-600 text-white"
                placeholder="admin@sherise.sys"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">Master Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-600 text-white"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-gray-900 font-bold py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 mt-2"
            >
              {loading ? "Authenticating..." : "Authorize"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Return to Public Site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
