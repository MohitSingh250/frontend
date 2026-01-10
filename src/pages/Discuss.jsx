import React, { useState, useEffect, useContext } from "react";
import api from "../api/index";
import { AuthContext } from "../context/AuthContext";
import { 
  MessageSquare, 
  ThumbsUp, 
  Plus, 
  Search, 
  User, 
  Users,
  Clock, 
  Filter, 
  TrendingUp, 
  Hash,
  BookOpen,
  Atom,
  FlaskConical,
  Calculator,
  Lightbulb,
  BellRing,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2
} from "lucide-react";
import DiscussionDetail from "../components/Discussion/DiscussionDetail";
import CreateDiscussion from "../components/Discussion/CreateDiscussion";

const CATEGORIES = [
  { id: 'For You', label: 'For You', icon: MessageSquare },
  { id: 'Physics', label: 'Physics', icon: Atom },
  { id: 'Chemistry', label: 'Chemistry', icon: FlaskConical },
  { id: 'Mathematics', label: 'Mathematics', icon: Calculator },
  { id: 'Strategy', label: 'Strategy', icon: Lightbulb },
  { id: 'Updates', label: 'Updates', icon: BellRing },
];

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "JEE Quest 2026",
    subtitle: "Turn your practice into an epic adventure",
    buttonText: "Begin Now",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
    color: "from-purple-600 to-blue-600"
  },
  {
    id: 2,
    title: "Organic Chemistry",
    subtitle: "30 Days Mechanism Challenge",
    buttonText: "Start Learning",
    image: "https://images.unsplash.com/photo-1532187863486-abf9d39d6618?w=800&auto=format&fit=crop&q=60",
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: 3,
    title: "Physics Crash Course",
    subtitle: "Master Mechanics & Electrodynamics",
    buttonText: "Start Learning",
    image: "https://images.unsplash.com/photo-1636466483764-4e4b70a2220a?w=800&auto=format&fit=crop&q=60",
    color: "from-orange-600 to-red-600"
  },
  {
    id: 4,
    title: "Maths Marathon",
    subtitle: "Calculus & Algebra Mastery",
    buttonText: "Join Now",
    image: "https://images.unsplash.com/photo-1509228468518-180dd48a5791?w=800&auto=format&fit=crop&q=60",
    color: "from-blue-600 to-indigo-600"
  }
];

const SkeletonCard = () => (
  <div className="py-6 border-b border-[var(--border-primary)] animate-pulse space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)]"></div>
      <div className="w-32 h-4 bg-[var(--bg-tertiary)]"></div>
    </div>
    <div className="h-6 bg-[var(--bg-tertiary)] w-3/4"></div>
    <div className="h-4 bg-[var(--bg-tertiary)] w-full"></div>
    <div className="flex gap-4 pt-2">
      <div className="w-16 h-4 bg-[var(--bg-tertiary)]"></div>
      <div className="w-16 h-4 bg-[var(--bg-tertiary)]"></div>
    </div>
  </div>
);

