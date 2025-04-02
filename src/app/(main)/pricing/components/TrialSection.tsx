"use client";
import { getToken } from "@/config/toke";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TrialSection = () => {
  const router = useRouter();
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const { data: userData } = useGetUserDetails(token || "");

  const handleCheckout = async () => {
    if (!userData?.user._id) {
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/payment/free-trial/start`,
        {
          userId: userData?.user._id,
        }
      );
      setLoading(false);
      router.push("/app/upload-resume")
      console.log("respnse data for free trial is : ", response);
    } catch (error) {
      console.error("Error initiating checkout:", error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 text-black mt-16 py-16 p-4 font-poppins mx-auto lg:px-36">
      <p className="text-2xl lg:text-6xl font-bold">
        Start Your Free Trial Today!
      </p>
      <p className="text-sm lg:text-4xl font-medium text-center">
        Enjoy <span className="text-custom-blue"> 3 days </span> of full access
        before committing to a plan that works for you.
      </p>
      <div className="flex flex-col items-center w-full text-xs lg:text-xl py-8 space-y-6">
        <button
          onClick={handleCheckout}
          className="w-28 lg:w-64 p-2 py-4 bg-custom-blue rounded-full font-medium text-white hover:scale-95 transition duration-200"
        >
          {loading ? "Loading..." : "Start Free Trial"}
        </button>
      </div>
    </div>
  );
};

export default TrialSection;
