
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/AuthButton";
import { Link } from "react-router-dom";
import { MockingBirdLogo } from "@/components/MockingBirdLogo";
import { Menu, X } from "lucide-react";

export function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <MockingBirdLogo size="sm" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <a href="#how-it-works">How it Works</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#examples">Examples</a>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">Pricing</Link>
          </Button>
          <AuthButton />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b border-border/20 shadow-md">
          <nav className="flex flex-col space-y-3">
            <Button variant="ghost" className="justify-start" asChild>
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How it Works</a>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <a href="#examples" onClick={() => setIsMenuOpen(false)}>Examples</a>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            </Button>
            <div className="pt-2">
              <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
