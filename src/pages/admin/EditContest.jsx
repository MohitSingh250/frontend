import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import ContestForm from "./ContestForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function EditContest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/admin/contests/${id}`)
      .then((res) => setContest(res.data.contest))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch contest");
        navigate("/admin/contests");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await api.put(`/admin/contests/${id}`, formData);
      toast.success("Contest updated successfully!");
      navigate("/admin/contests");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update contest");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-[#8A8A8A]">Loading contest...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate("/admin/contests")}
        className="mb-8 flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Contests
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Edit Contest</h1>
      
      <ContestForm 
        initialData={contest}
        onSubmit={handleSubmit} 
        onCancel={() => navigate("/admin/contests")} 
        loading={saving} 
      />
    </div>
  );
}
