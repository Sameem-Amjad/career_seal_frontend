import Image from "next/image"

const StepCard = ({stepNumber, step, icon, description}: {stepNumber:number, step:string, icon:string, description:string}) => {
  return (
    <div className="flex flex-col items-center text-black space-y-4 font-poppins p-2 w-full">
        <div className="lg:w-24 w-20 h-20 lg:h-24 flex items-center justify-center rounded-3xl bg-custom-blue">
            <Image
                src={icon}
                alt="step"
                width={40}
                height={40}
                className="w-8 lg:w-12"
            />
        </div>
        <p className="text-sm text-gray-400">Step {stepNumber}</p>

        <p className="text-sm lg:text-lg font-semibold h-12 lg:h-max">{step}</p>
        <p className="text-sm font-light text-black text-center h-28">{description}</p>
    </div>
  )
}

export default StepCard