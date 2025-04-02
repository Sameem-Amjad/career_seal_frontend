import SocialCard from "./components/SocialCard";
import ContactForm from "./components/ContactForm";

import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";
import { Suspense } from "react";

function Contact() {
  return (
    <div className="min-h-screen w-full mx-auto font-poppins bg-gradient-top-right pt-24 p-2">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center">
          <div className="w-full mx-auto flex flex-col text-black space-y-6">
            <p className="text-lg font-medium">Get Started</p>
            <p className="text-6xl font-bold">Get in touch with us.</p>
            <p className="text-6xl font-bold">
              We&apos;re here to assist you.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 justify-around">
            <SocialCard
              icon={<TiSocialFacebook size={30} />}
              link={"https://www.facebook.com/profile.php?id=61574815316386"}
            />
            <SocialCard
              icon={<IoLogoInstagram size={25} />}
              link={"https://www.instagram.com/careersealofficial/"}
            />
            <SocialCard
              icon={<FaTwitter />}
              link={"https://x.com/thecareerseal"}
            />
          </div>
        </div>

        <div className="flex">
          <Suspense fallback={"loading..."}>
          <ContactForm />
          </Suspense>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 mt-20 mb-20">
          <div className="w-80 flex flex-col text-black space-y-6">
            <p className="text-lg font-medium">Contact Info</p>
            <p className="text-3xl font-bold">
              We are always happy to assist you
            </p>
          </div>

          <div className="flex flex-col items-center lg:flex-row space-y-4 lg:space-y-0 text-black justify-between">
            <div className="w-72 flex flex-col space-y-2">
              <p className="text-lg font-medium">Email Address</p>
              <div className="border-2 w-8 rounded border-black"></div>
              <p className="text-lg font-medium cursor-pointer">
                : Housing@careerseal.com, Support@careerseal.com
              </p>
              <p>Assistance hours:</p>
              <p>
                Monday - Friday 6 am to <br /> 8 pm EST
              </p>
            </div>

            <div className="w-72 flex flex-col space-y-2">
              <p className="text-lg font-medium">Number</p>
              <div className="border-2 w-8 rounded border-black"></div>
              <p className="text-lg font-medium cursor-pointer">
                (808) 998-34256
              </p>
              <p>Assistance hours:</p>
              <p>
                Monday - Friday 6 am to <br /> 8 pm EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
