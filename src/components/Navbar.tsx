
import { Button } from "@/components/ui/button";
import { Menu, Home, Settings, LogIn, BarChart3, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreModelLogo } from "./PreModelLogo";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2 font-bold">
          <PreModelLogo size="sm" showText={false} />
          <span className="text-xl">PreModel</span>
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
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container pb-4 md:hidden overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
