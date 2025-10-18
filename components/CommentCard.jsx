"use client";
import { useTheme } from "@/app/hooks/useTheme";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CommentCard({ message }) {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden border-[1px] hover:cursor-pointer mb-6 transition-all duration-300 ${
        theme
          ? "hover:bg-[#fafafa] text-[#333333] border-blue-800"
          : "hover:bg-[#0a0a0a] text-[#dddddd] border-blue-800"
      }`}
    >
      {/* Optional Image Section */}
      {message.img && (
        <div className="relative w-full h-[150px] sm:h-[200px] px-4 sm:px-6 pt-4 sm:pt-6 overflow-hidden sm:flex hidden">
          <div
            className={`relative h-full w-full overflow-hidden rounded-md border-[1px] ${
              theme ? "border-[#dddddd]" : "border-[#222222]"
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={message.img}
                alt={message.email}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="relative flex flex-col p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <h2
            className={`text-base sm:text-md md:text-lg font-semibold pr-4 sm:pr-5 ${
              theme ? "text-[#222222]" : "text-[#cccccc]"
            }`}
          >
            {message.email}
          </h2>
        </div>
        {message.message && message.message.length > 0 ? (
          message.message.map(([date, text], index) => (
            <div key={index} className="mb-3 sm:mb-4 last:mb-0">
              {date && text ? (
                <div className="w-full flex flex-col sm:flex-row justify-between items-start">
                  <div className="w-full sm:w-[80%] pr-0 sm:pr-5">
                    <p
                      className={`text-xs sm:text-sm lg:text-base font-medium text-justify ${
                        theme ? "text-[#666666]" : "text-[#aaaaaa]"
                      }`}
                    >
                      {text}
                    </p>
                  </div>
                  <div className="w-full sm:w-[20%] mt-2 sm:mt-0">
                    <p
                      className={`text-xs sm:text-sm lg:text-base text-right ${
                        theme ? "text-[#444444]" : "text-[#aaaaaa]"
                      }`}
                    >
                      {date}
                    </p>
                  </div>
                </div>
              ) : (
                <p
                  className={`text-xs sm:text-sm lg:text-base ${
                    theme ? "text-[#444444]" : "text-[#aaaaaa]"
                  }`}
                >
                  Invalid message format
                </p>
              )}
            </div>
          ))
        ) : (
          <p
            className={`text-xs sm:text-sm lg:text-base ${
              theme ? "text-[#444444]" : "text-[#aaaaaa]"
            }`}
          >
            No messages available.
          </p>
        )}
      </div>
    </div>
  );
}