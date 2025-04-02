import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

function Contact() {
  return (
    <div className="min-h-screen w-full mx-auto font-poppins bg-gradient-top-right pt-32 lg:pt-24 p-2">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center">
          <div className="w-full mx-auto flex flex-col text-black space-y-6">
            <p className="text-3xl lg:text-4xl font-semibold">
              Your New Home Awaits - Housing Assistance for
            </p>
            <p className="text-3xl lg:text-4xl font-semibold">
              International Job Seekers
            </p>
          </div>
        </div>
        <div className="py-4">
          <p className="text-black">
            We help you find safe, comfortable, and affordable housing as you
            relocate for work.
          </p>
        </div>

        <div className="text-black text-xl py-6 underline font-semibold">
          <p>Learn how it works</p>
        </div>

        <div className="flex">
          <Link
            href={"/contact?prev=housing"}
            className="px-4 py-4 bg-custom-blue flex rounded-full text-white hover:scale-95 transition duration-200"
          >
            <p>Contact Us for Housing Support</p>
            <span className="ml-4">
              <FaArrowRight size={25} />
            </span>
          </Link>
        </div>

        <div className="py-14 text-xl text-black">
          <div className="text-3xl lg:text-4xl font-semibold">
            <p>Step-by-Step Housing Assistance Process</p>
          </div>
          <div className="gap-8 flex flex-col py-10">
            <div className="flex flex-col gap-8">
              <p className="font-semibold text-xl">
                Step 1: &quot;Submit Your Housing Request&ldquo;
              </p>
              <p>
                Description: &quot;Fill out a simple form with your housing
                preferences and relocation details.&ldquo;
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="font-semibold text-xl">
                Step 2: &quot;Consult with Our Housing Specialist&ldquo;
              </p>
              <p>
                Description: &quot;We&apos;ll connect you with a housing expert to
                discuss your needs and budget.&ldquo;
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="font-semibold text-xl">
                Step 3: &quot;Receive Housing Options&ldquo;
              </p>
              <p>
                Description: &quot;We&apos;ll provide a curated list of housing
                options that match your criteria.&ldquo;
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="font-semibold text-xl">
                Step 4: &quot;Secure Your New Home&ldquo;
              </p>
              <p>
                Description: &quot;We&apos;ll assist you with paperwork, lease
                agreements, and move-in details.&ldquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
