"use client";

import { NavBar } from "@/components/navigation/NavBar";
import { ReactNode } from "react";

export default function ApplyForLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-gray-50 relative h-screen">
      <NavBar />
      {children}
    </div>
  );
}
