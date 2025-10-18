"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";
import Image from "next/image";
import { TiTick } from "react-icons/ti";

const techStack = [
  ["X", "/XLight.png", "/XDark.png"],
  ["LinkedIn", "/LinkedIn.png", "/LinkedIn.png"],
  ["GitHub", "/gitHubLight.png", "/gitHubDark.png"],
  ["Email", "/gmail.png", "/gmail.png"],
];

const urls = {
  Email: "email",
  X: "https://x.com/AmlanGomes2001",
  LinkedIn: "https://www.linkedin.com/in/lawrence-amlan-gomes-13847426b/",
  GitHub: "https://github.com/Lawrence-Amlan-Gomes",
};

export default function LandingContact() {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleGoogleClick = () => {
    // Copy email to clipboard
    navigator.clipboard.writeText("amlangomes@gmail.com");
    // Show "Copied" with tick
    setIsClicked(true);
    setShowPopup(true);
    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
      setIsClicked(false);
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=amlangomes@gmail.com",
        "_blank",
        "noopener,noreferrer"
      );
    }, 2000);
  };

  return (
    <div className="px-[5%] sm:px-[10%] mb-[2%] pb-[5%] w-full">
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
            Let&apos;s Connect
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
        <div className="flex flex-col sm:flex-row mt-2 gap-4 sm:gap-0">
          <p
            className={`text-base lg:text-md w-full sm:w-[60%] ${
              theme ? "text-[#666666]" : "text-[#aaaaaa]"
            }`}
          >
            Get in touch via email or connect with me on X, LinkedIn, or GitHub to
            explore my work and stay updated! Click the following icons to reach out.
          </p>
          <div className="w-full sm:w-[40%] flex justify-start pl-0 sm:pl-8 items-center">
            {showPopup && (
              <div
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                  theme
                    ? "bg-[#ffffff] text-[#333333] border-[1px] border-[#333333]"
                    : "bg-[#080808] text-[#bbbbbb] border-[1px] border-[#bbbbbb]"
                }`}
              >
                {isClicked ? (
                  <>
                    Copied <TiTick />
                  </>
                ) : (
                  "amlangomes@gmail.com"
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 relative ">
        {techStack.map((tech) => (
          <a
            key={tech[0]}
            href={urls[tech[0]] === "email" ? "#" : urls[tech[0]]}
            target={urls[tech[0]] !== "email" ? "_blank" : undefined}
            rel={urls[tech[0]] !== "email" ? "noopener noreferrer" : undefined}
            onClick={
              urls[tech[0]] === "email"
                ? (e) => {
                    e.preventDefault();
                    handleGoogleClick();
                  }
                : undefined
            }
            onMouseEnter={
              urls[tech[0]] === "email"
                ? () => setShowPopup(true)
                : undefined
            }
            onMouseLeave={
              urls[tech[0]] === "email"
                ? () => {
                    if (!isClicked) setShowPopup(false);
                  }
                : undefined
            }
            className={`flex flex-col items-center justify-center p-4 sm:p-8 hover:cursor-pointer rounded-lg border-[1px] ${
              theme
                ? "border-blue-800 hover:bg-[#fafafa]"
                : "border-blue-700 hover:bg-[#080808]"
            }`}
          >
            <Image
              src={theme ? tech[1] : tech[2]}
              alt={tech[0]}
              width={32}
              height={32}
              className="object-contain"
            />
          </a>
        ))}
      </div>
      <div className="flex justify-start mt-8">
        <Link href="/contact">
          <div
            className={`px-4 py-2 rounded-md text-sm sm:text-[15px] font-medium hover:cursor-pointer ${
              theme
                ? "bg-blue-800 text-[#ffffff] hover:bg-white border-[1px] border-blue-800 hover:text-blue-800"
                : "bg-blue-700 text-[#ffffff] hover:bg-black border-[1px] border-blue-600 hover:text-blue-600"
            }`}
          >
            Stay Connected
          </div>
        </Link>
      </div>
    </div>
  );
}