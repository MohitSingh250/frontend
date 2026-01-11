import React, { useState, useContext } from "react";
import api from "../../api/index";
import { 
  X, Send, Eye, Type, ChevronDown, 
  Lightbulb, Code, Atom, FlaskConical, 
  Calculator, BellRing, MessageSquare, User,
  Info, AlertCircle,
  Image as ImageIcon,
  Link as LinkIcon,
  AtSign
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { AuthContext } from "../../context/AuthContext";
import { uploadImage } from "../../api/index";

const CATEGORIES = [
  { id: 'Physics', label: 'Physics', icon: Atom },
  { id: 'Chemistry', label: 'Chemistry', icon: FlaskConical },
  { id: 'Mathematics', label: 'Mathematics', icon: Calculator },
  { id: 'Strategy', label: 'Strategy', icon: Lightbulb },
  { id: 'Updates', label: 'Updates', icon: BellRing },
  { id: 'General', label: 'General', icon: MessageSquare },
];

export default function CreateDiscussion({ problemId, onBack, onCreated }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,/g, '');
      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag]);
        setTagInput("");
      }
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      setContent((prev) => prev + `\n![Image](${url})\n`);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert(err.response?.data?.message || "Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || title.length < 10) return;

    try {
      setSubmitting(true);
      const discussionData = {
        title,
        content,
        category,
        tags,
        problemId: problemId || null
      };

      await api.post("/discussions", discussionData);
      onCreated();
    } catch (err) {
      console.error("Error creating discussion:", err);
      alert("Failed to create discussion. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategory = CATEGORIES.find(c => c.id === category) || CATEGORIES[5];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border-primary)] flex items-center justify-between bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">New Post</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setPreview(!preview)}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              preview 
                ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]" 
                : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {preview ? <Type size={16} /> : <Eye size={16} />}
            {preview ? "Edit" : "Preview"}
          </button>
          <button 
            onClick={handleSubmit}
            disabled={submitting || !title.trim() || !content.trim() || title.length < 10}
            className="flex items-center gap-2 px-6 py-1.5 bg-[#2DB55D] hover:bg-[#269a4f] text-white text-sm font-bold rounded-lg transition-all disabled:opacity-50"
          >
            <Send size={16} />
            {submitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Form */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Category Selection */}
            <div className="relative">
              <label className="block text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Category</label>
              <button 
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-sm text-[var(--text-primary)] focus:border-[var(--brand-orange)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <selectedCategory.icon size={18} className="text-[var(--brand-orange)]" />
                  <span>{selectedCategory.label}</span>
                </div>
                <ChevronDown size={18} className={`text-[var(--text-tertiary)] transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-2xl z-50 overflow-hidden py-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--bg-tertiary)] transition-colors text-left"
                    >
                      <cat.icon size={18} className={category === cat.id ? "text-[var(--brand-orange)]" : "text-[var(--text-tertiary)]"} />
                      <span className={`text-sm ${category === cat.id ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-primary)]'}`}>
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Title</label>
              <input 
                type="text" 
                maxLength={100}
                placeholder="Enter a descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-lg font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-orange)] transition-all placeholder:text-[var(--text-tertiary)]"
              />
              <div className="mt-1 flex justify-end">
                <span className={`text-[10px] font-medium ${title.length < 10 ? 'text-red-500' : 'text-[var(--text-tertiary)]'}`}>
                  {title.length}/100 (min 10)
                </span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Tags (max 5)</label>
              <div className="flex flex-wrap gap-2 p-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg min-h-[46px] focus-within:border-[var(--brand-orange)] transition-all">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-medium rounded-md">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <input 
                  type="text" 
                  placeholder={tags.length < 5 ? "Add tag..." : ""}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  disabled={tags.length >= 5}
                  className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Content</label>
                <div className="flex items-center gap-4 text-[var(--text-tertiary)]">
                  <button type="button" className="hover:text-[var(--text-primary)] transition-colors"><Code size={16} /></button>
                  <label className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                    <ImageIcon size={16} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                  <button type="button" className="hover:text-[var(--text-primary)] transition-colors"><LinkIcon size={16} /></button>
                  <div className="w-[1px] h-4 bg-[var(--border-primary)] mx-1"></div>
                  <button 
                    type="button"
                    onClick={() => setPreview(!preview)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded transition-all ${preview ? "bg-[var(--brand-orange)] text-white" : "hover:text-[var(--text-primary)]"}`}
                  >
                    {preview ? "Edit" : "Preview"}
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                {preview ? (
                  <div className="w-full h-full p-6 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-y-auto prose prose-invert max-w-none text-sm">
                    <ReactMarkdown>{content || "*Nothing to preview yet...*"}</ReactMarkdown>
                  </div>
                ) : (
                  <textarea 
                    placeholder="Write your post content here. Markdown and LaTeX are supported..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full p-6 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-orange)] transition-all resize-none custom-scrollbar placeholder:text-[var(--text-tertiary)]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden xl:block w-80 border-l border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 space-y-8 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[var(--brand-orange)]">
              <Info size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Posting Tips</h3>
            </div>
            <ul className="space-y-4">
              {[
                { title: "Be Specific", desc: "Clearly state the JEE topic or question source." },
                { title: "Use LaTeX", desc: "Format equations like $E=mc^2$ for better readability." },
                { title: "Add Tags", desc: "Help others find your post by using relevant tags." },
                { title: "Be Respectful", desc: "Maintain an academic and helpful tone." }
              ].map((item, i) => (
                <li key={i} className="space-y-1">
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-[#2DB55D]">
              <AlertCircle size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Community Rules</span>
            </div>
            <p className="text-[10px] text-[var(--text-tertiary)] leading-relaxed">
              No spam, promotional content, or irrelevant topics. Posts violating rules will be removed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
