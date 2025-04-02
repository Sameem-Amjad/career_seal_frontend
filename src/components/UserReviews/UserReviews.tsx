import Images from "@/constants/Images";
import UserReviewCard from "./UserReviewCard";

const UserReviews = () => {
  return (
    <div className="flex flex-col items-center pt-20 min-h-screen w-full font-poppins mx-auto">
      {/* Header Section */}
      <div className="max-w-screen-md flex flex-col text-black items-center p-4 space-y-4">
        <p className="text-3xl font-bold text-center">What Our Users Say</p>
        <p className="text-lg font-normal text-center text-gray-600">
          Real success stories from professionals just like you!
        </p>
      </div>
      <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide w-full px-4 mt-6"> 
        
        <UserReviewCard
          name={"Francis Guzman"}
          role={"Designer"}
          review={
            "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus"
          }
          rating={4}
          avatar={Images.avatarcover}
        />
        <UserReviewCard
          name={"Francis Guzman"}
          role={"Designer"}
          review={
            "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus"
          }
          rating={4}
          avatar={Images.avatarcover}
        />
        <UserReviewCard
          name={"Francis Guzman"}
          role={"Designer"}
          review={
            "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus"
          }
          rating={4}
          avatar={Images.avatarcover}
        />
        <UserReviewCard
          name={"Francis Guzman"}
          role={"Designer"}
          review={
            "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus"
          }
          rating={4}
          avatar={Images.avatarcover}
        />

        <UserReviewCard
          name={"Francis Guzman"}
          role={"Designer"}
          review={
            "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus"
          }
          rating={4}
          avatar={Images.avatarcover}
        />
        <UserReviewCard
          name={"Francis Guzman"}
          role={"Designer"}
          review={
            "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus"
          }
          rating={4}
          avatar={Images.avatarcover}
        />

      </div>
    </div>
  );
};

export default UserReviews;