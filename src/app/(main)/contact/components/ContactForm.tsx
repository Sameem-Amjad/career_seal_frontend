"use client";

import { useEffect, useState } from "react";
import ContactInput from "./ContactInput";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import useSendContactDetails from "@/hooks/contact/useSendContactDetails";
import { useSearchParams } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

const ContactForm = () => {
  const params = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: params.get("prev") ? "House Support" : "",
  });
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);

  const { sendContactFormMessage, isLoading, isError, error } =
    useSendContactDetails();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (params.get("prev") == "housing" && e.target.name == "subject") {
      return;
    }
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showPopup = (message: string, type: "success" | "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendContactFormMessage(formData);
      // Optionally clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "",
      });
      showPopup("Your response has been recorded", "success");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (isError) {
      showPopup(error?.message || "Unknown error occured", "error");
    }
  }, [isError, error]);

  return (
    <div className="w-full text-black font-poppins p-2 mt-10">
      <form
        className="bg-transparent min-w-screen-lg mt-4 max-w-md z-10"
        onSubmit={handleSubmit}
      >
        {popupMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`fixed top-5 right-[50%] px-4 py-2 rounded-lg shadow-md z-50 text-white text-sm ${
              popupType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {popupMessage}
          </motion.div>
        )}
        <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-4 lg:space-y-0 justify-between w-full">
          <ContactInput
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <ContactInput
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <ContactInput
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
          />
        </div>
        <div className="flex mt-14 flex-col gap-20 items-center w-full">
          <ContactInput
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={params.get("prev") ? true : false}
            widthFull
          />
          <ContactInput
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            widthFull
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-6 mt-8 bg-custom-blue flex rounded-full text-white hover:scale-95 transition duration-200"
        >
          {isLoading ? "Sending..." : "Leave us a message"}
          <span className="ml-4">
            <FaArrowRight size={25} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
