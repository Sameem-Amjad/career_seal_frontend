import Images from "@/constants/Images";
import StepCard from "./StepCard";
import Line from "./Line";

const Steps = () => {
  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row max-w-screen-xl items-center lg:mt-12 justify-center p-4 px-12">
      <div className="flex items-center justify-center w-full lg:w-1/2 space-x-4">
        <div className="flex items-center w-1/2">
          <StepCard
            key="step-1"
            stepNumber={1}
            icon={Images.userrect}
            step="Create Account"
            description="Sign up quickly with your email start your job search and housing journey."
          />
        </div>
        <Line key="line-1" />

        <div className="flex items-center w-1/2">
          <StepCard
            key="step-2"
            stepNumber={2}
            icon={Images.description}
            step="Upload your resume"
            description="Our system will analyze your resume and match you with visa-sponsored job opportunities."
          />
        </div>
      </div>

      <div className="hidden lg:flex">
        <Line key="line-2" />
      </div>


      <div className="flex w-full items-center justify-center lg:w-1/2 space-x-4">
        <div className="flex items-center w-1/2">
          <StepCard
            key="step-3"
            stepNumber={3}
            icon={Images.union}
            step="Explore and Apply"
            description="Receive personalized job recommendations and apply effortlessly through our platform."
          />
        </div>
        <Line key="line-3" />
        <div className="flex items-center w-1/2">
          <StepCard
            key="step-4"
            stepNumber={4}
            icon={Images.message}
            step="Secure Housing & Get Hired"
            description="Already Have a Visa? No problem! With our Elite Plan, you can apply for guaranteed
housing even if your visa is secured..."
// Need a visa AND a job? We've got you covered with job-matching and housing assistance."
          />
        </div>
      </div>
    </div>
  );
};

export default Steps;
