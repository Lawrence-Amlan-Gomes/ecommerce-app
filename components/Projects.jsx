"use client";
import { useTheme } from "@/app/hooks/useTheme";
import ProjectCardDetailed from "./ProjectCardDetailed";
import projects from "@/app/projects/projects";
import Footer from "./Footer";

export default function Projects() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full sm:pt-[13%] pt-[20%] ${
        theme ? "bg-[#ffffff] text-[#aaaaaaa]" : "bg-[#000000] text-[#eeeeee]"
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
              className={`
             text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${
               theme ? "text-[#333333]" : "text-[#dddddd]"
             }`}
            >
              My Projects
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
            I am passionate about transforming new ideas into reality through
            innovative projects. Explore this portfolio to see my all latest to
            oldest works, showcasing both my creativity and technical expertise.
          </p>
        </div>
        <div className="space-y-4 sm:space-y-6">
          {projects.map((project) => (
            <ProjectCardDetailed
              key={project.id}
              urlTitle={project.urlTitle}
              title={project.title}
              img={project.img}
              liveLink={project.liveLink}
              shortDescription={project.shortDescription}
              techStack={project.techStack}
              gitLink={project.gitLink}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
