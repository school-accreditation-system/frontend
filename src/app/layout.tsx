import { AuthProvider } from "@/components/auth/AuthContext.tsx";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./store";

import { SchoolProvider } from "@/components/auth/SchoolContext.tsx";
import ReactQueryProvider from "@/providers/reactQueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import GlobalSchoolDialog from "@/components/school-finder/GlobalSchoolDialog.tsx";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
});

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
          <AuthProvider>
            <SchoolProvider>
              <ReactQueryProvider>
                <main className="flex-1">
                  <StoreProvider>
                    {children}
                  </StoreProvider>
                  {/* <GlobalSchoolDialog /> */}
                </main>
              </ReactQueryProvider>
            </SchoolProvider>
          </AuthProvider>
        </NuqsAdapter>
        {/* <Footer /> */}
        <Toaster />
      </body>
    </html>
  );
}
