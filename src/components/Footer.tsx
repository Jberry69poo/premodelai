
import { Home } from "lucide-react";
import { PreModelLogo } from "./PreModelLogo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-2">
          <PreModelLogo size="sm" showText={false} />
          <span className="text-sm font-medium">
            PreModel © {currentYear}
          </span>
        </div>
        
        <div className="text-sm text-muted-foreground text-center my-2 md:my-0">
          AI-powered home improvement visualizations
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
