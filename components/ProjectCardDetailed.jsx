"use client";
import { useTheme } from "@/app/hooks/useTheme";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCardDetailed({
  urlTitle,
  title,
  img,
  liveLink,
  shortDescription,
  techStack,
  gitLink,
}) {
  const { theme } = useTheme();
  return (
    <div
      className={`flex w-full rounded-lg overflow-hidden border-[1px] mb-6 ${
        theme
          ? "bg-[#ffffff] hover:bg-[#fafafa] text-[#333333] border-blue-800"
          : "bg-[#000000] hover:bg-[#0a0a0a] text-[#dddddd] border-blue-800"
      }`}
    >
      <div className="flex flex-col w-[60%] sm:w-1/2 p-4 sm:p-6">
        <h2 className="text-lg xs:text-xl lg:text-2xl font-semibold mb-3">{title}</h2>
        <div className="flex gap-2 mb-4">
          {techStack.slice(0, 5).map(([name, src]) => (
            <Image
              key={name}
              src={src}
              alt={name}
              width={20}
              height={20}
              className="object-contain"
            />
          ))}
        </div>
        <p className="text-xs sm:text-sm lg:text-base mb-4 flex-grow">
          {shortDescription}
        </p>
        <div className="flex gap-4 text-xs sm:text-sm lg:text-base">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 ${
              theme ? "hover:text-blue-800" : "hover:text-blue-600"
            }`}
          >
            <span>→</span> Live Demo
          </a>
          {gitLink && (
            <a
              href={gitLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center hover:tracking-wider gap-1 ${
                theme ? "hover:text-[#111111]" : "hover:text-[#ffffff]"
              }`}
            >
              <Image
                src={theme ? "/gitHubLight.png" : "/GitHubDark.png"}
                alt="GitHub"
                width={16}
                height={16}
                className="object-contain"
              />
              GitHub
            </a>
          )}
        </div>
      </div>
      <div className="relative w-[40%] sm:w-1/2 h-[200px] xs:h-[250px] sm:h-[300px] p-4 sm:p-6 overflow-hidden">
        <div
          className={`relative h-full w-full overflow-hidden rounded-lg border-[1px] ${
            theme ? "border-[#dddddd]" : "border-[#222222]"
          }`}
        >
          <Link href={`/project/${urlTitle}`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image src={img[0]} alt={title} fill className="object-cover" />
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}