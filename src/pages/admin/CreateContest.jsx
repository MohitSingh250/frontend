import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import ContestForm from "./ContestForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateContest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.post("/admin/contests", formData);
      toast.success("Contest created successfully!");
      navigate("/admin/contests");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create contest");
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

      <h1 className="text-3xl font-bold text-white mb-8">Create New Contest</h1>
      
      <ContestForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate("/admin/contests")} 
        loading={loading} 
      />
    </div>
  );
}
