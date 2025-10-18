"use client";
import { useTheme } from "@/app/hooks/useTheme";
import BlogCardDetailed from "./BlogCardDetailed";
import blogs from "@/app/blogs/blogs";
import Footer from "./Footer";

export default function Blogs() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full pt-[20%] sm:pt-[13%] ${
        theme ? "bg-[#ffffff] text-[#aaaaaa]" : "bg-[#000000] text-[#eeeeee]"
      }`}
    >
      <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto mb-[5%] px-[5%] sm:px-0">
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
            className={`text-sm sm:text-base lg:text-md w-full sm:w-[70%] mt-2 ${
              theme ? "text-[#666666]" : "text-[#aaaaaa]"
            }`}
          >
            Dive into my musings on Technology, life and technical puzzles in my posts; a blend of
            introspection and innovation. Keep an eye out for fresh insights and
            updates!
          </p>
        </div>
        <div className="space-y-6">
          {blogs.map((project) => (
            <BlogCardDetailed
              key={project.id}
              urlTitle={project.urlTitle}
              title={project.title}
              img={project.img}
              shortDescription={project.shortDescription}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}