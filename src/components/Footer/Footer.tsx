import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <div className='flex items-center mx-auto font-poppins w-full'>
        <div className="w-full flex flex-col justify-between text-black border-t-2 h-[30vh] lg:h-[70vh] border-black bg-[#F6F6F6] p-2 lg:px-24">
            <div className="flex items-center max-w-screen-xl mx-auto w-full mt-12 lg:mt-24">
                <div className="flex flex-col space-y-1 lg:space-y-3 w-3/5">
                    <p className="text-[7px] lg:text-xl font-semibold">Empowering job seekers with tools to simplify your career journey, from resume matching to seamless applications.</p>
                    <p className="text-[7px] lg:text-lg font-medium">Careerseal, 2025.</p>
                </div>
                <div className="flex items-center text-xs lg:text-lg justify-around w-2/5">
                    <button
                        className="lg:py-4 lg:px-8 text-[7px] lg:text-xl p-1 text-white font-semibold rounded-full bg-custom-blue"
                    >
                        START FREE TRIAL
                    </button>
                    <p 
                    onClick={() => router.push('/pricing')}                    
                    className="text-[8px] lg:text-lg cursor-pointer font-semibold hover:underline">VIEW PLAN</p>
                </div>


            </div>
            <div className="flex items-center max-w-screen-xl mx-auto w-full text-black justify-between p-2">
                <p className="text-xs lg:text-sm hover:underline cursor-pointer ">© 2025 careerseal</p>
                <p className="text-xs lg:text-sm hover:underline cursor-pointer">Terms of Service</p>
            </div>
        </div>
    </div>
  );
};

export default Footer;
