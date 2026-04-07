import { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", interests: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const submittedForm = {
      ...form,
      interests: form.interests ? form.interests.split(",").map(i => i.trim()) : []
    };

    try {
      const res = await API.post("/users/register", submittedForm);
      toast.success("Registration successful! Welcome to SheRise.");
      if (res.data.token) {
        login(res.data.token);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Failed to register";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-12">
      <div className="absolute top-0 -left-10 md:-left-40 w-72 md:w-96 h-72 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-10 md:-right-40 w-72 md:w-96 h-72 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="w-full max-w-lg p-6 sm:p-8 relative z-10 animate-fade-in">
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 tracking-tight">Join SheRise</h1>
            <p className="text-gray-500 mt-2 text-sm font-medium">Start your journey today.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-gray-400"
                placeholder="Jane Doe"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-gray-400"
                placeholder="you@example.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-gray-400"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-1.5">Interests <span className="text-gray-400 font-normal">(Comma separated)</span></label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-gray-400"
                placeholder="e.g. tech, farming, finance"
                onChange={(e) => setForm({ ...form, interests: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 mt-4 text-center"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}