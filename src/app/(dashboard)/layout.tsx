import React from "react";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen grid grid-cols-[3fr_9fr] bg-[#CBD5E166]">
      <Sidebar />
      <div className="relative flex flex-col">
        <Header />
        {children}
      </div>
    </main>
  );
}