export default function Discuss() {
  const { user } = useContext(AuthContext);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // 'list' | 'detail' | 'create'
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("For You");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'top'
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    fetchDiscussions();
    fetchTrending();
  }, [activeCategory, sortBy]);

  const fetchTrending = async () => {
    try {
      const res = await api.get("/discussions/trending");
      setTrendingTopics(res.data);
    } catch (err) {
      console.error("Error fetching trending:", err);
    }
  };

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const params = {
        sort: sortBy === "top" ? "top" : "newest",
        q: searchQuery
      };
      if (activeCategory !== "For You") params.category = activeCategory;
      
      const res = await api.get("/discussions", { params });
      setDiscussions(res.data);
    } catch (err) {
      console.error("Error fetching discussions:", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchDiscussions();
    }
  };

  if (view === "detail" && selectedDiscussion) {
    return (
      <div className="min-h-[calc(100vh-50px)] bg-[#1A1A1A] p-4 md:p-8">
        <div className="max-w-7xl mx-auto min-h-[850px] bg-[#1A1A1A] overflow-hidden">
          <DiscussionDetail 
            discussionId={selectedDiscussion._id} 
            onBack={() => {
              setView("list");
              fetchDiscussions();
            }} 
          />
        </div>
      </div>
    );
  }

  if (view === "create") {
    return (
      <div className="min-h-[calc(100vh-50px)] bg-[#1A1A1A] p-4 md:p-8">
        <div className="max-w-5xl mx-auto min-h-[800px] bg-[#282828] border border-[#3E3E3E] rounded-xl overflow-hidden shadow-2xl">
          <CreateDiscussion 
            onBack={() => setView("list")} 
            onCreated={() => {
              setView("list");
              fetchDiscussions();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-50px)] bg-[#1A1A1A] text-[#DAE0DE] font-sans selection:bg-[#FFA217] selection:text-black">
      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* Top Carousel - LeetCode Style */}
          <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar snap-x">
            {CAROUSEL_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className={`min-w-[320px] h-[180px] rounded-xl p-6 relative overflow-hidden snap-start flex flex-col justify-between group cursor-pointer border border-white/5`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:scale-105 transition-transform duration-700`}></div>
                <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded uppercase tracking-wider">New</span>
                  </div>
                  <h3 className="text-xl font-black leading-tight">{item.title}</h3>
                  <p className="text-xs font-medium opacity-80 mt-1">{item.subtitle}</p>
                </div>
                
                <button className="relative z-10 w-fit px-4 py-2 bg-white text-black text-[11px] font-black rounded-lg hover:bg-gray-100 transition-colors">
                  {item.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Tab Navigation & Sort */}
          <div className="flex flex-col space-y-6 mb-8">
            <div className="flex items-center justify-between border-b border-[#3E3E3E]">
              <div className="flex items-center gap-8">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`pb-4 text-sm font-medium transition-all relative ${
                      activeCategory === cat.id 
                        ? "text-white" 
                        : "text-[#8A8A8A] hover:text-white"
                    }`}
                  >
                    {cat.label}
                    {activeCategory === cat.id && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
                    )}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => user ? setView("create") : alert("Please login to create a discussion")}
                className="mb-4 flex items-center gap-2 px-5 py-2 bg-[#2DB55D] hover:bg-[#269a4f] text-white text-sm font-bold rounded-lg transition-all"
              >
                <Plus size={18} strokeWidth={3} />
                Create
              </button>
            </div>

            <div className="flex items-center gap-6 text-xs font-medium text-[#8A8A8A]">
              <button 
                onClick={() => setSortBy("top")}
                className={`flex items-center gap-1.5 hover:text-white transition-colors ${sortBy === 'top' ? 'text-white' : ''}`}
              >
                <TrendingUp size={14} />
                Most Votes
              </button>
              <button 
                onClick={() => setSortBy("newest")}
                className={`flex items-center gap-1.5 hover:text-white transition-colors ${sortBy === 'newest' ? 'text-white' : ''}`}
              >
                <Clock size={14} />
                Newest
              </button>
            </div>
          </div>

          {/* Feed - LeetCode Style Cards */}
          <div className="space-y-0">
            {loading ? (
              <div className="space-y-0">
                {[1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : discussions.length > 0 ? (
              discussions.map((d) => (
                <div 
                  key={d._id}
                  onClick={() => {
                    setSelectedDiscussion(d);
                    setView("detail");
                  }}
                  className="group py-6 border-b border-[#3E3E3E] hover:bg-[#282828]/50 transition-all cursor-pointer px-2 -mx-2 rounded-lg"
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
                      <div className="flex items-center gap-2 text-[13px] mb-1">
                        <span className="font-medium text-[#DAE0DE]">{d.author?.username || "Anonymous"}</span>
                        <span className="text-[#8A8A8A]">•</span>
                        <span className="text-[#8A8A8A]">{new Date(d.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#eff1f6] group-hover:text-[#2DB55D] transition-colors mb-2 line-clamp-1">
                        {d.title}
                      </h3>
                      
                      <p className="text-[14px] text-[#8A8A8A] line-clamp-2 mb-4 leading-relaxed">
                        {d.content?.replace(/[#*`]/g, '').slice(0, 180)}...
                      </p>

                      <div className="flex items-center gap-6 text-[13px] text-[#8A8A8A]">
                        <div className="flex items-center gap-1.5">
                          <ThumbsUp size={14} />
                          <span>{d.upvotes?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare size={14} />
                          <span>{d.commentCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={14} />
                          <span>{d.views || 0}</span>
                        </div>
                      </div>
                    </div>

                    {d.category && (
                      <div className="hidden sm:block">
                        <span className="px-2 py-1 bg-[#3E3E3E] text-[#DAE0DE] text-[10px] font-bold rounded uppercase tracking-wider">
                          {d.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-[#8A8A8A]">No discussions found in this category.</p>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar: LeetCode Explore Style */}
        <aside className="w-full lg:w-[320px] shrink-0 space-y-8">
          
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] group-focus-within:text-[#FFA217] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-12 pr-4 py-2.5 bg-[#282828] border border-[#3E3E3E] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFA217] transition-all placeholder:text-[#8A8A8A]"
            />
          </div>

          <div className="bg-[#282828] border border-[#3E3E3E] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#3E3E3E] flex items-center gap-2">
              <TrendingUp size={18} className="text-[#FFA217]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h2>
            </div>
            
            <div className="p-2">
              {trendingTopics.length > 0 ? (
                trendingTopics.map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      setSearchQuery(item.tag);
                      fetchDiscussions();
                    }}
                    className="w-full p-3 hover:bg-[#3E3E3E] rounded-lg transition-all text-left group"
                  >
                    <p className="text-[11px] text-[#8A8A8A] font-bold uppercase tracking-widest mb-2">#{item.tag}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-bold text-[#eff1f6] group-hover:text-[#FFA217] transition-colors line-clamp-1">{item.tag}</p>
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="w-5 h-5 rounded-full border border-[#282828] bg-[#3E3E3E] flex items-center justify-center overflow-hidden">
                            <User size={10} className="text-[#8A8A8A]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-[#8A8A8A]">No trending topics yet</div>
              )}
            </div>
            
            <button className="w-full p-4 text-center text-xs font-bold text-[#2DB55D] hover:bg-[#3E3E3E] transition-all border-t border-[#3E3E3E]">
              Show More
            </button>
          </div>

          {/* Footer Links */}
          <div className="px-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[#8A8A8A] font-medium">
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">More</a>
            <p className="w-full mt-2">Copyright © 2026 Orbit</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
