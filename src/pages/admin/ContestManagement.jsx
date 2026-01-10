import { useEffect, useState } from "react";
import api from "../../api";
import { Search, Trash2, Plus, ExternalLink, Edit, Trophy, Calendar, Clock, FileCode } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ContestManagement() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = () => {
    setLoading(true);
    api.get("/admin/contests")
      .then((res) => setContests(res.data?.contests ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this contest?")) return;

    api.delete(`/admin/contests/${id}`)
      .then(() => {
        setContests(contests.filter(c => c._id !== id));
        toast.success("Contest deleted successfully");
      })
      .catch(err => toast.error("Failed to delete contest"));
  };

  const filteredContests = contests.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Contest Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={18} />
            <input 
              type="text" 
              placeholder="Search contests..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-[#282828] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none w-64"
            />
          </div>
          <Link 
            to="/admin/contests/create"
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
              <th className="p-4">Contest</th>
              <th className="p-4">Type</th>
              <th className="p-4">Start Time</th>
              <th className="p-4">Participants</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3E3E3E]">
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-[#8A8A8A]">Loading contests...</td></tr>
            ) : filteredContests.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-[#8A8A8A]">No contests found.</td></tr>
            ) : (
              filteredContests.map((contest) => (
                <tr key={contest._id} className="hover:bg-[#3E3E3E]/30 transition-colors">
                  <td className="p-4">
                    <Link to={`/contest/${contest._id}`} className="font-medium text-white hover:text-[#FFA217] flex items-center gap-2 group">
                      <Trophy size={16} className="text-[#FFA217]" />
                      {contest.title}
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-[#3E3E3E] text-[#DAE0DE] text-[10px] font-bold uppercase">
                      {contest.type}
                    </span>
                  </td>
                  <td className="p-4 text-[#DAE0DE]">
                    <div className="flex flex-col text-xs">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(contest.startTime).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 text-[#8A8A8A]"><Clock size={12} /> {new Date(contest.startTime).toLocaleTimeString()}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#DAE0DE]">
                    {contest.participants?.length || 0}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/contests/${contest._id}/problems`}
                        className="p-2 rounded-lg bg-[#FFA217]/10 text-[#FFA217] hover:bg-[#FFA217]/20 transition-colors"
                        title="Manage Problems"
                      >
                        <FileCode size={16} />
                      </Link>
                      <Link 
                        to={`/admin/contests/edit/${contest._id}`}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                        title="Edit Contest"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(contest._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        title="Delete Contest"
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
