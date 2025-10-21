"use client";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { createBlogPost } from "@/app/actions";
import PostList from "./PostList";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { auth } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setMessage("");
    
    const result = await createBlogPost(formData);
    
    if (result.success) {
      setMessage("✅ Post created successfully!");
      setTitle("");
      setContent("");
    } else {
      setMessage(`❌ ${result.message}`);
    }
    
    setIsLoading(false);
  };

  // LOGIN PROMPT - SHOW IF NOT AUTHENTICATED
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

  // AUTHENTICATED USER - SHOW FORM + POSTS
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
        <div className={`max-w-2xl mx-auto border-[1px] p-6 rounded-lg mb-8 ${
          theme ? "bg-white border-[#cccccc]" : "bg-[#222222] border-[#444444]"
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme ? "text-gray-800" : "text-white"
          }`}>
            Create New Post
          </h2>
          
          <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="author" value={auth.email} />
            
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

        {/* Post List */}
        <PostList />
      </div>
    </div>
  );
}