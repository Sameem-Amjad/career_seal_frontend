import Images from "@/constants/Images";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex items-center min-h-screen bg-gradient-top-right lg:bg-transparent p-4 lg:px-24 font-poppins mx-auto space-x-2">
      <div className="max-w-screen-xl lg:flex-row flex-col-reverse mx-auto flex">
        <div className="flex flex-col items-center w-full mt-4 lg:w-1/2">
          <div className="hidden lg:flex w-full justify-center p-4 sm:p-8">
            <Image
              src={Images.bulb}
              alt="bulb"
              width={100}
              height={100}
              className="max-w-full h-24 object-contain"
            />
          </div>
          <div className="flex w-full flex-col space-y-8">
            <div className="flex-col space-y-4 text-black">
              <p className="text-2xl lg:text-3xl font-semibold">
                Secure Your <span className="text-custom-blue">Dream Job</span>&
                Housing Abroad with Ease!
              </p>
              <div className="text-sm lg:text-md">
                <p className="">
                  A platform designed for visa holders and job seekers looking
                  for <strong>guaranteed housing</strong> and
                  <strong> tailored job opportunities.</strong>
                </p>

                <p className=" mt-4">
                  <strong>Your Journey Starts Here:</strong>
                </p>

                <p className=" mt-4">
                  <strong>Find Visa-Sponsored Jobs</strong> - Upload your
                  resume, and we&apos;ll match you with job opportunities that
                  align with your experience and visa requirements.
                </p>

                <p className="">
                  <strong>Guaranteed Housing - Even If You Have a Visa!</strong>{" "}
                  - Whether you&apos;re still job hunting or already have a
                  visa, our Elite Plan ensures you have a secure place to live.
                </p>

                <p className="">
                  <strong>Simplified Process</strong> - Say goodbye to endless
                  searches—our platform streamlines job applications and
                  relocation logistics.
                </p>
              </div>
            </div>
            <Link href={"/pricing"}>
              <button className="p-4 bg-custom-blue rounded-full hover:scale-95 transition duration-200 text-white w-36">
                Try for Free
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:mt-28 flex flex-col items-center lg:justify-center">
          <Image
            src={Images.bulb}
            alt="bulb"
            width={120}
            height={120}
            className="absolute top-32 left-8 max-w-full h-14 lg:hidden object-contain"
          />

          <Image
            src={Images.hero}
            alt="bulb"
            width={384}
            height={384}
            className="max-w-full h-96 w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
