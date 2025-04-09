import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "./store";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "@/providers/reactQueryProvider";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
});

export const metadata: Metadata = {
  title: "SchoolAccreditation System",
  description: "Portal for school accreditation management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return ( 
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <NuqsAdapter>
          <ReactQueryProvider>
            <main className="flex-1">
              <StoreProvider>
                {children}
              </StoreProvider>
            </main>
          </ReactQueryProvider>
        </NuqsAdapter>
        <Footer />
        <Toaster/>
      </body>
    </html>
  );
}
