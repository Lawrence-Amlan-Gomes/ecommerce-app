"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "./Footer";

export default function LandingPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full sm:pt-[13%] pt-[20%] ${
        theme ? "bg-[#ffffff] text-[#aaaaaaa]" : "bg-[#000000] text-[#eeeeee]"
      }`}
    >
      <div className="w-full flex justify-center items-center sm:text-[50px] font-bold">
        Blog Platform
      </div>
    </div>
  );
}
