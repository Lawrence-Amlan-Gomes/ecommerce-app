"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import { getAllBlogPosts, deleteBlogPost, updateBlogPost, addComment, upvotePost, downvotePost } from "@/app/actions";

// ✅ HELPER FUNCTION FOR PRETTY TIMESTAMPS
const formatTimestamp = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [commentText, setCommentText] = useState({});
  const { theme } = useTheme();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllBlogPosts();
      setPosts(data || []);
    } catch (error) {
      setMessage("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", editingId);
    formData.append("title", editTitle);
    formData.append("content", editContent);
    
    const result = await updateBlogPost(formData);
    if (result.success) {
      setPosts(posts.map((post) => post.id === editingId ? { ...post, title: editTitle, content: editContent } : post));
      setMessage("✅ Post updated successfully");
      cancelEdit();
    } else {
      setMessage(`❌ ${result.message}`);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    const formData = new FormData();
    formData.append("id", id);
    const result = await deleteBlogPost(formData);
    if (result.success) {
      setPosts(posts.filter((post) => post.id !== id));
      setMessage("✅ Post deleted successfully");
    } else {
      setMessage(`❌ ${result.message}`);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCommentSubmit = async (postId) => {
    const text = commentText[postId];
    if (!text || text.trim().length < 3) {
      setMessage("❌ Comment must be at least 3 characters");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("text", text);
    const result = await addComment(formData);
    
    if (result.success) {
      setPosts(posts.map(p => p.id === postId ? { ...p, comments: result.post.comments } : p));
      setCommentText({ ...commentText, [postId]: "" });
      setMessage("✅ Comment added successfully");
    } else {
      setMessage(`❌ ${result.message}`);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleUpvote = async (postId) => {
    const formData = new FormData();
    formData.append("id", postId);
    const result = await upvotePost(formData);
    
    if (result.success) {
      setPosts(posts.map(p => p.id === postId ? result.post : p));
      setMessage("✅ Upvoted successfully");
    } else {
      setMessage(`❌ ${result.message}`);
    }
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDownvote = async (postId) => {
    const formData = new FormData();
    formData.append("id", postId);
    const result = await downvotePost(formData);
    
    if (result.success) {
      setPosts(posts.map(p => p.id === postId ? result.post : p));
      setMessage("✅ Downvoted successfully");
    } else {
      setMessage(`❌ ${result.message}`);
    }
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) {
    return <div className={`text-center py-8 ${theme ? "text-gray-600" : "text-gray-400"}`}>Loading posts...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme ? "text-gray-800" : "text-white"}`}>
        Recent Posts ({filteredPosts.length})
      </h2>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className={`w-full p-3 rounded-lg border mb-6 focus:outline-none focus:ring-2 ${
          theme ? "bg-white border-gray-300 text-gray-900 focus:border-blue-700" : "bg-[#222222] border-[#444444] text-white focus:border-blue-700"
        }`}
      />
      
      {message && (
        <div className={`mb-6 p-3 rounded-lg text-center text-sm font-medium ${
          message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}
      
      {filteredPosts.length === 0 ? (
        <div className={`text-center py-12 ${theme ? "text-gray-500" : "text-gray-400"}`}>
          <p className="text-xl">{searchQuery ? `No posts match "${searchQuery}"` : "No posts found."}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article key={post.id} className={`p-6 rounded-lg border ${
              theme ? "bg-white border-gray-200 shadow-sm" : "bg-[#222222] border-[#444444]"
            }`}>
              {editingId === post.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <input type="hidden" value={post.id} />
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title..."
                    className={`w-full p-3 rounded-lg border ${
                      theme ? "bg-white border-gray-300 text-gray-900" : "bg-[#333333] border-[#555555] text-white"
                    }`}
                    required
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Edit content..."
                    rows="4"
                    className={`w-full p-3 rounded-lg border resize-none ${
                      theme ? "bg-white border-gray-300 text-gray-900" : "bg-[#333333] border-[#555555] text-white"
                    }`}
                    required
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg">Save</button>
                    <button type="button" onClick={cancelEdit} className="flex-1 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className={`${theme ? "text-gray-800" : "text-white"} text-xl font-semibold mb-3`}>
                        {post.title}
                      </h3>
                      <p className={`${theme ? "text-gray-600" : "text-gray-300"} mb-3`}>
                        {post.content}
                      </p>
                      {/* ✅ NEW POST TIMESTAMP */}
                      <p className={`${theme ? "text-gray-500" : "text-gray-400"} text-sm mb-3`}>
                        📅 Posted: {formatTimestamp(post.createdAt)}
                      </p>
                      <footer className={`${theme ? "text-gray-500" : "text-gray-400"} text-sm`}>
                        By {post.author}
                      </footer>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => startEdit(post)} className="p-2 bg-blue-500 text-white rounded-lg">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 bg-red-500 text-white rounded-lg">Delete</button>
                    </div>
                  </div>

                  {/* VOTE BUTTONS */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleUpvote(post.id)} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">↑</button>
                      <span className={`${theme ? "text-gray-700" : "text-gray-300"} font-medium`}>{post.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDownvote(post.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">↓</button>
                      <span className={`${theme ? "text-gray-700" : "text-gray-300"} font-medium`}>{post.downvotes}</span>
                    </div>
                  </div>

                  {/* COMMENTS SECTION */}
                  <div className="mt-6">
                    <h4 className={`${theme ? "text-gray-800" : "text-white"} text-lg font-semibold mb-3`}>
                      Comments ({post.comments?.length || 0})
                    </h4>
                    {post.comments?.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {post.comments.map((comment, index) => (
                          <div key={index} className={`p-3 rounded-lg ${
                            theme ? "bg-gray-50 border border-gray-200" : "bg-[#333333] border-[#555555]"
                          }`}>
                            <p className={theme ? "text-gray-800" : "text-white"}>{comment.text}</p>
                            {/* ✅ NEW COMMENT TIMESTAMP */}
                            <p className={`${theme ? "text-gray-500" : "text-gray-400"} text-xs`}>
                              By {comment.author} • {formatTimestamp(comment.createdAt)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(post.id); }} className="flex gap-2">
                      <input
                        type="text"
                        value={commentText[post.id] || ""}
                        onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        placeholder="Add a comment..."
                        className={`flex-1 p-2 rounded-lg border ${
                          theme ? "bg-white border-gray-300 text-gray-900" : "bg-[#333333] border-[#555555] text-white"
                        }`}
                      />
                      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">Comment</button>
                    </form>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}