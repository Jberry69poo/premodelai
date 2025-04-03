
import { Twitter, Github } from "lucide-react";
import { MockingBirdIcon } from "./MockingBirdIcon";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-2">
          <MockingBirdIcon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            MockingBird AI © {currentYear}
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
            <Twitter className="h-5 w-5" />
          </a>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
