
import { Button } from "@/components/ui/button";
import { ArrowRight, PaintBucket, Clock, Zap } from "lucide-react";

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
      
      <div className="container px-4 md:px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <PaintBucket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Realistic Visualizations</h3>
            <p className="text-muted-foreground">
              Show customers exactly how new roofing, siding, paint, or landscaping will look with photorealistic images.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Save Time</h3>
            <p className="text-muted-foreground">
              Generate visualizations in seconds instead of hours of manual design work or expensive rendering software.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Close More Deals</h3>
            <p className="text-muted-foreground">
              Help clients overcome uncertainty and make confident decisions by showing them the finished result upfront.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
