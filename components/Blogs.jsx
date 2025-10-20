"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { createBlogPost, getAllBlogPosts } from "@/app/actions";
import colors from "@/app/color/color";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  
  const { auth } = useAuth();
  const { theme } = useTheme();

  // Load posts on component mount
  useEffect(() => {
    getAllBlogPosts().then(setPosts);
  }, []);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setMessage("");
    
    const result = await createBlogPost(formData);
    
    if (result.success) {
      setMessage("✅ Post created successfully!");
      setTitle("");
      setContent("");
      // Refresh posts list
      const updatedPosts = await getAllBlogPosts();
      setPosts(updatedPosts);
    } else {
      setMessage(`❌ ${result.message}`);
    }
    
    setIsLoading(false);
  };

  // Show login prompt if not authenticated
  if (!auth) {
    return (
      <div className={`pt-[10%] ${theme ? "bg-gray-50" : "bg-[#010101"}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className={`text-3xl font-bold text-center mb-8 ${
            theme ? "text-gray-800" : "text-white"
          }`}>
            Blog Platform
          </h1>
          <div className={`text-center py-12 ${
            theme ? "text-gray-600" : "text-gray-400"
          }`}>
            <p className="text-xl mb-4">Please login to create and view posts</p>
            <a 
              href="/login" 
              className={`inline-block px-6 py-3 rounded-lg font-medium ${
                theme 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-blue-700 hover:bg-blue-800 text-white"
              }`}
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-[10%] ${theme ? "bg-gray-50" : "bg-[#010101"}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className={`text-3xl font-bold text-center mb-8 ${
          theme ? "text-gray-800" : "text-white"
        }`}>
          Blog Platform
        </h1>
        
        {/* Create Post Form */}
        <div className={`max-w-2xl mx-auto p-6 rounded-lg mb-8 ${
          theme ? colors.cardLight : colors.cardDark
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme ? "text-gray-800" : "text-white"
          }`}>
            Create New Post
          </h2>
          
          <form action={handleSubmit} className="space-y-4">
            {/* Hidden Author Field */}
            <input type="hidden" name="author" value={auth.email} />
            
            {/* Title Input */}
            <div>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title..."
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border-gray-300 text-gray-900 focus:border-blue-700 focus:ring-blue-200"
                    : "bg-[#222222] border-[#444444] text-white focus:border-blue-700 focus:ring-blue-900/50"
                }`}
                required
              />
            </div>

            {/* Content Textarea */}
            <div>
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your amazing post content here..."
                rows="6"
                className={`w-full p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border-gray-300 text-gray-900 focus:border-blue-700 focus:ring-blue-200"
                    : "bg-[#222222] border-[#444444] text-white focus:border-blue-700 focus:ring-blue-900/50"
                }`}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {isLoading ? "Creating Post..." : "Create Post"}
            </button>
          </form>

          {/* Success/Error Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Posts List */}
        <h2 className={`text-2xl font-bold mb-6 ${
          theme ? "text-gray-800" : "text-white"
        }`}>
          Recent Posts ({posts.length})
        </h2>
        
        {posts.length === 0 ? (
          <div className={`text-center py-12 ${
            theme ? "text-gray-500" : "text-gray-400"
          }`}>
            <p className="text-xl">No posts yet. <br /> Be the first to create one!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className={`p-6 rounded-lg border ${
                  theme
                    ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
                    : "bg-[#222222] border-[#444444] hover:border-[#555555]"
                } transition-shadow duration-200`}
              >
                <h3 className={`text-xl font-semibold mb-3 ${
                  theme ? "text-gray-800" : "text-white"
                }`}>
                  {post.title}
                </h3>
                <p className={`mb-4 leading-relaxed ${
                  theme ? "text-gray-600" : "text-gray-300"
                }`}>
                  {post.content}
                </p>
                <footer className={`text-sm ${
                  theme ? "text-gray-500" : "text-gray-400"
                }`}>
                  <span>By {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}