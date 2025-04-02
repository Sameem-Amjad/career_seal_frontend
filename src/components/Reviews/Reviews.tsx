import ReviewCard from "./ReviewCard";

const Reviews = () => {
  return (
    <div className="w-full flex mx-auto border-y-2 mt-24 border-custom-blue p-3 lg:px-24 font-poppins space-x-2">
      <div className="flex w-full items-center lg:py-10 gap-14">
        <ReviewCard
          info="73% of newly arrived migrants struggle to afford basic living expenses"
          subtitle=" with many lacking access to stable housing and essential services. (Source: NY1)"
        />
        <ReviewCard
          info="9.8% of low-income immigrant families avoid housing assistance programs"
          subtitle=" due to concerns about immigration status, leaving many without stable living arrangements. (Source: NLIHC)"
        />
        <ReviewCard
          info="Homelessness surged by 53% in New York State in 2024,"
          subtitle=" largely due to migrants facing housing insecurity upon arrival. (Source: NY Post)"
        />
      </div>
    </div>
  );
};

export default Reviews;
