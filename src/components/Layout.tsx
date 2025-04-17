import React from "react";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import Background from "@/components/Background";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <NavBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;