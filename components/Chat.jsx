"use client";

import { useEffect, useState, useRef } from "react";
import { useResponse } from "@/app/hooks/useResponse";
import { response } from "@/app/server";
import PromptInput from "./PromptInput";
import EachInputOutput from "./EachInputOutput";
import { useTheme } from "@/app/hooks/useTheme";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Chat() {
  const {
    myText,
    setMyText,
    aiResponse,
    setAiResponse,
    inputOuputPair,
    setInputOutputPair,
  } = useResponse();
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(true);
  const { auth } = useAuth();
  const { theme } = useTheme();
  const [firstTime, setFirstTime] = useState(true);
  const [request, setRequest] = useState(false);
  const [tempMyText, setTempMyText] = useState("");
  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      const { scrollHeight, clientHeight } = messagesRef.current;
      messagesRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  };

  const getResponse = async () => {
    if (myText !== "") {
      setIsTyping(false);
      setRequest(true);
      setTempMyText(myText);
      const tempInputOutputPair = [...inputOuputPair, [myText, "loading"]];
      setInputOutputPair(tempInputOutputPair);
      setMyText("");
      setTimeout(scrollToBottom, 0);
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 0); // Defer to ensure DOM update
  }, [inputOuputPair]);

  useEffect(() => {
    if (inputOuputPair.length === 0) {
      console.log(inputOuputPair.length);
    } else {
      setFirstTime(false);
    }
  }, [inputOuputPair]);

  useEffect(() => {
    async function fetchData() {
      if (request) {
        try {
          const res = await response(tempMyText, inputOuputPair);
          setAiResponse(res);
          const tempInputOutputPair = [...inputOuputPair];
          tempInputOutputPair[tempInputOutputPair.length - 1] = [
            tempMyText,
            res,
          ];
          setInputOutputPair(tempInputOutputPair);
        } catch (error) {
          console.error("Error fetching AI response:", error);
          setAiResponse("Could not fetch AI response, try again later.");
          const tempInputOutputPair = [...inputOuputPair];
          tempInputOutputPair[tempInputOutputPair.length - 1] = [
            tempMyText,
            "Error: Could not fetch response",
          ];
          setInputOutputPair(tempInputOutputPair);
        } finally {
          setRequest(false);
        }
      }
    }
    fetchData();
  }, [request, tempMyText, inputOuputPair, setAiResponse, setInputOutputPair]);

  return (
    <div
      className={`w-full h-full relative overflow-hidden border-[1px] p-2 rounded-xl ${
        theme
          ? "bg-[#f8f8f8] border-blue-800 text-[#0a0a0a]"
          : "bg-[#080808] border-blue-800 text-[#ebebeb]"
      }`}
    >
      {firstTime ? (
        <div
          className={`w-full h-full flex flex-col justify-between ${
            theme
              ? "bg-[#f8f8f8] text-[#0a0a0a]"
              : "bg-[#0a0a0a] text-[#ebebeb]"
          }`}
        >
          <div className="flex-grow flex justify-center items-center">
            <div className="text-[22px] font-bold">Let&apos;s Talk</div>
          </div>
          <div className="w-[96%] h-[60px] mx-[2%] mb-2">
            <PromptInput
              myText={myText}
              setMyText={setMyText}
              getResponse={getResponse}
              setIsTyping={setIsTyping}
              aiResponse={aiResponse}
            />
          </div>
        </div>
      ) : (
        <>
          <div className={`w-full h-full mt-1 relative`}>
            <div
              ref={messagesRef}
              className={`w-full h-full overflow-y-auto scrollbar pb-[20%] ${
                theme ? "scrollbar-thumb-black" : "scrollbar-thumb-white"
              }`}
            >
              <div className="w-full z-0 my-5">
                {inputOuputPair.length === 0 ? (
                  <div className="text-center text-[14px] text-[#666666]">
                    No messages yet. Start typing to chat!
                  </div>
                ) : (
                  inputOuputPair.map((item, index) => (
                    <EachInputOutput
                      key={index}
                      pair={item}
                      isLast={index === inputOuputPair.length - 1}
                      isLoading={request && index === inputOuputPair.length - 1}
                    />
                  ))
                )}
                <div className="h-[20px]"></div>
              </div>
            </div>
          </div>
          <div
            className={`w-[95%] z-30 h-[60px] absolute bottom-[4%] flex justify-center items-center`}
          >
            <div className="w-[96%] mx-[2%]">
              <PromptInput
                myText={myText}
                setMyText={setMyText}
                getResponse={getResponse}
                setIsTyping={setIsTyping}
                aiResponse={aiResponse}
              />
            </div>
          </div>
          <div
            className={`w-[92%] z-20 h-[20%] absolute bottom-0 flex justify-center items-center ${
              theme ? "bg-[#f8f8f8]" : "bg-[#0a0a0a]"
            }`}
          ></div>
        </>
      )}
    </div>
  );
}