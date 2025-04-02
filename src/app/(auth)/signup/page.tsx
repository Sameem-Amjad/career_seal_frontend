import Images from "@/constants/Images";
import SignupForm from "./components/SignupForm";
import Image from "next/image";

export default function Signup() {
  
  return (
    <div
      className="relative flex flex-col sm:flex-row justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Images.login})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-top-right z-0"></div>

      <div className="relative flex flex-col sm:flex-row-reverse w-full max-w-screen-xl z-10">

        <div className="flex w-full justify-center items-center p-4 sm:p-8 sm:w-1/2">
          <Image
            src={Images.poster2}
            alt="Illustration"
            width={400}
            height={400}
            className="max-w-full h-[250px] sm:h-[450px] object-contain"
          />
        </div>

        <div className="flex w-full justify-center items-center sm:p-8 sm:w-1/2">
          <SignupForm />
        </div>

      </div>
    </div>
  );
}
