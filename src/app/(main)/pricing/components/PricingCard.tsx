"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { startCheckout } from "@/api/paymentApi";
import { DEMO_MODE } from "@/constants/demo";
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
  // Read the login cookie after hydration, so the server and browser render the same first.
  const [token, setToken] = useState<string | undefined>();
  useEffect(() => setToken(getToken()), []);
  const { data: userData } = useGetUserDetails(token || "");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const current = (userData?.user as { subscription?: { plan?: string; status?: string } } | undefined)?.subscription;
  const isCurrent = Boolean(current && ["active", "trialing"].includes(current.status || "") && `${current.plan} Plan` === title);

  const handleCheckout = async () => {
    if (!token) {
      router.push("/login");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const data = await startCheckout(priceId);
      window.location.assign(data.sessionUrl);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || "Something went wrong. Please try again." : "Something went wrong. Please try again.");
      setBusy(false);
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
        disabled={busy || isCurrent}
      >
        {isCurrent ? "Current plan" : busy ? "Starting checkout…" : token ? "Choose" : "Log in to choose"}
      </button>
      {DEMO_MODE && !isCurrent && <p className="mt-2 text-center text-xs text-gray-600">Demo: checkout is simulated, no card is charged.</p>}
      {error && <p role="alert" className="mt-2 text-center text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PricingCard;
