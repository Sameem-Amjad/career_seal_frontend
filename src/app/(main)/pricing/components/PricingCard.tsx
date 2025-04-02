"use client";
import React from "react";
import axios from "axios";
import Feature from "./Feature";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";

import { getToken } from "@/config/toke";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  title: string;
  priceId: string;
  price: number;
  features: string[];
  includedFeatures: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  priceId,
  price,
  features,
  includedFeatures,
}) => {
  const router = useRouter();
  const token = getToken();
  const { data: userData } = useGetUserDetails(token || "");

  const handleCheckout = async () => {
    if (!userData?.user._id) {
      router.push("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/payment/create-checkout-session`,
        {
          priceId,
          userId: userData?.user._id,
        }
      );

      if (data.success) {
        router.push(data.sessionUrl);
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="text-black border-custom-blue flex flex-col justify-between transition-all duration-200 lg:h-max w-96 lg:hover:-translate-y-8 border border-opacity-30 rounded-3xl hover:bg-custom-blue hover:bg-opacity-20 hover:border-opacity-100 shadow-md px-3 py-5 bg-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {title === "Plus Plan" && (
          <div className="p-2 text-sm font-medium rounded-lg bg-black text-white">
            Save $40
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-1 w-60 lg:w-60 h-60 overflow-y-auto after:items-center justify-center">
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature}
            disabled={!includedFeatures.includes(feature)}
          />
        ))}
      </div>

      <p className="text-lg text-black font-bold mt-6">
        <span className="text-sm font-normal">$</span>
        {price}
        <span className="text-sm text-gray-600 font-normal relative top-1">
          /month
        </span>
      </p>

      <button
        className="mt-4 bg-custom-blue rounded-xl w-full hover:bg-opacity-80 transition duration-200 text-white font-bold py-2 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleCheckout}
        disabled={!userData}
      >
        Choose
      </button>
    </div>
  );
};

export default PricingCard;
