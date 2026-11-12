// RootLayout.tsx
import "./globals.css";
import { ReactNode } from 'react'; 
import { Metadata } from "next";
import AppQueryClientProvider from "@/context/QueryClientProvider";
import DemoBanner from "@/components/DemoBanner";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Career Seal",
  description: "Upload your resume and find visa-sponsored jobs in the UK, US and UAE.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AppQueryClientProvider>
          <main className="min-h-screen">{children}</main>
          <DemoBanner />
        </AppQueryClientProvider>
      </body>
    </html>
  );
}
