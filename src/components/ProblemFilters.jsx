import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default function ProblemFilters({ filters, setFilters }) {
  const [showAllTopics, setShowAllTopics] = useState(false);

  const subjects = [
    { id: "", label: "All Subjects", icon: "📚" },
    { id: "Physics", label: "Physics", icon: "⚡" },
    { id: "Chemistry", label: "Chemistry", icon: "🧪" },
    { id: "Maths", label: "Maths", icon: "📐" },
  ];

  // JEE-based topics organized by subject
  const jeeTopics = {
    Physics: [
      { id: "mechanics", label: "Mechanics", count: 245 },
      { id: "rotational-motion", label: "Rotational Motion", count: 120 },
      { id: "thermodynamics", label: "Thermodynamics", count: 95 },
      { id: "electrostatics", label: "Electrostatics", count: 85 },
      { id: "current-electricity", label: "Current Electricity", count: 78 },
      { id: "magnetism", label: "Magnetism", count: 72 },
      { id: "electromagnetic-induction", label: "EMI", count: 65 },
      { id: "waves", label: "Waves & Oscillations", count: 88 },
      { id: "optics", label: "Optics", count: 92 },
      { id: "modern-physics", label: "Modern Physics", count: 110 },
      { id: "fluid-mechanics", label: "Fluid Mechanics", count: 55 },
      { id: "kinematics", label: "Kinematics", count: 68 },
    ],
    Chemistry: [
      { id: "organic-chemistry", label: "Organic Chemistry", count: 180 },
      { id: "inorganic-chemistry", label: "Inorganic Chemistry", count: 145 },
      { id: "physical-chemistry", label: "Physical Chemistry", count: 165 },
      { id: "goc", label: "GOC", count: 78 },
      { id: "coordination-compounds", label: "Coordination Compounds", count: 52 },
      { id: "chemical-bonding", label: "Chemical Bonding", count: 65 },
      { id: "electrochemistry", label: "Electrochemistry", count: 48 },
      { id: "chemical-kinetics", label: "Chemical Kinetics", count: 55 },
      { id: "thermodynamics-chem", label: "Thermodynamics", count: 62 },
      { id: "equilibrium", label: "Equilibrium", count: 58 },
      { id: "periodic-table", label: "Periodic Table", count: 45 },
      { id: "aldehydes-ketones", label: "Aldehydes & Ketones", count: 42 },
    ],
    Maths: [
      { id: "calculus", label: "Calculus", count: 210 },
      { id: "integration", label: "Integration", count: 156 },
      { id: "differentiation", label: "Differentiation", count: 142 },
      { id: "algebra", label: "Algebra", count: 188 },
      { id: "coordinate-geometry", label: "Coordinate Geometry", count: 125 },
      { id: "vectors", label: "Vectors & 3D", count: 98 },
      { id: "probability", label: "Probability", count: 76 },
      { id: "matrices", label: "Matrices & Determinants", count: 82 },
      { id: "complex-numbers", label: "Complex Numbers", count: 68 },
      { id: "sequences-series", label: "Sequences & Series", count: 72 },
      { id: "trigonometry", label: "Trigonometry", count: 95 },
      { id: "conic-sections", label: "Conic Sections", count: 88 },
    ],
  };

  // Get topics based on selected subject or show all
  const getVisibleTopics = () => {
    if (filters.subject && jeeTopics[filters.subject]) {
      return jeeTopics[filters.subject];
    }
    // Show top topics from all subjects when "All Subjects" is selected
    const allTopics = [
      ...jeeTopics.Physics.slice(0, 4),
      ...jeeTopics.Chemistry.slice(0, 4),
      ...jeeTopics.Maths.slice(0, 4),
    ];
    return showAllTopics ? [...jeeTopics.Physics, ...jeeTopics.Chemistry, ...jeeTopics.Maths] : allTopics;
  };

  const visibleTopics = getVisibleTopics();
  const displayTopics = showAllTopics ? visibleTopics : visibleTopics.slice(0, 8);

  const handleTopicClick = (topicId) => {
    // Toggle topic selection
    const newTopic = filters.topic === topicId ? "" : topicId;
    setFilters({ ...filters, topic: newTopic, page: 1 });
  };

  return (
    <div className="space-y-4 mb-4">
      {/* JEE Topics Row */}
      <div className="flex items-center gap-2 text-sm text-white font-medium">
        <div className={`flex gap-4 flex-1 ${showAllTopics ? 'flex-wrap' : 'overflow-hidden max-h-[32px]'}`}>
           {displayTopics.map((topic) => (
             <button
               key={topic.id}
               onClick={() => handleTopicClick(topic.id)}
               className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                 filters.topic === topic.id
                   ? "bg-[var(--brand-orange)] text-white"
                   : "text-white/90 hover:text-white hover:bg-[var(--bg-tertiary)]"
               }`}
             >
               {topic.label}
               <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                 filters.topic === topic.id
                   ? "bg-white/20"
                   : "bg-[var(--bg-tertiary)]"
               }`}>
                 {topic.count}
               </span>
             </button>
           ))}
        </div>
        <button 
          onClick={() => setShowAllTopics(!showAllTopics)}
          className="flex items-center gap-1 hover:text-[var(--text-primary)] cursor-pointer px-2 py-1 whitespace-nowrap shrink-0"
        >
          {showAllTopics ? "Show Less" : "Expand"} 
          {showAllTopics ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
        </button>
      </div>

      {/* Subject Pills */}
      <div className="flex flex-wrap gap-3 items-center">
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setFilters({ ...filters, subject: sub.id, page: 1 })}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all flex items-center gap-2 shadow-sm ${
              filters.subject === sub.id
                ? "bg-white text-black"
                : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80 hover:text-[var(--text-primary)]"
            }`}
          >
            {sub.id === "" && <span className="text-lg">📚</span>} 
            {sub.label}
          </button>
        ))}
      </div>

      {/* Search & Secondary Filters */}
      <div className="flex gap-3 items-center">
        <div className="relative max-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={16} />
          <input
            type="text"
            placeholder="Search questions"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value, page: 1 })}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-full text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--text-tertiary)] transition-colors"
          />
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
        
        <button className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
           <SlidersHorizontal size={18} />
        </button>
        <button className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
           <ArrowUpDown size={18} />
        </button>
        
        <div className="ml-auto text-xs text-[var(--text-secondary)] font-medium">
           <span className="text-[var(--text-primary)]">226</span>/3772 Solved
        </div>
      </div>
    </div>
  );
}
