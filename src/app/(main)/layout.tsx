"use client"
import { getToken } from "@/config/toke";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import FooterWrapper from "@/components/Footer/FooterWrapper";

export default function DashboardLayout({ children }: {children: ReactNode}) {
  const pathname = usePathname();
  const token = getToken()
  const {data , refetch } = useGetUserDetails(token || "")

  useEffect(()=>{
    const refetchWrapper = async () =>{
      if(token && !data){
        await refetch()  
      }
    }

    refetchWrapper();
    
  },[data, token, refetch, pathname])


  useEffect(()=>{
    if(data){
        Cookies.set('verified',data.user.isVerified.toString());
    }
    
  },[data])



    return (
        <>
        <NavbarWrapper />
          {children}
        <FooterWrapper />
        </>
    );
  }
  