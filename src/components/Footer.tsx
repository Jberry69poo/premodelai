
import { Bird, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-2">
          <Bird className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            MockingBird AI © {new Date().getFullYear()}
          </span>
        </div>
        
        <div className="text-sm text-muted-foreground">
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
