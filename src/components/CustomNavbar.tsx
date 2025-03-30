
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/AuthButton";
import { Link } from "react-router-dom";
import { MockingBirdLogo } from "@/components/MockingBirdLogo";

export function CustomNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <MockingBirdLogo />
          </Link>
        </div>

        <div className="flex items-center">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
