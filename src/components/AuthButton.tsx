import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";
export function AuthButton() {
  const {
    user,
    signIn,
    signUp,
    signOut
  } = useAuth();
  const {
    toast
  } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        const {
          error
        } = await signUp(email, password);
        if (error) throw error;
        toast({
          title: "Account created",
          description: "Check your email for the confirmation link."
        });
      } else {
        const {
          error
        } = await signIn(email, password);
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in."
        });
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: isSignUp ? "Sign up failed" : "Sign in failed",
        description: error instanceof Error ? error.message : "An error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out."
    });
  };
  if (user) {
    return <div className="flex items-center gap-2">
        <span className="text-sm hidden md:inline-block">
          {user.email}
        </span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>;
  }
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isSignUp ? "Create an account" : "Sign in"}</SheetTitle>
          <SheetDescription>
            {isSignUp ? "Enter your details to create a new account" : "Enter your credentials to sign in to your account"}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <span className="flex items-center">
                <LogIn className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating account..." : "Signing in..."}
              </span> : <span className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                {isSignUp ? "Create account" : "Sign in"}
              </span>}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button type="button" className="text-sm text-primary hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </SheetContent>
    </Sheet>;
}