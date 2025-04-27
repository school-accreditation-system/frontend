import Header from "@/components/inspection-plan/_components/Header";
import Sidebar from "@/components/inspector-dashboard/_components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex max-h-screen overflow-hidden">
        <Sidebar />
      <div className="w-full overflow-y-scroll">
        <Header />
        {children}
        </div>
    </main>
  );
}
