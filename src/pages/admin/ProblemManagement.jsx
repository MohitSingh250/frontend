import { useEffect, useState } from "react";
import api from "../../api";
import { Search, Trash2, Plus, ExternalLink, Edit } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProblemManagement() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = () => {
    setLoading(true);
    api.get("/problems") // Using public endpoint for now, ideally admin endpoint with more data
      .then((res) => setProblems(res.data?.problems ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this problem? This action cannot be undone.")) return;

    api.delete(`/admin/problems/${id}`)
      .then(() => {
        setProblems(problems.filter(p => p._id !== id));
      })
      .catch(err => alert("Failed to delete problem"));
  };

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Problem Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={18} />
            <input 
              type="text" 
              placeholder="Search problems..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-[#282828] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none w-64"
            />
          </div>
          <Link 
            to="/admin/problems/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFA217] text-black font-bold hover:bg-[#FFA217]/90 transition-colors"
          >
            <Plus size={18} /> Create New
          </Link>
        </div>
      </div>

      <div className="bg-[#282828] border border-[#3E3E3E] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#3E3E3E] text-[#8A8A8A] text-xs uppercase font-bold">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Acceptance</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3E3E3E]">
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-[#8A8A8A]">Loading problems...</td></tr>
            ) : filteredProblems.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-[#8A8A8A]">No problems found.</td></tr>
            ) : (
              filteredProblems.map((problem) => (
                <tr key={problem._id} className="hover:bg-[#3E3E3E]/30 transition-colors">
                  <td className="p-4">
                    <Link to={`/problems/${problem._id}`} className="font-medium text-white hover:text-[#FFA217] flex items-center gap-2 group">
                      {problem.title}
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold uppercase ${
                      problem.difficulty === 'easy' ? 'text-green-500' :
                      problem.difficulty === 'medium' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="p-4 text-[#DAE0DE]">
                    {problem.acceptanceRate ? `${problem.acceptanceRate}%` : 'N/A'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/problems/edit/${problem._id}`}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                        title="Edit Problem"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(problem._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        title="Delete Problem"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
