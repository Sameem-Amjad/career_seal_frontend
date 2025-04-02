import Images from "@/constants/Images";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Images.login})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-top-right z-0"></div>

      <div className="relative z-10 text-center text-black p-8 sm:p-16">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Oops! The page you&apos;re looking for does not exist.</p>
        <p className="text-lg mb-8">It might have been moved, deleted, or the URL might be incorrect.</p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
}
