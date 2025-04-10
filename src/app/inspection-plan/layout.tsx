import Header from "@/components/inspection-plan/_components/Header";
import Sidebar from "@/components/inspection-plan/_components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex ">
        <Sidebar />
      <div className="w-full">
        <Header />
        {children}
        </div>
    </main>
  );
}
