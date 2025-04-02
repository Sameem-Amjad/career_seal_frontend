
import Rating from "@/app/(main)/app/upload-resume/components/Rating"
import Image from "next/image"
interface UserReviewCardProps{
    name:string,
    role:string,
    review:string,
    rating:number,
    avatar:string
}

const UserReviewCard:React.FC<UserReviewCardProps> = ({name, role, review, rating, avatar}) => {
  return (
    <div className="relative flex flex-col pl-16 items-center w-96 text-black space-y-4 font-poppins h-max p-2 flex-shrink-0">
        <div className="w-full flex flex-col space-y-2 bg-gray-100 rounded-3xl p-8">
            <div className="flex flex-col">
                <p className="text-xl font-semibold">{name}</p>
                <p className="text-sm font-semibold text-gray-600">{role}</p>
            </div>
            <Rating maxStars={5} rating={rating}/>
            <p className="text-xs font-normal text-gray-700">
                {review}   
            </p>
            
        </div>
        <Image
            src={avatar}
            alt="avatar"
            width={10}
            height={10}
            className="w-16 h-16 absolute top-10 left-6 object-contain rounded-full"
        />
    </div>
  )
}

export default UserReviewCard