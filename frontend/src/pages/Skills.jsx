import { useEffect, useState } from "react";
import API from "../api/api";
import { BookOpen, Search, Bookmark, Plus, X, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Skills() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // UI States
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", level: "beginner" });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await API.get("/skills?limit=100");
      setSkills(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/skills", form);
      toast.success("Skill published successfully!");
      setSkills([res.data, ...skills]);
      setShowForm(false);
      setForm({ title: "", description: "", category: "", level: "beginner" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create skill");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this skill?")) return;
    try {
      await API.delete(`/skills/${id}`);
      toast.success("Skill successfully deleted!");
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete skill.");
    }
  };

  const handleSave = async (id) => {
    try {
      await API.post("/users/save-item", { type: "skill", itemId: id });
      toast.success("Profile updated!");
      // Real app context update would go here to immediately show checked bookmark
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const filteredSkills = skills.filter((s) => 
    s.title?.toLowerCase().includes(search.toLowerCase()) || 
    (s.category && s.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Empowerment Skills
          </h1>
          <p className="mt-2 text-gray-500">Explore training resources to build your expertise.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search skills or categories..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-blue-700 transition"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Cancel' : 'Add Skill'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Share a New Skill</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Skill Title" required className="p-3 border rounded-xl" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <input type="text" placeholder="Category (e.g. tech, crafting)" className="p-3 border rounded-xl" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
            </div>
            <textarea placeholder="Description" required className="w-full p-3 border rounded-xl" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <select className="w-full p-3 border rounded-xl" value={form.level} onChange={e => setForm({...form, level: e.target.value})}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition">Publish Skill</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.length > 0 ? filteredSkills.map((skill) => (
            <div key={skill._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col relative">
              <div className="absolute top-4 right-4 flex gap-2">
                {(user?.role === 'admin' || user?._id === skill.createdBy) && (
                  <button onClick={() => handleDelete(skill._id)} className="p-2 bg-red-50 rounded-full hover:bg-red-100 hover:text-red-600 transition text-red-500" title="Delete Skill">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => handleSave(skill._id)} className="p-2 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition text-gray-400" title="Enroll/Bookmark">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex justify-between items-start mb-4 pr-10">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{skill.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">{skill.description}</p>
              
              <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                <span className="inline-block bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md">
                  # {skill.category || 'general'}
                </span>
                <span className="text-blue-600 text-xs font-bold px-2 py-1 rounded-md capitalize">
                  {skill.level || "beginner"}
                </span>
              </div>
            </div>
          )) : (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium text-lg">No skills found. Be the first to add one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
