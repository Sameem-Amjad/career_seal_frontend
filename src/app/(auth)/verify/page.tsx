import Images from "@/constants/Images";
import Image from "next/image";
import VerifyForm from "./components/VerifyForm";



export default function Verify() {
  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Images.login})`, 
      }}
    >
      <div className="absolute inset-0 bg-gradient-top-right z-0"></div>

      <div className="relative flex flex-col sm:flex-row-reverse w-full max-w-screen-xl z-10">

        <div className="flex w-full justify-center items-center p-4 sm:p-8 sm:w-1/2">
          <Image
            src={Images.poster3}
            alt="Illustration"
            width={400}
            height={400}
            className="max-w-full h-[250px] sm:h-[450px] object-contain"
          />
        </div>
        <div className="w-full sm:w-1/2 flex justify-center p-8 mt-4">
          <VerifyForm/>
        </div>
        
      </div>
    </div>
  );
}
