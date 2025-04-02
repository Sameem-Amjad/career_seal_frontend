import Images from "@/constants/Images";
import Image from "next/image";
import CareerCard from "./CareerCard";

const CareerMatch = () => {
  return (
    <div className="min-h-screen w-full max-w-screen-xl px-4 py-4 mt-12 font-poppins mx-auto">
      <div className="w-full flex flex-col items-center justify-center px-20">
        <p className="text-xl lg:text-3xl text-black text-center font-semibold px-20">
          Unlock Your Future with Visa-Sponsored Jobs & Guaranteed Housing
        </p>
        <p className="lg:text-xl text-md text-gray-500 text-center font-light">
          Take the stress out of job hunting and relocating with our all-in-one
          platform designed for visa holders and job seekers.
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center px-20 pt-10">
        <p className="text-xl lg:text-3xl text-black text-center font-semibold px-20">
          Streamline your journey with AI-powered tools that
        </p>
      </div>

      <div className="flex overflow-x-auto w-full gap-8 mt-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex flex-nowrap items-center gap-8">
          <CareerCard
            title="Match your resume"
            description=" with the best visa-sponsored job opportunities"
          />
          <CareerCard
            title="Provide guaranteed housing"
            description=" even if you already have a visa"
          />
          <CareerCard
            title="Simplify applications"
            description="with a seamless process"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between mt-24">
        <div className="w-full lg:w-2/5 p-4">
          <Image
            src={Images.careercover}
            alt="career cover"
            height={400}
            width={400}
            className="w-full object-contain"
          />
        </div>

        <div className="w-full lg:w-2/5 flex flex-col">
          <div className="flex flex-col mt-20 lg:mt-0 space-y-4 mb-8">
            <p className="text-3xl font-medium lg:font-semibold text-black">
              Whether you&apos;re looking for your first opportunity or already
              have a visa and need secure housing, we&apos;ve got you covered!
            </p>
            {/* <p className="text-lg text-gray-500">
              Streamline your job search with innovative AI-powered tools that analyze your resume, match you with tailored opportunities, and simplify the application process for a seamless career journey.
            </p>
            <p className="text-lg text-gray-500">
              Empowering job seekers with cutting-edge features, from intelligent resume matching to automated applications, ensuring a smoother and more efficient way to discover and secure your dream job.
            </p> */}
          </div>

          <div className="flex flex-col space-y-4 mb-16">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200">
              <p className="text-2xl text-black font-medium">1</p>
            </div>
            <p className="text-2xl text-black font-semibold">
              Smart Job Matching
            </p>
            <p className="text-lg text-gray-500">
              Our AI-driven system carefully analyzes your resume, identifies
              key skills, and connects you with top visa-sponsored job
              opportunities that fit your career goals.
            </p>
          </div>

          <div className="flex flex-col space-y-4 mb-16">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200">
              <p className="text-2xl text-black font-medium">2</p>
            </div>
            <p className="text-2xl text-black font-semibold">
              Hassle-Free Housing
            </p>
            <p className="text-lg text-gray-500">
              With our Elite Plan, you can secure guaranteed housing—whether
              you&apos;re still job hunting or have already secured your visa. We
              make relocating stress-free.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200">
              <p className="text-2xl text-black font-medium">3</p>
            </div>
            <p className="text-2xl text-black font-semibold">
              Simplified Applications
            </p>
            <p className="text-lg text-gray-500">
              Our platform provides a list of job applications tailored to your
              skills, helping you apply efficiently and land the right job
              faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMatch;
