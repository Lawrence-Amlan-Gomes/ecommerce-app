"use client";
import { useTheme } from "@/app/hooks/useTheme";
import Footer from "./Footer";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Resume() {
  const { theme } = useTheme();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const iframe = document.createElement("iframe");
    iframe.src = "/resume.pdf";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    iframe.onload = () => {
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    };
  };

  return (
    <div
      className={`w-full pt-[20%] sm:pt-[13%] ${
        theme ? "bg-[#ffffff] text-[#aaaaaa]" : "bg-[#000000] text-[#eeeeee]"
      }`}
    >
      <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto mb-[5%] px-[5%] sm:px-0 relative">
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
              Resume
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
            className={`text-sm sm:text-base sm:text-left text-justify lg:text-md w-full sm:w-[80%] mt-2 ${
              theme ? "text-[#666666]" : "text-[#aaaaaa]"
            }`}
          >
            Explore my professional journey as a Frontend Engineer, showcasing
            expertise in crafting high-performance, user-centric web
            applications. With a proven track record in React, Next.js, and
            modern frontend technologies, I deliver scalable, responsive, and
            visually stunning solutions tailored to elevate your business.
            Download or print my resume to discover how I can transform your
            vision into reality.
          </p>
        </div>
        <div className="mb-12 relative">
          <div
            className={`relative p-0 overflow-hidden border-[1px] mb-3 rounded-2xl ${
              theme ? "border-blue-800" : "border-blue-700"
            }`}
          >
            <Image
              src="/resume.jpg"
              alt="Resume Image"
              width={5000}
              height={8000}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="fixed right-[8%] sm:right-[11%] top-[11%] md:top-[33%] transform -translate-y-1/2 flex flex-row gap-3 sm:flex-col sm:gap-4 z-50">
            <Link
              href="/home"
              className={`p-2 sm:p-3 rounded-full text-lg sm:text-xl sm:hidden block ${
                theme
                  ? "bg-[#ffffff] text-[#0a0a0a] border-[1px] border-blue-800 hover:bg-blue-800 hover:text-[#ffffff]"
                  : "bg-[#1a1a1a] text-[#ebebeb] border-[1px] border-blue-700 hover:bg-blue-700 hover:text-[#ffffff]"
              }`}
              title="Back to Home"
            >
              <FaArrowLeft />
            </Link>
            <button
              onClick={handleDownload}
              className={`p-2 sm:p-3 rounded-full text-lg sm:text-xl ${
                theme
                  ? "bg-[#ffffff] text-[#0a0a0a] border-[1px] border-blue-800 hover:bg-blue-800 hover:text-[#ffffff]"
                  : "bg-[#1a1a1a] text-[#ebebeb] border-[1px] border-blue-700 hover:bg-blue-700 hover:text-[#ffffff]"
              }`}
              title="Download Resume"
            >
              <IoCloudDownloadOutline />
            </button>
            <button
              onClick={handlePrint}
              className={`p-2 sm:p-3 rounded-full text-lg sm:text-xl ${
                theme
                  ? "bg-[#ffffff] text-[#0a0a0a] border-[1px] border-blue-800 hover:bg-blue-800 hover:text-[#ffffff]"
                  : "bg-[#1a1a1a] text-[#ebebeb] border-[1px] border-blue-700 hover:bg-blue-700 hover:text-[#ffffff]"
              }`}
              title="Print Resume"
            >
              <MdLocalPrintshop />
            </button>
          </div>
          <div className="fixed hidden left-[26%] sm:left-[4%] top-[11%] sm:top-[20%] transform -translate-y-1/2 sm:flex flex-col gap-3 sm:gap-4 z-50">
            <Link
              href="/home"
              className={`p-2 sm:p-3 rounded-full text-lg sm:text-xl ${
                theme
                  ? "bg-[#ffffff] text-[#0a0a0a] border-[1px] border-blue-800 hover:bg-blue-800 hover:text-[#ffffff]"
                  : "bg-[#1a1a1a] text-[#ebebeb] border-[1px] border-blue-700 hover:bg-blue-700 hover:text-[#ffffff]"
              }`}
              title="Back to Home"
            >
              <FaArrowLeft />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
