
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/AuthButton";
import { Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

export function CustomNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <Wand2 className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">MockingBird</span>
          </Link>
        </div>

        <div className="flex items-center">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
