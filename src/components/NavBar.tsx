
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenLine, Map, Home } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Map className="h-6 w-6 text-travel-teal" />
          <span className="text-xl font-semibold text-travel-navy">Travel Chronicles</span>
        </Link>
        
        <nav className="flex items-center space-x-1 sm:space-x-4">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
            asChild
            className="flex items-center"
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive("/create") ? "default" : "ghost"}
            size="sm"
            asChild
            className="flex items-center"
          >
            <Link to="/create">
              <PenLine className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Post</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
