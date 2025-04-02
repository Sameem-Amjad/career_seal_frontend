'use client';
import { getToken } from "@/config/toke";
import Images from "@/constants/Images";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import useUpdatePassword from "@/hooks/auth/useUpdatePassword";
import useUpdateUserDetails from "@/hooks/auth/useUpdateUserDetails";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [originalData, setOriginalData] = useState({
    username: "",
    email: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    


    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setUploading(true);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        await updateUserDetails({ image: data.secure_url });
        alert("Profile updated successfully!"); // Update profile picture to the uploaded image URL
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  }
  };
  const { data } = useGetUserDetails(getToken() || "");
  const { updateUserDetails } = useUpdateUserDetails()
  const { updatePassword, isLoading, isError, error, reset} = useUpdatePassword();
  const handleDiscard = () => {
    setUsername(originalData.username);
    setEmail(originalData.email);
    setPassword("");
    setConfirmPassword("");
    setOldPassword("");
    setShowPasswordFields(false);
  };

  const handleUpdate = async () => {
    try {
      if (showPasswordFields) {
        if (!oldPassword || !password || !confirmPassword) {
          alert("Please fill all password fields.");
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        await updatePassword({oldPassword, newPassword:password})
        alert("Password Updated Successfully")
        reset(); 
      } else {
        // Call update user details API
        await updateUserDetails({ username });
        alert("Profile updated successfully!");
      }
  
      setShowPasswordFields(false);
      setPassword("");
      setConfirmPassword("");
      setOldPassword("");
  
    } catch (error) {
      console.log(error);
      alert("Failed to update profile. Please try again.");
    }
  };
  

  const isTextChanged =
    username !== originalData.username || email !== originalData.email;

  useEffect(()=>{
    if(data){
      setUsername(data.user.username)
      setEmail(data.user.email)
      setProfileImage(data.user.image);
      setOriginalData({
        username: data.user.username,
        email: data.user.email
      })
    }

  },[data])


  return (
    <div className="min-h-screen font-poppins text-black bg-gradient-top-right mb-16">
      <div className="max-w-screen-xl mx-auto pt-28 p-4">
        <div className="max-w-screen-md w-full mx-auto">
          <p className="text-3xl font-bold text-center">Profile</p>
        </div> 

        <div className="lg:w-1/2 w-full flex duration-200 transition-all flex-col space-y-4 border-2 mt-14 p-8 lg:px-24 items-center rounded-3xl mx-auto">
          <div
            className={`w-full flex flex-col space-y-4 items-center transition-all duration-300 ${
              showPasswordFields ? "blur-sm pointer-events-none" : ""
            }`}
          >
            <div className="relative">
          <Image
            src={selectedImage || profileImage || Images.avatarcover}
            alt="profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover"
          />
          {/* Edit Icon */}
          <label htmlFor="fileInput" className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
            <FaEdit className="text-sm" />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

            <div className="flex-col items-center w-full space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  disabled
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {!showPasswordFields && (
            <p
              onClick={() => setShowPasswordFields(true)}
              className="text-black cursor-pointer text-center hover:underline transition duration-200"
            >
              Change Password
            </p>
          )}

          {showPasswordFields && (
            <>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter old password"
                />
              </div>
              {isError && error && <p className="text-red-400">{error.message}</p>}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
            </>
          )}

          <div className="flex flex-col space-y-2 justify-between w-full pt-16">
            <button
              onClick={handleDiscard}
              disabled={!isTextChanged}
              className={`px-4 py-2 rounded-full text-black bg-white border-2 border-gray-300 transition ${
                isTextChanged
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-300 text-gray-200 cursor-not-allowed"
              }`}
            >
              Discard
            </button>
            <button
              disabled={!isTextChanged || selectedImage=="" || uploading}
              onClick={handleUpdate}
              className="px-4 py-2 bg-custom-blue rounded-full text-white hover:bg-opacity-80 transition"
            >
              {isLoading?"updating...": "update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
