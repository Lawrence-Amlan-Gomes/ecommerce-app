"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "./Footer";
import LandingAbout from "./LandingAbout";
import LandingProjects from "./LandingProjects";
import LandingTestimonials from "./LandingTestimonials";
import LandingBlogs from "./LandingBlogs";
import LandingContact from "./LandingContact";

export default function LandingPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full sm:pt-[13%] pt-[20%] ${
        theme ? "bg-[#ffffff] text-[#aaaaaaa]" : "bg-[#000000] text-[#eeeeee]"
      }`}
    >
      <LandingAbout/>
      <LandingProjects/>
      <LandingTestimonials/>
      <LandingBlogs/>
      <LandingContact/>
      <Footer />
    </div>
  );
}