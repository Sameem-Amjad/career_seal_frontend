// NavbarWrapper.tsx
"use client"
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  const shouldHideNavbar = pathname === '/login' || pathname === '/signup' || pathname.includes("/verify");

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
    </>
  );
}
