import Image from "next/image";
import { useTheme } from "@/app/hooks/useTheme";

export default function ExperienceCard({ exp }) {
  const { theme } = useTheme();

  return (
    <div
      className={`flex w-full max-w-3xl mx-auto transition-all duration-300`}
    >
      {/* Left icon */}
      <div className="flex w-[15%] sm:w-[10%] items-start justify-center relative">
        <div
          className={`relative w-full aspect-[1/1] z-10 flex items-center justify-center p-2 hover:cursor-pointer rounded-lg border-[1px] ${
            theme ? "border-blue-800 bg-white" : "border-blue-700 bg-black"
          }`}
        >
          <Image
            src={exp.img || "/React.png"}
            alt={exp.companyName}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        {exp.id != 1 && (
          <div
            className={`absolute h-full w-[1px] z-0 ${
              theme ? "bg-blue-800" : "bg-blue-700"
            }`}
          ></div>
        )}
      </div>

      {/* Right content */}
      <div className="w-[85%] sm:w-[90%] px-4 sm:px-6 pt-3 sm:pt-5 pb-10">
        <h3
          className={`text-lg xs:text-xl sm:text-2xl font-bold mb-2 ${
            theme ? "text-[#333333]" : "text-[#dddddd]"
          }`}
        >
          {exp.title}
        </h3>

        {/* Company & Duration */}
        <div
          className={`flex justify-between mb-2 text-xs sm:text-base  ${
            theme ? "text-[#555555]" : "text-[#bbbbbb]"
          }`}
        >
          <div className="font-medium pr-2">{exp.companyName}</div>
          <div className="italic">{exp.duration}</div>
        </div>

        {/* Challenge, Action, Result */}
        {exp.paragraphs.map(([label, text], index) => (
          <div key={index} className="mt-4 mb-5">
            <h4
              className={`${
                theme ? "text-[#222222]" : "text-[#cccccc]"
              }  font-semibold text-base sm:text-lg mb-1`}
            >
              {label}:
            </h4>
            <p
              className={`${
                theme ? "text-[#444444]" : "text-[#aaaaaa]"
              } text-justify sm:text-left  leading-relaxed text-xs sm:text-base`}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}