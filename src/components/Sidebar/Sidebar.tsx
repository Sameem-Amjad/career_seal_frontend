"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <p className="text-lg text-black font-semibold">Menu</p>
          <button
            className="text-black focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col space-y-4 mt-4 px-4">
          <li>
            <Link href="/" className="text-black font-medium" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="text-black font-medium" onClick={toggleSidebar}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/upload-resume" className="text-black font-medium" onClick={toggleSidebar}>
              Jobs
            </Link>
          </li>
          <li>
            <Link href="/terms" className="text-black font-medium" onClick={toggleSidebar}>
              Terms
            </Link>
          </li>
          <li>
            <Link href="/upload-resume" className="text-black font-medium" onClick={toggleSidebar}>
              Contact
            </Link>
          </li>
          <li>
            <p
              className="text-black font-medium cursor-pointer"
              onClick={() => {
                router.push("/login");
                toggleSidebar();
              }}
            >
              Login
            </p>
          </li>
          <li>
            <button
              className="w-full py-2 text-white bg-custom-blue rounded-lg"
              onClick={toggleSidebar}
            >
              Free Trial
            </button>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
