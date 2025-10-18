"use client";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { useTheme } from "@/app/hooks/useTheme";
import { callGetAllMessages } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Comments() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await callGetAllMessages(); // Fetch messages
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    }
    fetchMessages();
  }, []);

  const handleLogout = () => {
    setAuth([]); // Clear authentication state
    router.push("/login"); // Redirect to /home
  };

  return (
    <div
      className={`w-full pt-[20%] sm:pt-[13%] mb-[5%] ${
        theme ? "bg-[#ffffff] text-[#aaaaaa]" : "bg-[#000000] text-[#eeeeee]"
      }`}
    >
      {auth ? (
        <>
          {auth.isAdmin ? (
            <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto px-[5%] sm:px-0">
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 ${
                  theme ? "text-[#333333]" : "text-[#dddddd]"
                }`}
              >
                Client Testimonials
              </h2>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <CommentCard key={message._id} message={message} />
                ))
              ) : (
                <p
                  className={`text-sm sm:text-base lg:text-md ${
                    theme ? "text-[#444444]" : "text-[#aaaaaa]"
                  } leading-relaxed`}
                >
                  No testimonials available yet.
                </p>
              )}
            </div>
          ) : (
            <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto px-[5%] sm:px-0">
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 flex justify-center items-center ${
                  theme ? "text-[#333333]" : "text-[#dddddd]"
                }`}
              >
                Only Admin Can View This Page
              </h2>
            </div>
          )}
          <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto mt-8 flex justify-center px-[5%] sm:px-0">
            <button
              onClick={handleLogout}
              className={`text-[12px] sm:text-sm lg:text-[16px] cursor-pointer rounded-md py-2 px-6 bg-red-800 hover:bg-red-700 text-white`}
            >
              Logout
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}