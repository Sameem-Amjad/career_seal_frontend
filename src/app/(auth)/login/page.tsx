import Images from "@/constants/Images";
import LoginForm from "./components/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Images.login})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-top-right z-0"></div>

      <div className="relative flex flex-col sm:flex-row-reverse w-full max-w-screen-xl z-10">
        
        <div className="flex w-full justify-center items-center p-4 sm:p-8">
          <Image
            src={Images.poster}
            alt="Illustration"
            width={400}
            height={400}
            className="max-w-full h-64 sm:h-[450px] object-contain"
          />
        </div>

        <div className="flex w-full lg:ml-24sm:w-1/2 justify-center items-center p-4 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
