
import { Button } from "@/components/ui/button";
import { MockingBirdLogo } from "@/components/MockingBirdLogo";
import { ArrowRight, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToSignup = () => {
    document.getElementById("beta-signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-12 md:py-24 lg:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Logo */}
          <div className="mb-6 lg:mb-10">
            <MockingBirdLogo size="xl" />
          </div>
          
          {/* Main content */}
          <div className="max-w-4xl space-y-6 lg:space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Show Clients Their <span className="text-primary">Finished Home</span> in Minutes, Not Weeks
            </h1>
            
            <p className="mx-auto text-xl text-muted-foreground lg:mx-0 lg:text-2xl">
              Turn "I can't picture it" into "That's exactly what I want!" with photorealistic AI visualizations
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Results in minutes</span>
              </div>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-border"></div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Close more deals</span>
              </div>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-border"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Stunning results</span>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground text-lg"
                onClick={scrollToSignup}
              >
                Join Free Beta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg"
                onClick={() => document.querySelector('.examples-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Examples
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="mx-auto pt-6 lg:mx-0">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Used by</span> home improvement professionals across North America
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
