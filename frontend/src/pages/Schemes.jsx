import { useEffect, useState } from "react";
import API from "../api/api";
import { Award, Search, Bookmark, ExternalLink, Plus, X, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Schemes() {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", eligibility: "", benefits: "", category: "", link: "" });

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await API.get("/schemes?limit=100");
      setSchemes(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/schemes", form);
      toast.success("Scheme published successfully!");
      setSchemes([res.data, ...schemes]);
      setShowForm(false);
      setForm({ name: "", description: "", eligibility: "", benefits: "", category: "", link: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create scheme. Admins only.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this scheme?")) return;
    try {
      await API.delete(`/schemes/${id}`);
      toast.success("Scheme successfully deleted!");
      setSchemes(schemes.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete scheme.");
    }
  };

  const handleSave = async (id) => {
    try {
      await API.post("/users/save-item", { type: "scheme", itemId: id });
      toast.success("Bookmarked to Profile!");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const filteredSchemes = schemes.filter((s) => 
    s.name?.toLowerCase().includes(search.toLowerCase()) || 
    (s.category && s.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <Award className="w-8 h-8 text-green-600" />
            Government Schemes
          </h1>
          <p className="mt-2 text-gray-500">Discover funding, grants, and support opportunities.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search schemes or areas..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {user?.role === 'admin' && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-green-700 transition"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Cancel' : 'Add Scheme'}
            </button>
          )}
        </div>
      </div>

      {showForm && user?.role === 'admin' && (
        <div className="mb-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Add Gov Scheme</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Scheme Name" required className="p-3 border rounded-xl" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input type="text" placeholder="Category" className="p-3 border rounded-xl" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
            </div>
            <textarea placeholder="Description" required className="w-full p-3 border rounded-xl" rows="2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Eligibility Criteria" className="p-3 border rounded-xl" value={form.eligibility} onChange={e => setForm({...form, eligibility: e.target.value})} />
              <input type="text" placeholder="Benefits Provided" className="p-3 border rounded-xl" value={form.benefits} onChange={e => setForm({...form, benefits: e.target.value})} />
            </div>
            <input type="url" placeholder="Application Link (URL)" className="w-full p-3 border rounded-xl" value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
            <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition">Publish Scheme</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.length > 0 ? filteredSchemes.map((scheme) => (
            <div key={scheme._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col relative">
              <div className="absolute top-4 right-4 flex gap-2">
                {(user?.role === 'admin' || user?._id === scheme.createdBy) && (
                  <button onClick={() => handleDelete(scheme._id)} className="p-2 bg-red-50 rounded-full hover:bg-red-100 hover:text-red-600 transition text-red-500" title="Delete Scheme">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => handleSave(scheme._id)} className="p-2 bg-gray-50 rounded-full hover:bg-green-50 hover:text-green-600 transition text-gray-400" title="Bookmark">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between items-start mb-3 pr-10">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{scheme.name}</h3>
              </div>
              
              <div className="mb-2">
                 {scheme.category && (
                    <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-md capitalize">
                      {scheme.category}
                    </span>
                  )}
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{scheme.description}</p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100 flex-grow">
                {scheme.eligibility && (
                  <div className="mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Eligibility</span>
                    <p className="text-sm text-gray-800">{scheme.eligibility}</p>
                  </div>
                )}
                {scheme.benefits && (
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Benefits</span>
                    <p className="text-sm text-gray-800">{scheme.benefits}</p>
                  </div>
                )}
              </div>

              {scheme.link && (
                <div className="mt-auto">
                  <a 
                    href={scheme.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-500 transition-colors"
                  >
                    Apply / Learn More
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          )) : (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium text-lg">No schemes available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
