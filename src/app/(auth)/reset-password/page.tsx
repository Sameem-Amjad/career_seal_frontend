// "use client";
// import Images from "@/constants/Images";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import useResetPassword from "@/hooks/auth/useResetPassword";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [popupMessage, setPopupMessage] = useState<string | null>(null);
//   const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");

//   const { resetPassword, isLoading, isError, error } = useResetPassword();

//   const handleResetPassword = async () => {
//     if(token==null){
//         router.push("/")
//         showPopup("No token found redirecting...", "error");

//     }
//     if (!newPassword) {
//       showPopup("Please enter a new password!", "error");
//       return;
//     }

//     try {
//       await resetPassword({ token: token || "", newPassword });
//       showPopup("Your password has been successfully reset! redirecting...", "success");
//       router.push("/login");
//     } catch (err) {
//       console.log(err);
//       showPopup(error?.message || "Something went wrong!", "error");
//     }
//   };

//   const showPopup = (message: string, type: "success" | "error") => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setTimeout(() => {
//       setPopupMessage(null);
//       setPopupType(null);
//     }, 3000);
//   };

//   useEffect(()=>{
//     if(isError){
//         showPopup(error?.message || "Unknown error occured", "error")
//     }
//   },[isError, error])

//   return (
//     <div
//       className="relative flex font-poppins flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${Images.login})` }}
//     >
//       <div className="absolute inset-0 bg-gradient-top-right z-0"></div>

//       {/* Popup Message */}
//       {popupMessage && (
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -30 }}
//           className={`fixed top-5 px-4 py-2 rounded-lg shadow-md z-50 text-white text-sm ${
//             popupType === "success" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {popupMessage}
//         </motion.div>
//       )}

//       <div className="flex flex-col border border-gray-400 bg-white items-center rounded-xl z-10 space-y-4 p-6 w-96 shadow-lg text-black h-max">
//         <p className="text-2xl font-semibold">Reset Password</p>
//         <p className="text-gray-600 text-sm text-center">
//           Enter your new password to update your account security.
//         </p>

//         <div className="flex flex-col w-full">
//           <label htmlFor="newPassword" className="text-black font-medium block mb-1">
//             New Password
//           </label>
//           <input
//             type="password"
//             id="newPassword"
//             name="newPassword"
//             className="w-full p-2 rounded-xl transition-all duration-200 border text-black font-medium border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleResetPassword}
//           disabled={isLoading}
//           className="w-44 mt-4 p-2 bg-[#0575E6] text-white rounded-full hover:scale-95 text-sm transition duration-200 disabled:opacity-50"
//         >
//           {isLoading ? "Resetting..." : "Reset Password"}
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";
import Images from "@/constants/Images";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import useResetPassword from "@/hooks/auth/useResetPassword";
import { useRouter, useSearchParams } from "next/navigation";

// Move the main logic into a separate component that uses useSearchParams
function ResetPasswordContent() {
  const [newPassword, setNewPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const { resetPassword, isLoading, isError, error } = useResetPassword();

  const handleResetPassword = async () => {
    if (token == null) {
      router.push("/");
      showPopup("No token found redirecting...", "error");
    }
    if (!newPassword) {
      showPopup("Please enter a new password!", "error");
      return;
    }

    try {
      await resetPassword({ token: token || "", newPassword });
      showPopup("Your password has been successfully reset! redirecting...", "success");
      router.push("/login");
    } catch (err) {
      console.log(err);
      showPopup(error?.message || "Something went wrong!", "error");
    }
  };

  const showPopup = (message: string, type: "success" | "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  useEffect(() => {
    if (isError) {
      showPopup(error?.message || "Unknown error occurred", "error");
    }
  }, [isError, error]);

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
      <div className="flex flex-col border border-gray-400 bg-white items-center rounded-xl z-10 space-y-4 p-6 w-96 shadow-lg text-black h-max">
      <p className="text-2xl font-semibold">Reset Password</p>
        <p className="text-gray-600 text-sm text-center">
          Enter your new password to update your account security.
        </p>

        <div className="flex flex-col w-full">
          <label htmlFor="newPassword" className="text-black font-medium block mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full p-2 rounded-xl transition-all duration-200 border text-black font-medium border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={isLoading}
          className="w-44 mt-4 p-2 bg-[#0575E6] text-white rounded-full hover:scale-95 text-sm transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

// Main component wrapping the content with Suspense
export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}