"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";
import BlogCard from "./BlogCard";
import blogs from "@/app/blogs/blogs";

export default function LandingBlogs() {
  const { theme } = useTheme();
  const [numProjects, setNumProjects] = useState(6);

  useEffect(() => {
    const updateNumProjects = () => {
      if (window.innerWidth < 768) {
        setNumProjects(2); // Mobile: slice(0, 2)
      } else if (window.innerWidth < 1024) {
        setNumProjects(2); // Medium: slice(0, 2)
      } else {
        setNumProjects(3); // Large: slice(0, 3)
      }
    };

    updateNumProjects(); // Initial check
    window.addEventListener("resize", updateNumProjects);

    return () => window.removeEventListener("resize", updateNumProjects);
  }, []);

  return (
    <div className="px-[5%] sm:px-[10%] mb-[5%] pb-[5%] w-full">
      <div className="mb-8">
        <div
          className={`flex items-center mb-5 gap-4 ${
            theme ? "text-[#333333]" : "text-[#dddddd]"
          }`}
        >
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${
              theme ? "text-[#333333]" : "text-[#dddddd]"
            }`}
          >
            My Writings
          </h1>
          <div
            className="flex-grow h-[1px]"
            style={{
              backgroundImage: theme
                ? "linear-gradient(to right, rgba(51, 51, 51, 0), rgba(51, 51, 51, 1))"
                : "linear-gradient(to right, rgba(221, 221, 221, 0), rgba(221, 221, 221, 0.4))",
            }}
          />
        </div>
        <p
          className={`text-base lg:text-md w-full md:w-[50%] mt-2 ${
            theme ? "text-[#666666]" : "text-[#aaaaaa]"
          }`}
        >
          Along with coding I also like to write about Technology, life and technical puzzles. Here are some of my recent posts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {blogs.slice(0, numProjects).map((project) => (
          <BlogCard
            key={project.id}
            title={project.title}
            img={project.img}
            shortDescription={project.shortDescription}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/blogs">
          <div
            className={`px-4 py-2 rounded-md text-sm sm:text-[15px] font-medium hover:cursor-pointer ${
              theme
                ? "bg-blue-800 text-[#ffffff] hover:bg-white border-[1px] border-blue-800 hover:text-blue-800"
                : "bg-blue-700 text-[#ffffff] hover:bg-black border-[1px] border-blue-600 hover:text-blue-600"
            }`}
          >
            View All Blogs
          </div>
        </Link>
      </div>
    </div>
  );
}