"use client";
import React, { useRef } from "react";
import Images from "@/constants/Images";
import Steps from "@/components/Steps/Steps";
import Reviews from "@/components/Reviews/Reviews";
import FreeTrial from "@/components/FreeTrial/FreeTrial";
import CareerMatch from "@/components/CareerMatch/CareerMatch";
import HeroSection from "@/components/HeroSection/HeroSection";

import { FaArrowDown } from "react-icons/fa6";

export default function Home() {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${Images.landing})`,
          backgroundSize: "cover",
        }}
      >
        <HeroSection />

        <div className="max-w-screen-lg mx-auto mt-12 flex items-center justify-center">
          <button
            onClick={handleScroll}
            className="py-4 px-3 border-2 rounded-xl border-black text-black hover:bg-gray-400"
          >
            <FaArrowDown />
          </button>
        </div>

        <div ref={scrollTargetRef}>
          <Steps />
        </div>
        <CareerMatch />
        <Reviews />
        <FreeTrial />
      </div>
    </>
  );
}
