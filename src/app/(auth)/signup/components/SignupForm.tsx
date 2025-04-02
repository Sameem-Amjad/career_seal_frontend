"use client";

import Images from "@/constants/Images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useSignup from "@/hooks/auth/useSignup";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import { getToken } from "@/config/toke";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { data, isLoading, isError, error, refetch } = useSignup(formData);
  
  const { refetch: myRefetch } = useGetUserDetails(getToken() || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch();    
  };

  useEffect(()=>{
    const signupQueryWrapper = async () =>{
      if (data?.token && !isLoading) {
        Cookies.set('token', data.token, { expires: 7 });
        await myRefetch()
        router.push(`/verify`)
      } else {
        console.log("Token is missing in the signup response.");
      }
    }
    signupQueryWrapper()
  },[data, isLoading, router, myRefetch])



  const handleGoogleSignIn = () => {
    console.log("google sign in");
  };

  return (
    <div className="w-96 font-poppins p-2">
      <div className="flex flex-col space-y-2 text-black w-full">
        <p className="text-2xl font-semibold">Create an account</p>
        <p className="font-normal">Welcome! Let&apos;s create your account</p>
      </div>
      <form
        className="bg-transparent flex flex-col w-full mt-4 max-w-md z-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <label htmlFor="email" className="text-black font-medium block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 rounded-xl border transition-all duration-200 text-black font-medium border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="text-black font-medium block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 rounded-xl border transition-all duration-200 text-black font-medium border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-black font-medium block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full p-2 rounded-xl border transition-all duration-200 text-black font-medium border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mb-4 py-4 bg-[#0575E6] text-white rounded-full hover:scale-95 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>

        {isError && <p className="text-red-500">{error?.message}</p>} {/* Display error message */}

        <div className="w-full flex items-center justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-28 mb-4 py-2 bg-[#20242D] text-white rounded-lg hover:scale-95 transition duration-200 flex items-center justify-center space-x-2"
          >
            <Image
              src={Images.google}
              alt="google"
              width={4}
              height={4}
              className="w-6"
            />
          </button>
        </div>

        <div className="flex items-center space-x-1 justify-center">
          <p className="text-sm text-black font-light">
            I already have an account!
          </p>
          <p
            className="text-sm font-medium text-[#0000F6] cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Sign In
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;