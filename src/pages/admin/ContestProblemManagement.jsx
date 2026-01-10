import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { Search, Trash2, Plus, ArrowLeft, Edit, FileCode, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

export default function ContestProblemManagement() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContestAndProblems();
  }, [contestId]);

  const fetchContestAndProblems = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/contests/${contestId}`);
      setContest(res.data.contest);
      setProblems(res.data.contest.problems || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contest problems");
      navigate("/admin/contests");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (problemId) => {
    if (!window.confirm("Are you sure you want to delete this contest problem?")) return;

    try {
      // I need a delete route for contest problems in admin
      await api.delete(`/admin/contests/${contestId}/problems/${problemId}`);
      setProblems(problems.filter(p => p._id !== problemId));
      toast.success("Problem removed from contest");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete problem");
    }
  };

  if (loading) return <div className="text-center py-20 text-[#8A8A8A]">Loading contest problems...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={() => navigate("/admin/contests")}
            className="mb-4 flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Contests
          </button>
          <h1 className="text-3xl font-bold text-white">
            Manage Problems: <span className="text-[#FFA217]">{contest?.title}</span>
          </h1>
        </div>
        <Link 
          to={`/admin/contests/${contestId}/problems/create`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFA217] text-black font-bold hover:bg-[#FFA217]/90 transition-colors"
        >
          <Plus size={18} /> Add Problem
        </Link>
      </div>

      <div className="bg-[#282828] border border-[#3E3E3E] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#3E3E3E] text-[#8A8A8A] text-xs uppercase font-bold">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Points</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3E3E3E]">
            {problems.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-[#8A8A8A]">No problems added to this contest yet.</td></tr>
            ) : (
              problems.map((problem) => (
                <tr key={problem._id} className="hover:bg-[#3E3E3E]/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileCode size={18} className="text-[#8A8A8A]" />
                      <span className="font-medium text-white">{problem.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-[#3E3E3E] text-[#DAE0DE] text-[10px] font-bold uppercase">
                      {problem.inputType}
                    </span>
                  </td>
                  <td className="p-4 text-[#DAE0DE]">
                    {problem.points}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/contests/${contestId}/problems/edit/${problem._id}`}
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
