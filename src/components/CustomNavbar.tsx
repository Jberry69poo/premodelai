
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PreModelLogo } from "@/components/PreModelLogo";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";

export const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { label: "How It Works", id: "how-it-works" },
    { label: "Examples", id: "examples" },
    { label: "Benefits", id: "benefits" },
    { label: "Pricing", id: "pricing" }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <PreModelLogo showText={true} size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Button
                variant="default"
                size="sm"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button
                onClick={() => window.location.href = "mailto:sales@premodel.ai"}
                variant="default"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Contact Sales
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 mt-2 space-y-4 border-t border-border/50">
            {navLinks.map((link) => (
              <div key={link.id} className="py-2">
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-foreground/80 hover:text-primary transition-colors w-full text-left"
                >
                  {link.label}
                </button>
              </div>
            ))}
            <div className="pt-4 border-t border-border/50">
              {user ? (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="w-full"
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.href = "mailto:sales@premodel.ai"}
                  variant="default"
                  size="sm"
                  className="w-full"
                >
                  Contact Sales
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
