"use client";
import Images from "@/constants/Images";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useForgotPassword from "@/hooks/auth/useForgotPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const { requestPasswordReset, isLoading, isError, error, reset } = useForgotPassword();

  const handleForgotPassword = async () => {
    if (!email) {
      showPopup("Please enter your email!", "error");
      return;
    }

    try {
      await requestPasswordReset({ email });
      showPopup("An email has been sent.", "success");
      setEmail("");
      reset();
    } catch (err) {
      console.log(err)
      showPopup(error?.message || "Something went wrong!", "error");
    }
  };

  useEffect(()=>{
        if(isError){
            showPopup(error?.message || "Unknown error occured", "error")
        }

  },[isError, error])

  const showPopup = (message: string, type: "success" | "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000); 
  };

  return (
    <div
      className="relative flex font-poppins flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Images.login})` }}
    >
      <div className="absolute inset-0 bg-gradient-top-right z-0"></div>

      {/* Popup Message */}
      {popupMessage && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className={`fixed top-5 px-4 py-2 rounded-lg shadow-md z-50 text-white text-sm ${
            popupType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {popupMessage}
        </motion.div>
      )}

      <div className="flex flex-col border border-gray-400 bg-white items-center rounded-xl z-10 space-y-4 p-4 w-80 shadow-lg text-black h-max">
        <p className="text-2xl font-semibold">Forgot Password?</p>
        <p>Enter the email of the account</p>
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-black font-medium block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 rounded-xl transition-all duration-200 border text-black font-medium border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isLoading}
            className="w-44 mb-4 p-2 bg-[#0575E6] text-white rounded-full hover:scale-95 text-sm transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
