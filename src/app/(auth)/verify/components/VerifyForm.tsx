"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import useVerifyCode from "@/hooks/auth/useVerifyCode";
import useLogout from "@/hooks/auth/useLogout";
import useResendEmail from "@/hooks/auth/useResendEmail";
import { getToken } from "@/config/toke";
import { queryClient } from "@/api/QueryClient";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

const VerifyForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [disableResend, setDisableResend] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);

  const { logout } = useLogout();
  const { data } = useGetUserDetails(getToken() || "");
  const { data: verificationData, isError, isLoading, error, refetch } = useVerifyCode({
    email: data?.user.email || "",
    code: otp.join("") || "",
  });
  const { resendEmail, isLoading: isResendEmailLoading } = useResendEmail();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; 
    if (value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
    if (nextInput && value) nextInput.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.user?.email || otp.join("").length !== 4) {
      showPopup("Invalid email or incomplete OTP.","error")
      return;
    }

    await refetch();
  };

  const showPopup = (message: string, type: "success" | "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000); 
  };

  const handleResendEmail = async () => {
    if (!disableResend && !isResendEmailLoading) {
      try {
        await resendEmail();
        showPopup("Verification email sent!", "success")
        setDisableResend(true);

        setTimeout(() => {
          setDisableResend(false);
        }, 30000); 
      } catch (error) {
        console.log(error)
        showPopup("Failed to resend email", "error")
      }
    }
  };

  useEffect(() => {
    if (verificationData?.success) {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      Cookies.set("verified", "true");
      router.push("/app/upload-resume");
    }
  }, [verificationData, router]);

  return (
    <div className="w-96 font-poppins p-2">
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-md z-50 text-white text-sm ${
              popupType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col space-y-2 w-full text-black mb-6">
        <p className="text-2xl font-semibold">Check your mailbox</p>
        <p className="font-normal">Verify codes delivered to your inbox.</p>
      </div>

      <div className="border mb-6 border-gray-400 w-full"></div>

      <div className="flex flex-col text-black space-y-2">
        <p className="text-sm font-light">We sent a verification code to:</p>
        <p className="text-sm font-medium">{data?.user.email}</p>
      </div>

      <form className="bg-transparent w-full mt-4 max-w-md z-10" onSubmit={handleSubmit}>
        <div className="flex justify-between mt-6 mb-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              className="w-14 h-14 text-center text-2xl text-white bg-[#4A4A4A] font-semibold border rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputMode="numeric"
            />
          ))}
        </div>

        {isError && <p className="text-red-500">{error?.message}</p>}

        <button
          type="submit"
          className="w-full mb-4 py-4 bg-[#0575E6] text-white rounded-full hover:scale-95 transition duration-200"
        >
          {isLoading ? "Submitting..." : "Continue"}
        </button>

        <div className="flex items-center space-x-1 justify-center">
          <p className="text-sm font-light text-black">Didn’t receive the email?</p>
          <p
            onClick={handleResendEmail}
            className={`text-sm font-medium ${
              !disableResend && ! isResendEmailLoading ? "text-[#0000F6] cursor-pointer hover:underline" : "text-gray-300"
            }`}
          >
            Click to resend
          </p>
        </div>
      </form>

      <div
        onClick={() => logout()}
        className="flex items-center mt-4 text-black transition duration-200 hover:scale-105 cursor-pointer justify-center space-x-4 w-full"
      >
        <FaArrowLeft />
        <p className="text-sm font-medium">Back to Login</p>
      </div>
    </div>
  );
};

export default VerifyForm;
