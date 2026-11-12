"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { CheckoutDetails, getCheckoutSession } from "@/api/paymentApi";
import { queryClient } from "@/api/QueryClient";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<CheckoutDetails | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setFailed(true);
      return;
    }
    getCheckoutSession(sessionId)
      .then(({ session }) => {
        setDetails(session);
        queryClient.invalidateQueries({ queryKey: ["userDetails"] });
        setTimeout(() => router.push("/app/profile"), 6000);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [sessionId, router]);

  if (loading) return <p className="p-10 text-center text-black">Loading payment details…</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black p-6">
      {failed || !details ? (
        <>
          <h1 className="text-3xl font-bold">We couldn&apos;t find that payment</h1>
          <Link href="/pricing" className="mt-4 text-custom-blue underline">Back to pricing</Link>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <div className="mt-4 p-5 border rounded-lg shadow-md space-y-1 bg-white">
            {details.plan && <p><strong>Plan:</strong> {details.plan}</p>}
            <p><strong>Amount Paid:</strong> ${(details.amount_total / 100).toFixed(2)}</p>
            <p><strong>Status:</strong> {details.payment_status}</p>
            <p><strong>Email:</strong> {details.customer_details.email}</p>
            {details.current_period_end && (
              <p><strong>Renews:</strong> {new Date(details.current_period_end).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            )}
          </div>
          {details.demo && <p className="mt-3 text-sm text-amber-800">Demo checkout: no card was charged.</p>}
          <p className="mt-4 text-gray-600">Taking you to your profile…</p>
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
