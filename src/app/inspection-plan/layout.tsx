import Header from "@/components/inspection-plan/_components/Header";
import Sidebar from "@/components/inspection-plan/_components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex overflow-hidden h-screen">
        <Sidebar />
      <div className="w-full overflow-y-scroll">
        <Header />
        <div className="overflow-y-scroll">

        {children}
        </div>
        </div>
    </main>
  );
}
