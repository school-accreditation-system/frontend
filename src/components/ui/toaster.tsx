'use client';

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      toastOptions={{
        style: {
          background: "white",
          border: "1px solid hsl(var(--border))",
          borderRadius: "6px",
          color: "hsl(var(--foreground))"
        },
        className: "shadow-md",
      }}
    />
  );
} 