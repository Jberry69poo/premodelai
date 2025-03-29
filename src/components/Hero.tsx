
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="py-12 md:py-24 lg:py-32 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Transform Home Improvement Sales with AI Visualizations
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Help your clients visualize the end result before work begins. 
              Show them the future of their home in seconds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-primary text-primary-foreground">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-secondary/60">
              See Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
