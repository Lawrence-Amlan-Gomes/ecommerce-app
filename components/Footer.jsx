"use client";
import Link from "next/link";
import { useTheme } from "@/app/hooks/useTheme";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { useState } from "react";
import { TiTick } from "react-icons/ti";

function Footer() {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);

  const handleGoogleClick = () => {
    // Copy email to clipboard
    navigator.clipboard.writeText("amlangomes@gmail.com");
    // Show popup
    setShowPopup(true);
    // Hide popup and navigate after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=amlangomes@gmail.com",
        "_blank",
        "noopener,noreferrer"
      );
    }, 2000);
  };

  return (
    <>
      {" "}
      <Link
        className="absolute top-[0%] z-50 left-0 w-1 h-1"
        href="/comments"
      ></Link>
      <footer
        className={`w-full px-[5%] sm:px-[10%] py-[3%] bg-opacity-50 relative ${
          theme
            ? "bg-[#ffffff] border-t border-[#dddddd]"
            : "bg-[#000000] border-t border-[#222222]"
        }`}
      >
        <div className="w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 text-center sm:text-left">
            <span
              className={`text-base sm:text-lg font-bold ${
                theme ? "text-[#0a0a0a]" : "text-[#ebebeb]"
              }`}
            >
              Lawrence
            </span>
            <span className="hidden sm:inline text-xs sm:text-sm">|</span>
            <span
              className={`text-xs sm:text-sm ${
                theme ? "text-[#555555]" : "text-[#cccccc]"
              }`}
            >
              © {new Date().getFullYear()} Lawrence. All rights reserved.
            </span>
          </div>
          <div className="flex items-center space-x-4 relative">
            <a
              href="https://x.com/AmlanGomes2001"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl ${
                theme
                  ? "text-[#0a0a0a] hover:text-blue-800"
                  : "text-[#ebebeb] hover:text-blue-600"
              }`}
            >
              <BsTwitterX />
            </a>
            <a
              href="https://www.linkedin.com/in/lawrence-amlan-gomes-13847426b/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl ${
                theme
                  ? "text-[#0a0a0a] hover:text-blue-800"
                  : "text-[#ebebeb] hover:text-blue-600"
              }`}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Lawrence-Amlan-Gomes"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl ${
                theme
                  ? "text-[#0a0a0a] hover:text-blue-800"
                  : "text-[#ebebeb] hover:text-blue-600"
              }`}
            >
              <FaGithub />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleGoogleClick();
              }}
              className={`text-xl ${
                theme
                  ? "text-[#0a0a0a] hover:text-blue-800"
                  : "text-[#ebebeb] hover:text-blue-600"
              }`}
            >
              <SiGmail />
            </a>
            <Link href="/contact">
              <div
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-[15px] font-medium hover:cursor-pointer ${
                  theme
                    ? "bg-blue-800 text-[#ffffff] hover:bg-white border-[1px] border-blue-800 hover:text-blue-800"
                    : "bg-blue-700 text-[#ffffff] hover:bg-black border-[1px] border-blue-600 hover:text-blue-600"
                }`}
              >
                Stay Connected
              </div>
            </Link>
            {showPopup && (
              <div
                className={`absolute bottom-12 right-0 text-[12px] font-medium ${
                  theme ? "text-[#333333]" : "text-[#dddddd]"
                }`}
              >
                <div className="flex justify-center items-center gap-1">
                  Copied <TiTick /> amlangomes@gmail.com
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;