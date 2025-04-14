import Header from "@/components/inspector-dashboard/_components/Header";
import Sidebar from "@/components/inspector-dashboard/_components/Sidebar";
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
