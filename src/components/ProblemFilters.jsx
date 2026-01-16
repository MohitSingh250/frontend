import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown, ChevronsRight, Atom, FlaskConical, Calculator, Layers, Code2, Database, Terminal, Cpu } from "lucide-react";
import api from "../api/index.js";

export default function ProblemFilters({ filters, setFilters, userStats }) {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [localSearch, setLocalSearch] = useState(filters.q);
  const [showFilters, setShowFilters] = useState(false);
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Check if we are at the end (with a small buffer)
      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    setLocalSearch(filters.q);
  }, [filters.q]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.q) {
        setFilters(prev => ({ ...prev, q: localSearch, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setFilters, filters.q]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTopics(true);
        setLoadingTags(true);
        setLoadingSubjects(true);
        const [topicsRes, tagsRes, subjectsRes] = await Promise.all([
          api.get("/problems/topics"),
          api.get("/problems/tags"),
          api.get("/problems/subjects")
        ]);
        setTopics(topicsRes.data);
        setTags(tagsRes.data);
        
        const priority = ["Physics", "Chemistry", "Maths"];
        const sortedSubjects = subjectsRes.data.sort((a, b) => {
          const idxA = priority.indexOf(a);
          const idxB = priority.indexOf(b);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
          if (idxA !== -1) return -1;
          if (idxB !== -1) return 1;
          return a.localeCompare(b);
        });

        const dynamicSubjects = [
          { id: "", label: "All Topics", icon: Layers },
          ...sortedSubjects.map(s => {
            let Icon = Code2;
            if (s === "Physics") Icon = Atom;
            else if (s === "Chemistry") Icon = FlaskConical;
            else if (s === "Maths") Icon = Calculator;
            else if (s === "Database") Icon = Database;
            else if (s === "Shell") Icon = Terminal;
            else if (s === "System Design") Icon = Cpu;

            return {
              id: s,
              label: s,
              icon: Icon
            };
          })
        ];
        setSubjects(dynamicSubjects);
      } catch (err) {
        console.error("Error fetching filters data:", err);
      } finally {
        setLoadingTopics(false);
        setLoadingTags(false);
        setLoadingSubjects(false);
      }
    };
    fetchData();
  }, []);

  // Get topics based on selected subject or show all
  const getVisibleTopics = () => {
    if (filters.subject) {
      return topics.filter(t => t.subject?.toLowerCase() === filters.subject.toLowerCase());
    }
    return topics;
  };

  const visibleTopics = getVisibleTopics();
  const displayTopics = visibleTopics; // Always render all, let CSS handle hiding

  const handleTopicClick = (topicId) => {
    const newTopic = filters.topic === topicId ? "" : topicId;
    setFilters({ ...filters, topic: newTopic, page: 1 });
  };

  const handleTagClick = (tagId) => {
    const currentTags = filters.tags ? filters.tags.split(",") : [];
    let newTags;
    if (currentTags.includes(tagId)) {
      newTags = currentTags.filter(t => t !== tagId);
    } else {
      newTags = [...currentTags, tagId];
    }
    setFilters({ ...filters, tags: newTags.join(","), page: 1 });
  };

  return (
    <div className="space-y-6 mb-6">

      {/* 1. Tags Row (Top) */}
      <div className="relative">
        <div className={`flex flex-wrap gap-x-4 gap-y-3 text-sm text-[var(--text-secondary)] ${showAllTopics ? '' : 'overflow-hidden max-h-[28px]'}`}>
           {loadingTopics ? (
             <span className="text-[var(--text-tertiary)] animate-pulse">Loading topics...</span>
           ) : displayTopics.length > 0 ? (
             <>
              {displayTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.id)}
                  className={`flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors ${
                    filters.topic === topic.id ? "text-[var(--text-primary)] font-medium" : ""
                  }`}
                >
                  <span>{topic.label}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[10px] text-[var(--text-tertiary)]">
                    {topic.count}
                  </span>
                </button>
              ))}
             </>
           ) : (
             <span className="text-[var(--text-tertiary)]">No topics found</span>
           )}
        </div>
        
        {!showAllTopics && (
          <div className="absolute right-0 top-0 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)] to-transparent pl-12 h-[20px] flex items-center">
            <button 
              onClick={() => setShowAllTopics(true)}
              className="flex items-center gap-1 hover:text-[var(--text-primary)] cursor-pointer whitespace-nowrap text-[var(--text-secondary)] text-sm font-medium"
            >
              Expand <ChevronDown size={14}/>
            </button>
          </div>
        )}

        {showAllTopics && (
           <div className="flex justify-end mt-2">
              <button 
                onClick={() => setShowAllTopics(false)}
                className="flex items-center gap-1 hover:text-[var(--text-primary)] cursor-pointer whitespace-nowrap text-[var(--text-secondary)] text-sm"
              >
                Collapse <ChevronUp size={12}/>
              </button>
           </div>
        )}
      </div>

      {/* 2. Subject Buttons (Middle) */}
      <div className="flex items-center gap-2">
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap mask-gradient-right pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loadingSubjects ? (
            <div className="flex gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 w-32 bg-[var(--bg-tertiary)] animate-pulse rounded-full shrink-0"></div>
              ))}
            </div>
          ) : (
            subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setFilters({ ...filters, subject: sub.id, page: 1 })}
                className={`px-4 py-2 rounded-full text-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  filters.subject === sub.id
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                    : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80 hover:text-[var(--text-primary)]"
                }`}
              >
                {sub.icon && <sub.icon size={14} />}
                {sub.label}
              </button>
            ))
          )}
        </div>
        
        {/* Scroll Button */}
        {!loadingSubjects && subjects.length > 4 && (
          <button 
            onClick={scrollRight}
            className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]/80 transition-all shrink-0 z-10"
          >
            <ChevronsRight size={18} />
          </button>
        )}
      </div>

      {/* 3. Search & Filters Row (Bottom) */}
      <div className="flex gap-3 items-center justify-between border-t border-[var(--border-primary)] pt-4">
        <div className="flex gap-3 items-center flex-1">
            {/* Search */}
            <div className="relative w-full max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={16} />
            <input
                type="text"
                placeholder="Search questions"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-10 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-full text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--text-tertiary)] transition-colors"
            />
            {localSearch && (
                <button 
                onClick={() => setLocalSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                <span className="text-lg">&times;</span>
                </button>
            )}
            </div>

            {/* Difficulty Dropdown */}
            <div className="relative">
                <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value, page: 1 })}
                className="pl-3 pr-8 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-full text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-tertiary)] transition-colors cursor-pointer appearance-none hover:text-[var(--text-primary)]"
                >
                <option value="">Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
            </div>
            
            {/* Filter Button */}
            <div className="relative">
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-full border transition-colors ${
                    showFilters || filters.tags 
                        ? "bg-[var(--brand-orange)]/10 border-[var(--brand-orange)] text-[var(--brand-orange)]" 
                        : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                >
                    <SlidersHorizontal size={18} />
                </button>

                {/* Dropdown Menu */}
                {showFilters && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Filter by Tags</span>
                        {filters.tags && (
                        <button 
                            onClick={() => setFilters({ ...filters, tags: "", page: 1 })}
                            className="text-[10px] text-[var(--brand-orange)] hover:underline"
                        >
                            Clear
                        </button>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {loadingTags ? (
                        <span className="text-xs text-[var(--text-tertiary)]">Loading tags...</span>
                        ) : (
                        tags.map((tag) => {
                            const isActive = filters.tags?.split(",").includes(tag.id);
                            return (
                            <button
                                key={tag.id}
                                onClick={() => handleTagClick(tag.id)}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all border ${
                                isActive
                                    ? "bg-[var(--brand-orange)] text-[var(--bg-primary)] border-[var(--brand-orange)]"
                                    : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-secondary)] hover:border-[var(--text-tertiary)]"
                                }`}
                            >
                                {tag.label}
                                <span className="ml-1.5 opacity-60 text-[10px]">{tag.count}</span>
                            </button>
                            );
                        })
                        )}
                    </div>
                    </div>
                )}
            </div>

            <button className="p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <ArrowUpDown size={18} />
            </button>
        </div>
        
        <div className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-2">
           {/* Circular Progress */}
           <div className="relative w-5 h-5 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[var(--bg-tertiary)]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="text-[var(--color-success)]"
                  strokeDasharray={`${userStats?.totalProblems > 0 ? (userStats.totalSolved / userStats.totalProblems) * 100 : 0}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
           </div>
           <span>
            <span className="text-[var(--text-primary)]">{userStats?.totalSolved || 0}</span>
            <span className="mx-0.5">/</span>
            {userStats?.totalProblems || 0} Solved
           </span>
        </div>
      </div>
    </div>
  );
}
