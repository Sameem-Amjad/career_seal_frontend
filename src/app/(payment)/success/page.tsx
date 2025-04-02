"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";

interface PaymentDetails {
  amount_total: number;
  payment_status: string;
  customer_details: {
    email: string;
  };
}

// Move the main logic to a separate component
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    if (sessionId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/payment/checkout-session/${sessionId}`)
        .then(({ data }) => {
          setPaymentDetails(data.session);
          setLoading(false);

          setTimeout(() => {
            router.push("/app/profile");
          }, 5000);
        })
        .catch((error) => {
          console.error("Error fetching session details:", error);
          setLoading(false);
        });
    }
  }, [sessionId, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      {paymentDetails && (
        <div className="mt-4 p-4 border rounded-lg shadow-md">
          <p><strong>Amount Paid:</strong> ${paymentDetails.amount_total / 100}</p>
          <p><strong>Status:</strong> {paymentDetails.payment_status}</p>
          <p><strong>Email:</strong> {paymentDetails.customer_details.email}</p>
        </div>
      )}
      <p className="mt-4 text-gray-600">Redirecting to profile page...</p>
    </div>
  );
}

// Wrap the content component with Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}