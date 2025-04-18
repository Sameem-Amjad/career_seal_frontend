"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Image from "next/image";
import Images from "@/constants/Images";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import Navigator from "./Navigator";
import useLogout from "@/hooks/auth/useLogout";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import { getToken } from "@/config/toke";
import { RiLoginCircleLine } from "react-icons/ri";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const { data } = useGetUserDetails(getToken() || "");
  const { logout } = useLogout();

  useEffect(() => {
    const checkLoggedIn = () => {
      if (data?.user) {
        setLoggedIn(true);
      }
    };
    checkLoggedIn();
  }, [data]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  console.log("full user profile data is : ", data);

  return (
    <>
      <nav className="fixed top-0 w-full bg-transparent backdrop-blur-md p-4 lg:px-24 font-poppins border-b-2 border-opacity-25 border-custom-blue z-50">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="lg:hidden flex items-center">
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
                  d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="font-semibold ml-4 flex-1 text-black text-xl">
            <Image
              priority
              src={Images.logo}
              alt="logo"
              width={50}
              height={25}
              className="object-contain w-36 cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
          <Navigator />

          <div className="flex flex-1 items-center justify-end space-x-2">
            {loggedIn ? (
              <>
                <p className="text-sm font-semibold text-black">
                  {data?.user.username}
                </p>
                <div className="relative">
                  <Image
                    src={data?.user.image || Images.avatarcover}
                    alt="avatar"
                    width={16}
                    height={16}
                    onClick={togglePopup}
                    className="w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-95 transition duration-200"
                  />
                  {isPopupOpen && (
                    <div
                      className="absolute right-0 mt-2 text-sm w-56 text-black bg-white border rounded-lg shadow-lg z-50"
                      onMouseLeave={closePopup}
                    >
                      <ul className="py-2">
                        <li
                          className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                          onClick={() => router.push("/app/profile")}
                        >
                          <IoPersonOutline />{" "}
                          <span className="ml-2">Profile</span>
                        </li>
                        <li
                          className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                          onClick={() => router.push("/app/saved")}
                        >
                          <MdOutlineBookmarkBorder />{" "}
                          <span className="ml-2">Saved</span>
                        </li>
                        <li
                          className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                          onClick={() => router.push("/app/history")}
                        >
                          <IoBriefcaseOutline />{" "}
                          <span className="ml-2">Application history</span>
                        </li>
                        <li
                          className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                          onClick={() => logout()}
                        >
                          <TbLogout /> <span className="ml-2">Logout</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <p
                  className="text-sm px-4 font-medium flex items-center group gap-2 text-black cursor-pointer hover:underline"
                  onClick={() => router.push("/login")}
                >
                  Login{" "}
                  <RiLoginCircleLine
                    className=" text-custom-blue group-hover:scale-125 duration-300"
                    size={24}
                  />
                </p>
                <button
                  onClick={() => {
                    router.push("/pricing");
                  }}
                  className="p-2 w-24 text-sm rounded-lg text-white bg-custom-blue"
                >
                  Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
