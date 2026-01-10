import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import ProblemForm from "./ProblemForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/problems/${id}`)
      .then((res) => setProblem(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch problem");
        navigate("/admin/problems");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await api.put(`/admin/problems/${id}`, formData);
      toast.success("Problem updated successfully!");
      navigate("/admin/problems");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update problem");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-[#8A8A8A]">Loading problem...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate("/admin/problems")}
        className="mb-8 flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Problems
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Edit Problem</h1>
      
      <ProblemForm 
        initialData={problem}
        onSubmit={handleSubmit} 
        onCancel={() => navigate("/admin/problems")} 
        loading={saving} 
      />
    </div>
  );
}
