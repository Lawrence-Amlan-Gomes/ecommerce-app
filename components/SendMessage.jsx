"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useState, useEffect } from "react";
import { callCreateMessage, callGetAllMessages, callUpdateMessage } from "@/app/actions";
import EachField from "./EachField";

export default function SendMessage({ theme }) {
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState({
    iserror: true,
    error: "Email is required",
  });
  const [messageError, setMessageError] = useState({
    iserror: true,
    error: "Message is required",
  });
  const [noError, setNoError] = useState(false);
  const [firstTimeMessage, setFirstTimeMessage] = useState(true);

  // Validate email
  useEffect(() => {
    if (formEmail === "") {
      setEmailError({ iserror: true, error: "Email is required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
      setEmailError({ iserror: true, error: "Invalid email format" });
    } else {
      setEmailError({ iserror: false, error: "" });
    }
  }, [formEmail]);

  // Validate message
  useEffect(() => {
    if (formMessage === "") {
      setMessageError({ iserror: true, error: "Message is required" });
      setFirstTimeMessage(true);
    } else if (formMessage.length < 10) {
      setMessageError({
        iserror: true,
        error: "Message must be at least 10 characters",
      });
      setFirstTimeMessage(false);
    } else {
      setMessageError({ iserror: false, error: "" });
      setFirstTimeMessage(false);
    }
  }, [formMessage]);

  // Check form validity
  useEffect(() => {
    setNoError(!emailError.iserror && !messageError.iserror);
  }, [emailError.iserror, messageError.iserror]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noError) {
      setSubmitError("Please correct the errors in the form.");
      setTimeout(() => {
        setSubmitError("");
      }, 5000);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    try {
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const messageEntry = [date, formMessage];

      // Check for existing document
      const allMessages = await callGetAllMessages();
      const existingDoc = allMessages.find((doc) => doc.email === formEmail);

      if (existingDoc) {
        // Append new message to existing array
        const updatedMessages = [...(existingDoc.message || []), messageEntry];
        await callUpdateMessage(formEmail, updatedMessages);
      } else {
        // Create new document
        await callCreateMessage({ email: formEmail, message: [messageEntry] });
      }

      setSubmitSuccess(true);
      setFormEmail("");
      setFormMessage("");
      setFirstTimeMessage(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setSubmitError("Failed to send message. Please try again.");
      setTimeout(() => {
        setSubmitError("");
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 overflow-hidden">
      <div className="float-left w-full sm:w-[50%] pr-0 sm:pr-5">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${
            theme ? "text-[#333333]" : "text-[#dddddd]"
          }`}
        >
          Send a Message
        </h2>
        <p
          className={`text-sm sm:text-base lg:text-md mb-6 text-justify ${
            theme ? "text-[#666666]" : "text-[#aaaaaa]"
          }`}
        >
          I’d love to hear from you! Whether you have a question about my
          projects, want to collaborate on an exciting new idea, or simply wish
          to share feedback, this form is the perfect way to get in touch.
          Please provide your email address and a detailed message, and I’ll get
          back to you as soon as possible. Your thoughts and inquiries are
          always appreciated!
        </p>
        <button
          type="submit"
          disabled={submitting || !noError}
          className={`text-[12px] lg:text-[16px] cursor-pointer rounded-md py-2 px-6 ${
            noError && !submitting
              ? "bg-green-800 hover:bg-green-700 text-white"
              : theme
              ? "bg-[#dbdbdb] text-[#808080]"
              : "bg-[#1a1a1a] text-[#696969]"
          }`}
          onClick={handleSubmit}
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
        {submitSuccess && (
          <p className="mt-4 text-green-600 font-medium">
            Message sent successfully!
          </p>
        )}
        {submitError && (
          <p className="mt-4 text-red-600 font-medium">{submitError}</p>
        )}
      </div>
      <div className="float-left w-full sm:w-[50%] pl-0 sm:pl-5">
        <form className="w-full">
          <EachField
            label="Email"
            type="email"
            name="email"
            isReal={true}
            placeholder="Enter your email"
            value={formEmail}
            setValue={setFormEmail}
            iserror={emailError.iserror}
            error={emailError.error}
          />
          <div>
            <div
              className={`text-[12px] lg:text-[16px] mx-[2%] mb-1 text-start mt-5 ${
                theme ? "text-[#111111]" : "text-[#eeeeee]"
              }`}
            >
              {formMessage !== "" ? "Message" : ""}
            </div>
            <textarea
              className={`p-3 border-[2px] text-[12px] lg:text-[16px] box-border w-[96%] mx-[2%] rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-neutral-500 h-32 ${
                firstTimeMessage
                  ? theme
                    ? "border-black"
                    : "border-[#eeeeee]"
                  : !messageError.iserror
                  ? "border-green-700 text-green-600 focus:outline-green-600"
                  : "border-red-600 text-red-600 focus:outline-red-600"
              }`}
              name="message"
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              placeholder="Enter your message"
              autoComplete="off"
            />
            {messageError.iserror ? (
              <div className="text-red-600 mt-1 text-start text-[10px] lg:text-[14px] w-[96%] mx-[2%]">
                {firstTimeMessage ? "" : messageError.error}
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}