import { NavBar } from "@/components/navigation/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1">
      <NavBar />
      {children}
    </main>
  );
}
