import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import ContestProblemForm from "./ContestProblemForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AddContestProblem() {
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingContests, setFetchingContests] = useState(true);

  useEffect(() => {
    api.get("/admin/contests")
      .then((res) => {
        setContests(res.data.contests || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch contests");
      })
      .finally(() => setFetchingContests(false));
  }, []);

  const handleSubmit = async (formData) => {
    if (!selectedContestId) {
      toast.error("Please select a contest first");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/admin/contests/${selectedContestId}/problems`, formData);
      toast.success("Problem added to contest successfully!");
      navigate(`/admin/contests/${selectedContestId}/problems`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate("/admin/contests")}
        className="mb-8 flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Contests
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Add Problem to Contest</h1>

      <div className="mb-8 space-y-2">
        <label className="text-sm font-bold text-[#8A8A8A] uppercase">Select Contest</label>
        <select
          value={selectedContestId}
          onChange={(e) => setSelectedContestId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#282828] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
          disabled={fetchingContests}
        >
          <option value="">{fetchingContests ? "Loading contests..." : "Choose a contest..."}</option>
          {contests.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title} (#{c.contestNumber})
            </option>
          ))}
        </select>
      </div>
      
      <ContestProblemForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate("/admin/contests")} 
        loading={loading} 
      />
    </div>
  );
}
