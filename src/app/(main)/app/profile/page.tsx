'use client';
import { getToken } from "@/config/toke";
import Images from "@/constants/Images";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import useUpdatePassword from "@/hooks/auth/useUpdatePassword";
import useUpdateUserDetails from "@/hooks/auth/useUpdateUserDetails";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

/** Shrink a picture to at most 256 px and return it as a JPEG data URL. */
async function toAvatar(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 256 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

const errorText = (err: unknown, fallback: string) =>
  (err as { response?: { data?: { message?: string } } })?.response?.data?.message || fallback;

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

  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) {
      setStatus({ ok: false, text: "Use a PNG, JPG or WebP picture." });
      return;
    }
    try {
      setUploading(true);
      const image = await toAvatar(file);
      setSelectedImage(image);
      await updateUserDetails({ image });
      setProfileImage(image);
      setStatus({ ok: true, text: "Profile picture updated." });
    } catch (err) {
      setSelectedImage(null);
      setStatus({ ok: false, text: errorText(err, "Couldn't update your picture.") });
    } finally {
      setUploading(false);
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
          setStatus({ ok: false, text: "Please fill all password fields." });
          return;
        }
        if (password !== confirmPassword) {
          setStatus({ ok: false, text: "Passwords do not match." });
          return;
        }

        await updatePassword({oldPassword, newPassword:password})
        setStatus({ ok: true, text: "Password updated." });
        reset(); 
      } else {
        // Call update user details API
        await updateUserDetails({ username });
        setOriginalData((d) => ({ ...d, username }));
        setStatus({ ok: true, text: "Profile updated." });
      }
  
      setShowPasswordFields(false);
      setPassword("");
      setConfirmPassword("");
      setOldPassword("");
  
    } catch (error) {
      setStatus({ ok: false, text: errorText(error, "Failed to update profile. Please try again.") });
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
              disabled={(!isTextChanged && !showPasswordFields) || uploading}
              onClick={handleUpdate}
              className="px-4 py-2 bg-custom-blue rounded-full text-white hover:bg-opacity-80 transition disabled:opacity-60"
            >
              {isLoading?"updating...": "update"}
            </button>
            {status && (
              <p role="status" className={`text-sm text-center ${status.ok ? "text-green-700" : "text-red-600"}`}>{status.text}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
