"use client";
import { useTheme } from "@/app/hooks/useTheme";
import ProjectCardDetailed from "./ProjectCardDetailed";
import projects from "@/app/projects/projects";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { callCreateMessage } from "@/app/actions";
import EachField from "./EachField";
import Chat from "./Chat";
import { Sen } from "next/font/google";
import SendMessage from "./SendMessage";

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

export default function Contact() {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleGoogleClick = () => {
    navigator.clipboard.writeText("amlangomes@gmail.com");
    setIsClicked(true);
    setShowPopup(true);
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
    <div
      className={`w-full pt-[20%] sm:pt-[13%] ${
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
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${
                theme ? "text-[#333333]" : "text-[#dddddd]"
              }`}
            >
              Contact Me
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
              className={`text-sm sm:text-base lg:text-md w-full sm:w-[60%] ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              Get in touch via email or connect with me on X, LinkedIn, or
              GitHub to explore my work and stay updated! Click the following
              icons to reach out.
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
        <div className="flex flex-row flex-nowrap justify-between gap-2 sm:flex-wrap sm:gap-4 sm:justify-start relative">
          {techStack.map((tech) => (
            <a
              key={tech[0]}
              href={urls[tech[0]] === "email" ? "#" : urls[tech[0]]}
              target={urls[tech[0]] !== "email" ? "_blank" : undefined}
              rel={
                urls[tech[0]] !== "email" ? "noopener noreferrer" : undefined
              }
              onClick={
                urls[tech[0]] === "email"
                  ? (e) => {
                      e.preventDefault();
                      handleGoogleClick();
                    }
                  : undefined
              }
              onMouseEnter={
                urls[tech[0]] === "email" ? () => setShowPopup(true) : undefined
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

        <div className="mt-16 flex flex-col sm:flex-row min-h-[400px] overflow-hidden gap-5 sm:gap-0">
          <div className="w-full sm:w-[40%] pr-0 sm:pr-5 flex flex-col">
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${
                theme ? "text-[#333333]" : "text-[#dddddd]"
              }`}
            >
              Chat with me
            </h2>
            <p
              className={`text-sm sm:text-base lg:text-md sm:mb-6 text-justify ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              I&apos;d love to chat with you in real-time! My AI-powered chat
              bot is here to answer your questions about my portfolio, projects,
              skills, or any other topic. Feel free to start a conversation, and
              I&apos;ll respond instantly. Whether you&apos;re interested in
              collaboration, feedback, or just a casual talk, this chat is the
              perfect way to connect.
            </p>
            <div
              className={`w-full h-[100px] sm:flex hidden items-center justify-end mt-auto`}
            >
              <div className="relative h-full aspect-[1/1] overflow-hidden rounded-md">
                <Image
                  src="/ChatBoticon.png"
                  alt="Chat Bot Icon"
                  width={1000}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[60%] sm:pt-8 pl-0 sm:pl-7 pr-0 sm:pr-2 aspect-[3/4] sm:md:aspect-[1/1] overflow-hidden">
            <Chat />
          </div>
        </div>
        <SendMessage theme={theme} />
      </div>
      <Footer />
    </div>
  );
}
