import { motion } from "framer-motion";
import Image from "next/image";
import Pic from "../public/22.jpg";
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";

export default function LandingAbout() {
  const { theme } = useTheme();

  return (
    <div className="w-full px-[5%] sm:px-[10%] flex flex-row justify-between items-start gap-4 sm:gap-6 mb-[10%]">
      {/* LEFT TEXT SECTION */}
      <div className={`w-[60%] sm:w-[70%] mr-[2.5%]`}>
        <h1
          className={`text-2xl xs:text-3xl sm:text-4xl lg:text-6xl 2xl:text-7xl font-bold mb-3 text-justify ${
            theme ? "text-[#0a0a0a]" : "text-[#ebebeb]"
          }`}
        >
          👋 Hi, <br /> I&apos;m Lawrence.
        </h1>

        <h2
          className={`text-sm xs:text-base sm:text-xl font-semibold mb-4 text-justify ${
            theme ? "text-[#333333]" : "text-[#cccccc]"
          }`}
        >
          Frontend Engineer | Building High-Performance, User-Friendly Web Apps
        </h2>

        <p
          className={`leading-relaxed mb-6 text-justify text-xs sm:text-base ${
            theme ? "text-[#555555]" : "text-[#aaaaaa]"
          }`}
        >
          I&apos;m a Frontend Engineer passionate about crafting web
          applications that excel in both speed and design. I utilize the latest
          technologies and prioritize a user-centric approach to build scalable,
          responsive, and secure frontend architectures for businesses.
        </p>

        <p
          className={`font-medium mb-3 text-justify text-xs sm:text-base ${
            theme ? "text-[#444444]" : "text-[#bbbbbb]"
          }`}
        >
          Looking to elevate your web app&apos;s performance and user
          experience? I can help you achieve that.
        </p>

        <ul
          className={`list-disc ml-5 space-y-2 mb-8 text-justify text-xs sm:text-base ${
            theme ? "text-[#666666]" : "text-[#aaaaaa]"
          }`}
        >
          <li>Transform your vision into stunning web apps with React</li>
          <li>Boost performance with cutting-edge Next.js solutions</li>
          <li>Streamline your app’s logic with expert Redux integration</li>
          <li>Elevate your brand with captivating Framer Motion animations</li>
          <li>
            Revolutionize your business with seamless AI integration using
            cutting-edge tools
          </li>
          <li>Deliver real-time experiences using Firebase expertise</li>
          <li>Power your data with seamless MongoDB management</li>
          <li>and more...</li>
        </ul>

        <div className="flex gap-4">
          <Link href="/about">
            <div
              className={`px-4 py-2 flex justify-center items-center rounded-md text-sm sm:text-[15px] font-medium hover:cursor-pointer ${
                theme
                  ? "bg-blue-800 text-[#ffffff] hover:bg-white border-[1px] border-blue-800 hover:text-blue-800"
                  : "bg-blue-700 text-[#ffffff] hover:bg-black border-[1px] border-blue-600 hover:text-blue-600"
              }`}
            >
              Experience
            </div>
          </Link>
          <Link
            href="/resume"
            className={`px-5 py-2 rounded-lg text-sm sm:text-[15px] font-semibold transition ${
              theme
                ? "bg-[#0a0a0a] text-[#ffffff] border-[1px] hover:bg-transparent hover:text-black border-[#0a0a0a]"
                : "bg-[#ebebeb] text-[#0a0a0a] border-[1px] hover:bg-transparent hover:text-white border-[#ebebeb]"
            }`}
          >
            Resume
          </Link>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-[40%] sm:w-[30%] ml-[2.5%]">
        {/* RIGHT IMAGE SECTION */}
        <div
          className={`relative rounded-xl overflow-hidden h-[200px] xs:h-[250px] sm:h-[300px] lg:h-[350px] 2xl:h-[400px] mb-6 ${
            theme ? "border-[#000000]" : "border-[#444444]"
          }`}
        >
          <Image
            src={Pic}
            alt="Profile picture"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* NEW UNIVERSITY SECTION */}
        <a
          className="h-full w-full"
          href="https://www.bracu.ac.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={`relative rounded-xl h-[300px] xs:h-[300px] sm:h-[300px] lg:h-[250px] 2xl:h-[300px] border ${
              theme
                ? "hover:bg-[#f8f8f8] border-[#888888]"
                : "border-[#333333] hover:bg-[#080808]"
            }`}
          >
            <Image
              src="/graduationIcon.png"
              alt="Graduation Icon"
              width={32}
              height={32}
              className="absolute top-[-5px] sm:top-2 left-0 sm:left-3 object-contain"
            />
            <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-center mb-4">
                <Image
                  src={theme ? "/bracuIconLight.png" : "/bracuIconDark.png"}
                  alt="Brac University Icon"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="w-full flex flex-col items-center">
                <p
                  className={`text-xs sm:text-[15px] 2xl:text-[18px] font-medium mb-2 text-center ${
                    theme ? "text-[#333333]" : "text-[#cccccc]"
                  }`}
                >
                  Bachelor of Science in Computer Science (2022-2025)
                </p>
                <p
                  className={`text-[10px] sm:text-[14px] 2xl:text-[16px] text-center ${
                    theme ? "text-[#555555]" : "text-[#aaaaaa]"
                  }`}
                >
                  Brac University | Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}