

const CareerCard = ({title, description} : {title:string, description:string }) => {

  return (
    <div className='flex items-center p-4 h-60 border-2 border-custom-blue border-opacity-40 bg-gray-50 w-96 rounded-3xl font-poppins'>
        <div className="flex flex-col w-full items-center text-black space-y-8">
            <p className="text-2xl font-semibold text-center">{title}</p>
            <p className="text-xl font-normal text-gray-500 text-center">{description}</p>
        </div>
    </div>
  );
};

export default CareerCard;
