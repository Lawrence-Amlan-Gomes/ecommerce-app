"use client";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { createBlogPost } from "@/app/actions";
import colors from "@/app/color/color";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { auth } = useAuth();
  const { theme } = useTheme();

  // Only show form if user is logged in
  if (!auth) {
    return (
      <div className={`text-center py-8 ${theme ? "text-gray-600" : "text-gray-400"}`}>
        <p>Please <a href="/login" className="underline">login</a> to create posts</p>
      </div>
    );
  }

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

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${theme ? colors.cardLight : colors.cardDark}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme ? "text-gray-800" : "text-white"}`}>
        Create New Post
      </h2>
      
      <form action={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme ? "text-gray-700" : "text-gray-300"}`}>
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className={`w-full p-3 rounded-lg border ${
              theme 
                ? "bg-white border-gray-300 text-gray-900 focus:border-blue-500" 
                : "bg-gray-800 border-gray-600 text-white focus:border-blue-400"
            } focus:outline-none focus:ring-2`}
            required
          />
        </div>

        {/* Content Field */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme ? "text-gray-700" : "text-gray-300"}`}>
            Content
          </label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            rows="6"
            className={`w-full p-3 rounded-lg border resize-none ${
              theme 
                ? "bg-white border-gray-300 text-gray-900 focus:border-blue-500" 
                : "bg-gray-800 border-gray-600 text-white focus:border-blue-400"
            } focus:outline-none focus:ring-2`}
            required
          />
        </div>

        {/* Hidden Author Field */}
        <input type="hidden" name="author" value={auth.email} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } ${theme ? "text-white" : "text-white"}`}
        >
          {isLoading ? "Creating Post..." : "Create Post"}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          message.includes("✅") 
            ? "bg-green-100 text-green-700 border border-green-200" 
            : "bg-red-100 text-red-700 border border-red-200"
        } ${theme ? "" : "bg-red-900/20 text-red-300"}`}>
          {message}
        </div>
      )}
    </div>
  );
}