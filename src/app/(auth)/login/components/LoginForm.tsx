"use client";
import useLogin from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { data, isLoading, isError, error, refetch } = useLogin(formData);

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
    if (data?.token && ! isLoading) {
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('verified', data.user.isVerified.toString());
      router.push("/app/upload-resume");

    } else {
      console.log("Token is missing in the login response.");
    }
  },[data, router, isLoading])



  return (
    <div className="w-96 font-poppins p-2">
      <div className="flex text-black flex-col space-y-2 w-full">
        <p className="text-2xl font-semibold">Log in to your account</p>
        <p className="font-normal">Welcome back! Please enter your details.</p>
      </div>
      <form
        className="bg-transparent w-full mt-4 max-w-md z-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="email" className="text-black font-medium block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 rounded-xl transition-all duration-200 border text-black font-medium border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
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
            className="w-full p-2 rounded-xl border transition-all duration-200 font-medium text-black border-gray-400 bg-gray-100 placeholder:text-sm placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-gray-600"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex w-full flex-row-reverse mb-4">
          <p
            onClick={() => router.push("/forgot-password")}
           className="text-sm font-medium cursor-pointer hover:underline text-[#0000F6]">Forgot password?</p>
        </div>
        <button
          type="submit"
          className="w-full mb-4 py-4 bg-[#0575E6] text-white rounded-full hover:scale-95 transition duration-200"
          disabled={isLoading} 
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        {isError && <p className="text-red-500">{error?.message}</p>}
        <div className="flex items-center space-x-1 justify-center">
          <p className="text-sm font-light text-black">Don’t have an account?</p>
          <p className="text-sm font-medium text-custom-blue cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >Sign up</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;