import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import ProblemForm from "./ProblemForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateProblem() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.post("/admin/problems", formData);
      toast.success("Problem created successfully!");
      navigate("/admin/problems");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate("/admin/problems")}
        className="mb-8 flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Problems
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Create New Problem</h1>
      
      <ProblemForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate("/admin/problems")} 
        loading={loading} 
      />
    </div>
  );
}
