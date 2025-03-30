
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/AuthButton";
import { Link } from "react-router-dom";
import { MockingBirdLogo } from "@/components/MockingBirdLogo";

export function CustomNavbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <MockingBirdLogo size="sm" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/">How it Works</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">Examples</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">Pricing</Link>
          </Button>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
