import axiosInterceptor from "@/config/axios";
import {
  LoginResponse,
  signupResponse,
  updatePasswordResponse,
  UserDetailsResponse,
  UserUpdateResponse,
  verifyResponse,
} from "@/types/Interfaces/auth";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://careerseal-server.onrender.com";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user/login`,
    credentials
  );
  return response.data;
};

export const register = async (data: {
  email: string;
  password: string;
}): Promise<signupResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user`,
    data
  );
  return response.data;
};

export const fetchCurrentUser = async (): Promise<
  UserDetailsResponse | undefined
> => {
  try {
    const response = await axiosInterceptor.get(
      `${API_BASE_URL}/api/v1/user/me`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("verified");
      console.log(err.response.status);
    }

    return undefined;
  }
};

export const verifyEmail = async (data: {
  email: string;
  code: string;
}): Promise<verifyResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user/verify-email`,
    data
  );
  return response.data;
};

export const updatUserDetails = async (data: {
  username?: string;
  image?: string;
}): Promise<UserUpdateResponse> => {
  const response = await axiosInterceptor.put(
    `${API_BASE_URL}/api/v1/user/me`,
    data
  );
  return response.data;
};

export const updatPassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<updatePasswordResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user/update-password`,
    data
  );
  return response.data;
};

export const forgotPassword = async (data: {
  email: string;
}): Promise<updatePasswordResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user/forgot-password`,
    data
  );
  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}): Promise<updatePasswordResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user/reset-password`,
    data
  );
  return response.data;
};

export const resendEmail = async (): Promise<updatePasswordResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user/resend-email`
  );
  return response.data;
};

export const sendContactFormMessage = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<updatePasswordResponse> => {
  const response = await axiosInterceptor.post(
    `${API_BASE_URL}/api/v1/user/contact-us`,
    data
  );
  return response.data;
};
