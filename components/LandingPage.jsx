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
          Welcome to E-commerce
        </motion.h1>
  
      </motion.div>
    </div>
  );
}