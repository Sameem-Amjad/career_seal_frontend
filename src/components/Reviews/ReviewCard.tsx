const ReviewCard = ({ info, subtitle }: { info: string; subtitle: string }) => {
  return (
    <div className="w-64 flex flex-col items-center space-y-1 lg:space-y-4 text-black flex-1">
      <p className="lg:text-3xl font-medium text-center">{info}</p>
      <p className="text-[6px] lg:text-sm text-gray-700 font-normal text-center">
        {subtitle}
      </p>
    </div>
  );
};

export default ReviewCard;
