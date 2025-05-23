"use client";
import Header from "@/components/inspection-plan/_components/Header";
import Sidebar from "@/components/inspection-plan/_components/Sidebar";
import React, { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <main className="flex overflow-hidden h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 overflow-y-scroll">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="overflow-y-scroll">
          {children}
        </div>
      </div>
    </main>
  );
}
