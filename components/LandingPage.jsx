"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const { theme } = useTheme();

  // Animation variants for smooth fade-in and slide
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 sm:pt-[10%] pt-[20%] ${
        theme ? "bg-white text-gray-900" : "bg-[#0a0a0a] text-white"
      }`}
    >
      <motion.div
        className="text-center max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="sm:text-5xl text-3xl font-bold mb-4"
          variants={textVariants}
        >
          Welcome to Your Blog Platform
        </motion.h1>
        <motion.p
          className={`sm:text-xl text-lg mb-6 ${
            theme ? "text-gray-600" : "text-gray-300"
          }`}
          variants={textVariants}
        >
          Connect, create, and share your ideas with the world! Build engaging blog posts, spark conversations with comments, and vote on content that inspires you—all in a sleek, modern platform designed for creators.
        </motion.p>
        <motion.div
          className="flex gap-4 justify-center"
          variants={textVariants}
        >
          <Link
            href="/register"
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition-colors ${
              theme
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-blue-700 text-white hover:bg-blue-800"
            }`}
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition-colors ${
              theme
                ? "border border-gray-300 text-gray-900 hover:bg-gray-100"
                : "border border-[#444444] text-white hover:bg-[#333333]"
            }`}
          >
            Sign In
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className={`mt-8 text-center text-sm ${
          theme ? "text-gray-500" : "text-gray-400"
        }`}
        variants={textVariants}
      >
        <p>Join a vibrant community of writers and readers. <br /> Crafted for Malaysia’s tech enthusiasts.</p>
      </motion.div>
    </div>
  );
}