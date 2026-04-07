import { useEffect, useState } from "react";
import API from "../api/api";
import { Briefcase, Search, Bookmark, CheckCircle2, Plus, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Ideas() {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", requiredSkills: "", investmentLevel: "low" });

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const res = await API.get("/ideas?limit=100");
      setIdeas(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        requiredSkills: form.requiredSkills.split(",").map(i => i.trim()),
      };
      const res = await API.post("/ideas", payload);
      toast.success("Idea published successfully!");
      setIdeas([res.data, ...ideas]);
      setShowForm(false);
      setForm({ title: "", description: "", requiredSkills: "", investmentLevel: "low" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create idea");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this idea?")) return;
    try {
      await API.delete(`/ideas/${id}`);
      toast.success("Idea successfully deleted!");
      setIdeas(ideas.filter((idea) => idea._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete idea.");
    }
  };

  const handleSave = async (id) => {
    try {
      await API.post("/users/save-item", { type: "idea", itemId: id });
      toast.success("Idea Bookmarked.");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const filteredIdeas = ideas.filter((idea) => 
    idea.title?.toLowerCase().includes(search.toLowerCase()) || 
    (idea.requiredSkills && idea.requiredSkills.join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-purple-600" />
            Business Ideas & Projects
          </h1>
          <p className="mt-2 text-gray-500">Discover viable paths and share your own start-up ideas.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search ideas or skills needed..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-purple-700 transition"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Cancel' : 'Post Idea'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Share a Business Idea</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Project Title" required className="p-3 border rounded-xl" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <select className="p-3 border rounded-xl text-gray-600" value={form.investmentLevel} onChange={e => setForm({...form, investmentLevel: e.target.value})}>
                <option value="low">Low Investment</option>
                <option value="medium">Medium Investment</option>
                <option value="high">High Investment</option>
              </select>
            </div>
            <textarea placeholder="Outline your business concept..." required className="w-full p-3 border rounded-xl" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <input type="text" placeholder="Required Skills (e.g. Sales, Coding, Cooking)" className="w-full p-3 border rounded-xl" value={form.requiredSkills} onChange={e => setForm({...form, requiredSkills: e.target.value})} />
            <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition">Publish Idea</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIdeas.length > 0 ? filteredIdeas.map((idea) => (
            <div key={idea._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col relative">
              <div className="absolute top-4 right-4 flex gap-2">
                {(user?.role === 'admin' || user?._id === idea.createdBy) && (
                  <button onClick={() => handleDelete(idea._id)} className="p-2 bg-red-50 rounded-full hover:bg-red-100 hover:text-red-600 transition text-red-500" title="Delete Idea">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => handleSave(idea._id)} className="p-2 bg-gray-50 rounded-full hover:bg-purple-50 hover:text-purple-600 transition text-gray-400" title="Bookmark">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between items-start mb-3 pr-10">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{idea.title}</h3>
              </div>
              
              <div className="mb-4">
                 <span className={`text-xs font-bold px-2.5 py-1 rounded-md capitalize whitespace-nowrap ${
                    idea.investmentLevel === "low" ? "bg-green-100 text-green-700" :
                    idea.investmentLevel === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    Investment: {idea.investmentLevel || "low"}
                  </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">{idea.description}</p>
              
              <div className="flex-grow">
                {idea.requiredSkills && idea.requiredSkills.length > 0 && (
                  <div className="mb-4 border-t border-gray-50 pt-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Required Skills</span>
                    <div className="flex flex-wrap gap-2">
                       {idea.requiredSkills.map((skill, idx) => (
                         // Ignore empty skills
                         skill.trim() !== "" && (
                          <span key={idx} className="bg-purple-50 border border-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-md">
                            {skill}
                          </span>
                         )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium text-lg">No ideas found. Help by posting one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
