import React, { useState, useEffect, useContext } from "react";
import api from "../../api/index";
import { AuthContext } from "../../context/AuthContext";
import { 
  ArrowLeft, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare, 
  Send, 
  Trash2, 
  User, 
  Clock, 
  Share2, 
  BookOpen, 
  CheckCircle2,
  MoreHorizontal,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  AtSign
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { uploadImage } from "../../api/index";

export default function DiscussionDetail({ discussionId, onBack }) {
  const { user } = useContext(AuthContext);
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentSort, setCommentSort] = useState("best"); // 'best' | 'newest'
  const [replyingTo, setReplyingTo] = useState(null); // commentId
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchData();
  }, [discussionId, commentSort]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [discRes, commRes] = await Promise.all([
        api.get(`/discussions/${discussionId}`),
        api.get(`/discussions/${discussionId}/comments?sort=${commentSort}`)
      ]);
      setDiscussion(discRes.data);
      setComments(commRes.data);
    } catch (err) {
      console.error("Error fetching discussion details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!user) return alert("Please login to upvote");
    try {
      const res = await api.post(`/discussions/${discussionId}/upvote`);
      setDiscussion(prev => {
        const currentCount = prev.upvotes?.length || 0;
        const newCount = res.data.upvotes;
        let newUpvotes = [...(prev.upvotes || [])];
        
        if (newCount > currentCount) {
          if (!newUpvotes.includes(user.id)) newUpvotes.push(user.id);
        } else if (newCount < currentCount) {
          newUpvotes = newUpvotes.filter(id => id !== user.id);
        }
        
        return { ...prev, upvotes: newUpvotes };
      });
    } catch (err) {
      console.error("Error upvoting:", err);
    }
  };

  const handleCommentUpvote = async (commentId) => {
    if (!user) return alert("Please login to upvote");
    try {
      const res = await api.post(`/discussions/comments/${commentId}/upvote`);
      setComments(prev => prev.map(c => {
        if (c._id === commentId) {
          const currentCount = c.upvotes?.length || 0;
          const newCount = res.data.upvotes;
          let newUpvotes = [...(c.upvotes || [])];
          if (newCount > currentCount) {
            if (!newUpvotes.includes(user.id)) newUpvotes.push(user.id);
          } else {
            newUpvotes = newUpvotes.filter(id => id !== user.id);
          }
          return { ...c, upvotes: newUpvotes };
        }
        // Also check replies
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.map(r => {
              if (r._id === commentId) {
                const currentCount = r.upvotes?.length || 0;
                const newCount = res.data.upvotes;
                let newUpvotes = [...(r.upvotes || [])];
                if (newCount > currentCount) {
                  if (!newUpvotes.includes(user.id)) newUpvotes.push(user.id);
                } else {
                  newUpvotes = newUpvotes.filter(id => id !== user.id);
                }
                return { ...r, upvotes: newUpvotes };
              }
              return r;
            })
          };
        }
        return c;
      }));
    } catch (err) {
      console.error("Error upvoting comment:", err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      setNewComment((prev) => prev + `\n![Image](${url})\n`);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert(err.response?.data?.message || "Failed to upload image");
    }
  };

  const handleAddComment = async (e, parentId = null) => {
    if (e) e.preventDefault();
    if (!user) return alert("Please login to comment");
    
    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      const res = await api.post("/discussions/comments", {
        content,
        discussionId,
        parentId
      });
      
      if (parentId) {
        setComments(prev => prev.map(c => {
          if (c._id === parentId) {
            return { ...c, replies: [...(c.replies || []), res.data] };
          }
          return c;
        }));
        setReplyContent("");
        setReplyingTo(null);
      } else {
        setComments(prev => [...prev, { ...res.data, replies: [] }]);
        setNewComment("");
      }
      
      setDiscussion(prev => ({ ...prev, commentCount: (prev.commentCount || 0) + 1 }));
    } catch (err) {
      console.error("Error adding comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/discussions/comments/${commentId}`);
      setComments(prev => prev.filter(c => c._id !== commentId));
      setDiscussion(prev => ({ ...prev, commentCount: (prev.commentCount || 0) - 1 }));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="h-full flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="w-10 h-10 border-4 border-[var(--brand-orange)] border-t-transparent animate-spin rounded-full"></div>
    </div>
  );

  if (!discussion) return (
    <div className="h-full flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-tertiary)] space-y-6">
      <MessageSquare size={64} className="opacity-10" />
      <p className="text-xl font-bold">Discussion not found</p>
      <button onClick={onBack} className="px-6 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)]/80 transition-all">Go back</button>
    </div>
  );

  const isUpvoted = discussion.upvotes?.includes(user?.id);

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {/* Header - LeetCode Style */}
      <div className="px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20 custom-scrollbar">
        <div className="max-w-4xl mx-auto">
          {/* Title & Author */}
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            {discussion.title}
          </h1>

          <div className="flex items-center gap-3 mb-8">
            <a href={`/profile/${discussion.author?._id}`} className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] overflow-hidden hover:opacity-80 transition-opacity">
              {discussion.author?.avatar ? (
                <img src={discussion.author.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)]">
                  <User size={20} />
                </div>
              )}
            </a>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <a href={`/profile/${discussion.author?._id}`} className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-orange)] transition-colors">{discussion.author?.username || "Anonymous"}</a>
                {discussion.author?.role === 'admin' && <CheckCircle2 size={14} className="text-[#2DB55D]" />}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[var(--text-tertiary)]">
                <Clock size={12} />
                <span>{new Date(discussion.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{discussion.views || 0} views</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-[15px] text-[var(--text-primary)] mb-12 leading-relaxed">
            <ReactMarkdown>{discussion.content}</ReactMarkdown>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 mb-12 pb-8 border-b border-[var(--border-primary)]">
            <div className="flex items-center bg-[var(--bg-secondary)] rounded-lg p-1">
              <button 
                onClick={handleUpvote}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  isUpvoted ? "text-[var(--brand-orange)] bg-[var(--bg-tertiary)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <ThumbsUp size={16} className={isUpvoted ? "fill-current" : ""} />
                <span className="text-sm font-medium">{discussion.upvotes?.length || 0}</span>
              </button>
              <div className="w-[1px] h-4 bg-[var(--border-primary)] mx-1"></div>
              <button className="flex items-center px-3 py-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all">
                <ThumbsDown size={16} />
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
              <MessageSquare size={16} />
              <span className="text-sm font-medium">{discussion.commentCount || 0}</span>
            </div>

            <button 
              onClick={handleShare}
              className={`flex items-center gap-1.5 text-sm font-medium transition-all ${
                copied ? "text-[#2DB55D]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Share2 size={16} />
              <span>{copied ? "Copied!" : "Share"}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Comments ({comments.length})
              </h3>
              <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                <span>Sort by:</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCommentSort("best")}
                    className={`font-medium transition-colors ${commentSort === "best" ? "text-[var(--text-primary)]" : "hover:text-[var(--text-primary)]"}`}
                  >
                    Best
                  </button>
                  <button 
                    onClick={() => setCommentSort("newest")}
                    className={`font-medium transition-colors ${commentSort === "newest" ? "text-[var(--text-primary)]" : "hover:text-[var(--text-primary)]"}`}
                  >
                    Newest
                  </button>
                </div>
              </div>
            </div>

            {/* LeetCode Style Comment Box */}
            <form onSubmit={handleAddComment} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl overflow-hidden">
              <textarea 
                placeholder="Type comment here..."
                disabled={!user || submitting}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-4 bg-transparent text-[var(--text-primary)] text-[14px] focus:outline-none resize-none min-h-[120px] placeholder:text-[var(--text-tertiary)]"
              />
              <div className="px-4 py-3 bg-[var(--bg-tertiary)] flex items-center justify-between border-t border-[var(--border-primary)]">
                <div className="flex items-center gap-4 text-[var(--text-tertiary)]">
                  <button type="button" className="hover:text-[var(--text-primary)] transition-colors"><Code size={18} /></button>
                  <label className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                    <ImageIcon size={18} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                  <button type="button" className="hover:text-[var(--text-primary)] transition-colors"><LinkIcon size={18} /></button>
                  <button type="button" className="hover:text-[var(--text-primary)] transition-colors"><AtSign size={18} /></button>
                </div>
                <button 
                  type="submit"
                  disabled={!user || submitting || !newComment.trim()}
                  className="px-4 py-1.5 bg-[#2DB55D] hover:bg-[#269a4f] text-white text-sm font-bold rounded-lg transition-all disabled:opacity-50"
                >
                  {submitting ? "..." : "Comment"}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6 pt-4">
              {comments.map((comment) => (
                <div key={comment._id} className="flex gap-4">
                  <a href={`/profile/${comment.author?._id}`} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] overflow-hidden shrink-0">
                    {comment.author?.avatar ? (
                      <img src={comment.author.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)]">
                        <User size={16} />
                      </div>
                    )}
                  </a>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 text-[13px]">
                        <a href={`/profile/${comment.author?._id}`} className="font-medium text-[var(--text-primary)] hover:text-[var(--brand-orange)] transition-colors">{comment.author?.username || "Anonymous"}</a>
                        <span className="text-[var(--text-tertiary)]">{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      {(user?.id === comment.author?._id || user?.role === 'admin') && (
                        <button 
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-[var(--text-tertiary)] hover:text-red-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="text-[14px] text-[var(--text-primary)] leading-relaxed prose prose-invert max-w-none">
                      <ReactMarkdown>
                        {comment.content}
                      </ReactMarkdown>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-[12px] text-[var(--text-tertiary)]">
                      <button 
                        onClick={() => handleCommentUpvote(comment._id)}
                        className={`flex items-center gap-1 transition-colors ${comment.upvotes?.includes(user?.id) ? "text-[var(--brand-orange)]" : "hover:text-[var(--text-primary)]"}`}
                      >
                        <ThumbsUp size={12} className={comment.upvotes?.includes(user?.id) ? "fill-current" : ""} />
                        <span>{comment.upvotes?.length || 0}</span>
                      </button>
                      <button 
                        onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                        className="hover:text-[var(--text-primary)] transition-colors"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Reply Input */}
                    {replyingTo === comment._id && (
                      <div className="mt-4 space-y-3">
                        <textarea 
                          placeholder="Write a reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="w-full p-3 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-orange)] transition-all resize-none min-h-[80px]"
                        />
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 text-xs font-bold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => handleAddComment(null, comment._id)}
                            disabled={submitting || !replyContent.trim()}
                            className="px-3 py-1 bg-[#2DB55D] hover:bg-[#269a4f] text-white text-xs font-bold rounded transition-all disabled:opacity-50"
                          >
                            {submitting ? "..." : "Reply"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Replies List */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4 pl-4 border-l border-[var(--border-primary)]">
                        {comment.replies.map((reply) => (
                          <div key={reply._id} className="flex gap-3">
                            <a href={`/profile/${reply.author?._id}`} className="w-6 h-6 rounded-full bg-[var(--bg-tertiary)] overflow-hidden shrink-0">
                              {reply.author?.avatar ? (
                                <img src={reply.author.avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)]">
                                  <User size={12} />
                                </div>
                              )}
                            </a>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                <div className="flex items-center gap-2 text-[12px]">
                                  <a href={`/profile/${reply.author?._id}`} className="font-medium text-[var(--text-primary)] hover:text-[var(--brand-orange)] transition-colors">{reply.author?.username || "Anonymous"}</a>
                                  <span className="text-[var(--text-tertiary)]">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="text-[13px] text-[var(--text-primary)] leading-relaxed prose prose-invert max-w-none">
                                <ReactMarkdown>
                                  {reply.content}
                                </ReactMarkdown>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-[11px] text-[var(--text-tertiary)]">
                                <button 
                                  onClick={() => handleCommentUpvote(reply._id)}
                                  className={`flex items-center gap-1 transition-colors ${reply.upvotes?.includes(user?.id) ? "text-[var(--brand-orange)]" : "hover:text-[var(--text-primary)]"}`}
                                >
                                  <ThumbsUp size={10} className={reply.upvotes?.includes(user?.id) ? "fill-current" : ""} />
                                  <span className="text-[var(--text-tertiary)]">{reply.upvotes?.length || 0}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
