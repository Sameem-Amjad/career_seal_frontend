import axiosInterceptor from "@/config/axios";
import { API_BASE_URL } from "@/config/api";

export const startCheckout = async (priceId: string): Promise<{ success: boolean; sessionUrl: string; demo?: boolean }> => {
  const response = await axiosInterceptor.post(`${API_BASE_URL}/api/v1/payment/create-checkout-session`, { priceId });
  return response.data;
};

export const startFreeTrial = async (): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInterceptor.post(`${API_BASE_URL}/api/v1/payment/free-trial/start`);
  return response.data;
};

export interface CheckoutDetails {
  id: string;
  demo?: boolean;
  plan?: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  customer_details: { email: string };
  current_period_end?: string;
}

export const getCheckoutSession = async (sessionId: string): Promise<{ success: boolean; session: CheckoutDetails }> => {
  const response = await axiosInterceptor.get(`${API_BASE_URL}/api/v1/payment/checkout-session/${encodeURIComponent(sessionId)}`);
  return response.data;
};
