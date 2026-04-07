import { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Briefcase, Award } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState({ skills: [], schemes: [], ideas: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await API.get("/recommendations");
        setRecommendations(res.data);
      } catch (err) {
        console.error("Failed to load recommendations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Welcome back, <span className="text-indigo-600">{user?.name}</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Here are some curated opportunities and recommendations to help you grow based on your interests.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
            </div>
            {recommendations.skills?.length > 0 ? (
              <div className="space-y-4">
                {recommendations.skills.map((skill) => (
                  <div key={skill._id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                    <h3 className="font-semibold text-gray-900">{skill.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                    <span className="inline-block mt-3 text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md">
                      Level: {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">No specific skills to recommend right now.</p>
            )}
          </div>

          {/* Schemes Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Schemes</h2>
            </div>
            {recommendations.schemes?.length > 0 ? (
              <div className="space-y-4">
                {recommendations.schemes.map((scheme) => (
                  <div key={scheme._id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                    <h3 className="font-semibold text-gray-900">{scheme.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{scheme.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">Update interests to see government schemes.</p>
            )}
          </div>

          {/* Business Ideas Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Projects & Ideas</h2>
            </div>
            {recommendations.ideas?.length > 0 ? (
              <div className="space-y-4">
                {recommendations.ideas.map((idea) => (
                  <div key={idea._id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                    <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{idea.description}</p>
                    <span className="inline-block mt-3 text-xs font-medium bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md">
                      Required Investment: <span className="capitalize">{idea.investmentLevel}</span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">Add more interests to unlock ideas.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}