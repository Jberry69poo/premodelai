
import { Button } from "@/components/ui/button";
import { Menu, Bird, Home, Settings, LogIn, BarChart3 } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 font-bold">
          <Bird className="h-6 w-6 text-primary" />
          <span className="text-xl">MockingBird</span>
        </div>
        
        <nav className="ml-auto hidden md:flex items-center gap-6">
          <Button variant="ghost" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
          <Button className="flex items-center gap-2 bg-primary text-primary-foreground">
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </nav>
        
        <Button 
          variant="ghost" 
          className="ml-auto md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="flex items-center justify-start gap-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <Button variant="ghost" className="flex items-center justify-start gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            <Button variant="ghost" className="flex items-center justify-start gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
            <Button className="flex items-center justify-start gap-2 bg-primary text-primary-foreground">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
