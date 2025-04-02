import PricingCard from "./components/PricingCard";

import { packageData } from "@/constants/pricing";
import TrialSection from "./components/TrialSection";



function Pricing() {

  const handleFreeTrial = () =>{
    
  }


  return (
    <div className="min-h-screen w-full mx-auto font-poppins bg-gradient-top-right pt-24">
      <div className="max-w-screen-md mx-auto flex flex-col text-black items-center p-4 space-y-4">
        <p className="text-3xl font-bold text-center">
          The Right Plan for Your Business
        </p>
        <p className="text-lg font-normal text-center text-gray-600">
          We have several powerful plans to showcase your business and get
          discovered as a creative entrepreneurs. Everything you need.
        </p>
      </div>

      <div className="mt-12 w-full flex lg:flex-row flex-col space-y-4 lg:space-y-0 px-4 items-center max-w-screen-lg mx-auto justify-center lg:space-x-4">
        {packageData?.map((e, i) => (
          <PricingCard
            key={i}
            title={e.title}
            price={e.price}
            features={e.features}
            includedFeatures={e.includedFeatures}
            priceId={e.priceId}
          />
        ))}
      </div>
        <TrialSection />
    </div>
  );
}

export default Pricing;
