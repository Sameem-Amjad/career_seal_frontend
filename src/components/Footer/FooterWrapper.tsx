"use client"
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();

  const shouldHideFooter = pathname === '/login' || pathname === '/signup' || pathname.includes("/verify");

  return (
    <>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
