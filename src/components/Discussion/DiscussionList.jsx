import { MessageSquare, ThumbsUp, Plus, Search, User, Clock, Users } from "lucide-react";
import DiscussionDetail from "./DiscussionDetail";
import CreateDiscussion from "./CreateDiscussion";

export default function DiscussionList({ problemId }) {
  const { user } = useContext(AuthContext);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // 'list' | 'detail' | 'create'
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDiscussions();
  }, [problemId]);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/discussions/problem/${problemId}`);
      setDiscussions(res.data);
    } catch (err) {
      console.error("Error fetching discussions:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiscussions = discussions.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (view === "detail" && selectedDiscussion) {
    return (
      <div className="h-full bg-[#1A1A1A]">
        <DiscussionDetail 
          discussionId={selectedDiscussion._id} 
          onBack={() => {
            setView("list");
            fetchDiscussions();
          }} 
        />
      </div>
    );
  }

  if (view === "create") {
    return (
      <div className="h-full bg-[#1A1A1A]">
        <CreateDiscussion 
          problemId={problemId} 
          onBack={() => setView("list")} 
          onCreated={() => {
            setView("list");
            fetchDiscussions();
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#1A1A1A] text-[#DAE0DE] font-sans">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#3E3E3E] flex items-center justify-between gap-4 bg-[#282828]">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] group-focus-within:text-[#FFA217] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 bg-[#1A1A1A] border border-[#3E3E3E] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFA217] transition-all placeholder:text-[#8A8A8A]"
          />
        </div>
        <button 
          onClick={() => user ? setView("create") : alert("Please login to create a discussion")}
          className="flex items-center gap-2 px-4 py-1.5 bg-[#2DB55D] hover:bg-[#269a4f] text-white text-sm font-bold rounded-lg transition-all shrink-0"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 space-y-4">
            <div className="w-8 h-8 border-2 border-[#FFA217] border-t-transparent animate-spin rounded-full"></div>
          </div>
        ) : filteredDiscussions.length > 0 ? (
          <div className="divide-y divide-[#3E3E3E]">
            {filteredDiscussions.map((d) => (
              <div 
                key={d._id}
                onClick={() => {
                  setSelectedDiscussion(d);
                  setView("detail");
                }}
                className="group p-6 hover:bg-[#282828]/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#3E3E3E] overflow-hidden shrink-0">
                    {d.author?.avatar ? (
                      <img src={d.author.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8A8A8A]">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[12px] mb-1">
                      <span className="font-medium text-[#DAE0DE]">{d.author?.username || "Anonymous"}</span>
                      <span className="text-[#8A8A8A]">•</span>
                      <span className="text-[#8A8A8A]">{new Date(d.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                    
                    <h3 className="text-[15px] font-bold text-[#eff1f6] group-hover:text-[#2DB55D] transition-colors mb-2 line-clamp-1">
                      {d.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-[12px] text-[#8A8A8A]">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        <span>{d.upvotes?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        <span>{d.commentCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{(d.upvotes?.length || 0) * 8 + 24}</span>
                      </div>
                    </div>
                  </div>

                  {d.category && (
                    <div className="hidden sm:block">
                      <span className="px-2 py-0.5 bg-[#3E3E3E] text-[#DAE0DE] text-[10px] font-bold rounded uppercase tracking-wider">
                        {d.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 text-[#8A8A8A] space-y-4">
            <MessageSquare size={48} className="opacity-10" />
            <p className="text-sm font-medium">No discussions yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
