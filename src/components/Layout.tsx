
import React from "react";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <footer className="py-6 bg-travel-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Travel Chronicles. Share your adventures.</p>
        </div>
      </footer>
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
