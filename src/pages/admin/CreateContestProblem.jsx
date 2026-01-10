import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import ContestProblemForm from "./ContestProblemForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateContestProblem() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.post(`/admin/contests/${contestId}/problems`, formData);
      toast.success("Problem added to contest!");
      navigate(`/admin/contests/${contestId}/problems`);
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
        onClick={() => navigate(`/admin/contests/${contestId}/problems`)}
        className="mb-8 flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Contest Problems
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Add Problem to Contest</h1>
      
      <ContestProblemForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate(`/admin/contests/${contestId}/problems`)} 
        loading={loading} 
      />
    </div>
  );
}
