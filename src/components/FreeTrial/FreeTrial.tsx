"use client";
import { useRouter } from "next/navigation";

const FreeTrial = () => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col items-center bg-gradient-top-right py-20 justify-center space-y-4 text-black p-4 font-poppins mx-auto lg:px-36">
      <p className="text-2xl lg:text-6xl font-bold">
        Start Your Free Trial Today!
      </p>
      <p className="text-sm lg:text-4xl font-medium text-center">
        Enjoy <span className="text-custom-blue"> 3 days </span> of full access
        before committing to a plan that works for you.
      </p>
      <div className="flex flex-col items-center w-full text-xs lg:text-xl py-8 space-y-6">
        <button
          onClick={() => {
            router.push("/pricing");
          }}
          className="w-28 lg:w-64 p-2 py-4 bg-custom-blue rounded-full font-medium text-white hover:scale-95 transition duration-200"
        >
          Start Free Trial
        </button>
        <button className="w-28 lg:w-64 p-2 py-4 border-2 border-gray-400 rounded-full font-medium text-black hover:bg-gray-300 transition duration-200">
          View Plan
        </button>
      </div>
    </div>
  );
};

export default FreeTrial;
