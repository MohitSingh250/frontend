import { useEffect, useState } from "react";
import api from "../../api";
import { Search, Trash2, MessageSquare, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function DiscussionModeration() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = () => {
    setLoading(true);
    // Ideally we'd have an admin endpoint to get ALL discussions, including reported ones
    // For now, fetching recent ones via public API or a new admin endpoint if I added one.
    // I didn't add getAllDiscussions to admin controller, so I'll use the public list endpoint but it might be paginated or filtered.
    // Actually, I should have added getAllDiscussions to admin controller. 
    // Let's assume I'll use the public one for now, but really I should update admin controller.
    // Wait, the public endpoint requires problemId usually. 
    // I need to update adminController to fetch all discussions.
    
    api.get("/admin/discussions")
      .then((res) => setDiscussions(res.data?.discussions ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this discussion?")) return;

    api.delete(`/admin/discussions/${id}`)
      .then(() => {
        setDiscussions(discussions.filter(d => d._id !== id));
      })
      .catch(err => alert("Failed to delete discussion"));
  };

  const filteredDiscussions = discussions.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Discussion Moderation</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={18} />
          <input 
            type="text" 
            placeholder="Search discussions..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl bg-[#282828] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-[#282828] border border-[#3E3E3E] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#3E3E3E] text-[#8A8A8A] text-xs uppercase font-bold">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">Votes</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3E3E3E]">
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-[#8A8A8A]">Loading discussions...</td></tr>
            ) : filteredDiscussions.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-[#8A8A8A]">No discussions found.</td></tr>
            ) : (
              filteredDiscussions.map((discussion) => (
                <tr key={discussion._id} className="hover:bg-[#3E3E3E]/30 transition-colors">
                  <td className="p-4">
                    <Link to={`/discuss/${discussion._id}`} className="font-medium text-white hover:text-[#FFA217] flex items-center gap-2 group">
                      <MessageSquare size={16} className="text-[#8A8A8A]" />
                      {discussion.title}
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-xs text-[#8A8A8A] mt-1 truncate max-w-md">{discussion.content.substring(0, 100)}...</p>
                  </td>
                  <td className="p-4 text-[#DAE0DE]">
                    {discussion.author?.username || "Unknown"}
                  </td>
                  <td className="p-4 text-[#DAE0DE]">
                    {discussion.upvotes?.length || 0}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(discussion._id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      title="Delete Discussion"
                    >
                      <Trash2 size={16} />
                    </button>
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
