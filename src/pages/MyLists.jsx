import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { 
  Play, Plus, Share2, MoreHorizontal, 
  RotateCcw, Search, Filter, Shuffle,
  Lock, Globe, Star
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProblemTable from "../components/ProblemTable";
import ProblemListSidebar from "../components/ProblemList/ProblemListSidebar";
import CreateListModal from "../components/ProblemList/CreateListModal";
import AddQuestionsModal from "../components/ProblemList/AddQuestionsModal";
import ListContextMenu from "../components/ProblemList/ListContextMenu";
import { AuthContext } from "../context/AuthContext";
import { CollectionContext } from "../context/CollectionContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import toast from "react-hot-toast";

export default function MyLists() {
  const { user } = useContext(AuthContext);
  const { listId } = useParams();
  const navigate = useNavigate();
  const { collections, openCreateModal, deleteCollection, fetchCollections } = useContext(CollectionContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeListId, setActiveListId] = useState(listId || 'favorites');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listId) {
      setActiveListId(listId);
    } else {
      setActiveListId('favorites');
    }
  }, [listId]);
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/users/me/bookmarks");
      setBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchBookmarks();
      setLoading(false);
    };
    init();
  }, []);

  const activeList = activeListId === 'favorites' 
    ? { 
        _id: 'favorites', 
        name: 'Favorite', 
        description: 'Your bookmarked problems', 
        isPrivate: true, 
        problems: bookmarks 
      }
    : collections.find(c => c._id === activeListId);

  const handleAddQuestions = async (problemIds) => {
    try {
      await Promise.all(problemIds.map(pid => 
        api.post(`/collections/${activeListId}/problems`, { problemId: pid })
      ));
      toast.success("Questions added");
      fetchCollections();
      setIsAddModalOpen(false);
    } catch (err) {
      toast.error("Failed to add questions");
    }
  };

  const handleContextMenuAction = async (action) => {
    if (!activeList) return;
    
    switch (action) {
      case 'edit':
        openCreateModal(activeList);
        break;
      case 'privacy':
        await api.put(`/collections/${activeList._id}`, { isPrivate: !activeList.isPrivate });
        toast.success(`List is now ${!activeList.isPrivate ? 'private' : 'public'}`);
        fetchCollections();
        break;
      case 'delete':
        if (window.confirm("Are you sure you want to delete this list?")) {
          await deleteCollection(activeList._id);
          navigate('/list/favorites');
        }
        break;
      case 'fork':
        await api.post(`/collections/${activeList._id}/fork`);
        toast.success("List forked");
        fetchCollections();
        break;
    }
  };

  const openContextMenu = (e) => {
    e.preventDefault();
    if (activeListId === 'favorites') return;
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setIsContextMenuOpen(true);
  };

  // Progress Data for Chart
  const solvedCount = activeList?.problems?.filter(p => user?.solvedProblems?.some(sp => String(sp.problemId) === String(p._id))).length || 0;
  const totalCount = activeList?.problems?.length || 0;
  
  const chartData = [
    { name: 'Solved', value: solvedCount, color: 'var(--brand-orange)' },
    { name: 'Remaining', value: Math.max(0, totalCount - solvedCount), color: 'var(--bg-tertiary)' }
  ];

  const difficultyStats = {
    easy: activeList?.problems?.filter(p => p.difficulty === 'easy').length || 0,
    medium: activeList?.problems?.filter(p => p.difficulty === 'medium').length || 0,
    hard: activeList?.problems?.filter(p => p.difficulty === 'hard').length || 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-full mx-auto w-full flex gap-6">
        
        {/* Sidebar */}
        <ProblemListSidebar 
          activeListId={activeListId}
          onListClick={(id) => navigate(`/list/${id}`)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 min-w-0 pt-12 pr-6">
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* List Info Card */}
            <div className="lg:w-[380px] flex flex-col gap-6 p-6 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-20 h-20 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-4xl shadow-inner">
                  {activeListId === 'favorites' ? '⭐' : '📝'}
                </div>
                
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {activeList?.name}
                    {activeList?.isPrivate ? <Lock size={16} className="text-[var(--text-tertiary)]" /> : <Globe size={16} className="text-[var(--text-tertiary)]" />}
                  </h1>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {user?.username} • {totalCount} questions
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] py-2.5 rounded-xl font-bold hover:opacity-90 transition-all">
                    <Play size={18} fill="currentColor" />
                    Practice
                  </button>
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-secondary)] transition-all text-[var(--text-primary)]"
                  >
                    <Plus size={20} />
                  </button>
                  <button className="p-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-secondary)] transition-all text-[var(--text-primary)]">
                    <Share2 size={20} />
                  </button>
                  <button 
                    onClick={openContextMenu}
                    className="p-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-secondary)] transition-all text-[var(--text-primary)]"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {activeList?.description && (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {activeList.description}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-[var(--border-primary)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm">Progress</h3>
                  <button className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                    <RotateCcw size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          innerRadius={35}
                          outerRadius={50}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold leading-none">{solvedCount}</span>
                      <span className="text-[10px] text-[var(--text-tertiary)] uppercase font-bold">/{totalCount}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--color-easy)] font-bold">Easy</span>
                      <span className="text-[var(--text-secondary)]">{difficultyStats.easy}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--color-medium)] font-bold">Med.</span>
                      <span className="text-[var(--text-secondary)]">{difficultyStats.medium}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--color-hard)] font-bold">Hard</span>
                      <span className="text-[var(--text-secondary)]">{difficultyStats.hard}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Table Area */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search questions" 
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-orange)]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    <Filter size={18} />
                  </button>
                  <button className="p-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    <Shuffle size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl overflow-hidden shadow-sm">
                {activeList?.problems?.length > 0 ? (
                  <ProblemTable problems={activeList.problems} loading={false} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                    <div className="w-24 h-24 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mb-6 text-4xl">
                      📭
                    </div>
                    <h3 className="text-lg font-bold mb-2">No questions in this list yet</h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-6">
                      Start building your collection by adding some problems to this list.
                    </p>
                    <button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[var(--brand-orange)]/20"
                    >
                      Add Questions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AddQuestionsModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddQuestions}
        existingProblemIds={activeList?.problems?.map(p => p._id) || []}
      />

      <ListContextMenu 
        isOpen={isContextMenuOpen}
        onClose={() => setIsContextMenuOpen(false)}
        position={contextMenuPos}
        onAction={handleContextMenuAction}
        list={activeList}
      />
    </div>
  );
}
