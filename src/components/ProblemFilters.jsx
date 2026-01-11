import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown } from "lucide-react";
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
        
        const dynamicSubjects = [
          { id: "", label: "All Subjects" },
          ...subjectsRes.data.map(s => ({
            id: s,
            label: s
          }))
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
  const displayTopics = showAllTopics ? visibleTopics : visibleTopics.slice(0, 8);

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
    <div className="space-y-4 mb-4">


      {/* JEE Topics Row */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-medium">
        <div className={`flex gap-4 flex-1 ${showAllTopics ? 'flex-wrap' : 'overflow-hidden max-h-[32px]'}`}>
           {loadingTopics ? (
             <span className="text-[var(--text-tertiary)] animate-pulse">Loading topics...</span>
           ) : displayTopics.length > 0 ? (
             displayTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  filters.topic === topic.id
                    ? "bg-[var(--brand-orange)] text-[var(--bg-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                }`}
              >
                {topic.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  filters.topic === topic.id
                    ? "bg-[var(--bg-primary)]/20"
                    : "bg-[var(--bg-tertiary)]"
                }`}>
                  {topic.count}
                </span>
              </button>
            ))
           ) : (
             <span className="text-[var(--text-tertiary)]">No topics found</span>
           )}
        </div>
        <button 
          onClick={() => setShowAllTopics(!showAllTopics)}
          className="flex items-center gap-1 hover:text-[var(--text-primary)] cursor-pointer px-2 py-1 whitespace-nowrap shrink-0 text-[var(--text-secondary)]"
        >
          {showAllTopics ? "Show Less" : "Expand"} 
          {showAllTopics ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
        </button>
      </div>

      {/* Subject Pills */}
      <div className="flex flex-wrap gap-3 items-center">
        {loadingSubjects ? (
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-11 w-32 bg-[var(--bg-tertiary)] animate-pulse rounded-full"></div>
            ))}
          </div>
        ) : (
          subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setFilters({ ...filters, subject: sub.id, page: 1 })}
              className={`px-5 py-2.5 rounded-full text-base font-medium transition-all flex items-center gap-2 shadow-sm ${
                filters.subject === sub.id
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80 hover:text-[var(--text-primary)]"
              }`}
            >
              {sub.label}
            </button>
          ))
        )}
      </div>

      {/* Search & Secondary Filters */}
      <div className="flex gap-3 items-center relative">
        <div className="relative max-w-[240px] flex-1">
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
        <select
          value={filters.difficulty}
          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value, page: 1 })}
          className="px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-tertiary)] transition-colors cursor-pointer appearance-none"
        >
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        
        {/* Filter Button with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg border transition-colors ${
              showFilters || filters.tags 
                ? "bg-[var(--brand-orange)]/10 border-[var(--brand-orange)] text-[var(--brand-orange)]" 
                : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
             <SlidersHorizontal size={18} />
          </button>

          {/* Dropdown Menu */}
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
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

        <button className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
           <ArrowUpDown size={18} />
        </button>
        
        <div className="ml-auto text-xs text-[var(--text-secondary)] font-medium">
           <span className="text-[var(--text-primary)]">{userStats?.totalSolved || 0}</span>/{userStats?.totalProblems || 0} Solved
        </div>
      </div>
    </div>
  );
}
