import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Apple, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  preModels: string;
  stripeLink?: string;
}

declare global {
  interface Window {
    rewardful?: (command: string, ...args: any[]) => void;
    _rwq?: any[];
  }
}

export const Pricing = () => {
  const plans: PricingPlan[] = [{
    name: "Solo",
    price: "$149",
    preModels: "75 PreModels/mo",
    description: "Perfect for independent epoxy contractors looking to grow their business.",
    features: ["75 PreModels per month", "Up to 5 sales rep accounts", "HD renders", "Client sharing capabilities", "Email support"],
    cta: "Start closing more deals",
    stripeLink: "https://buy.stripe.com/00gbJuad3f2w7VCbJl"
  }, {
    name: "Team",
    price: "$389",
    preModels: "350 PreModels/mo",
    description: "Ideal for growing epoxy businesses with multiple team members.",
    features: ["350 PreModels per month", "Unlimited sales rep accounts", "HD renders", "Priority customer support", "Plus all Solo features"],
    cta: "Start closing more deals",
    popular: true,
    stripeLink: "https://buy.stripe.com/fZeeVG4SJdYsb7O3cQ"
  }, {
    name: "Growth",
    price: "$699",
    preModels: "1250 PreModels/mo",
    description: "For established epoxy flooring companies with high volume needs.",
    features: ["1250 PreModels per month", "Unlimited sales rep accounts", "HD renders", "Dedicated account manager", "Plus all Team features"],
    cta: "Start closing more deals",
    stripeLink: "https://buy.stripe.com/28ocNydpfdYs4Jq8x8"
  }];
  
  useEffect(() => {
    // Initialize Rewardful when the component loads
    if (window.rewardful) {
      window.rewardful('ready', () => {
        console.log('Rewardful is ready');
      });
    }
  }, []);

  const handleStripePurchase = (stripeLinkWithoutReferral: string | undefined) => {
    if (!stripeLinkWithoutReferral) {
      window.location.href = "mailto:sales@premodel.ai";
      return;
    }

    try {
      // Instead of using non-existent 'checkout' method, use the appropriate way
      // to handle affiliate tracking with Rewardful
      
      // First check if Rewardful is available and ready
      if (window._rwq) {
        // Add affiliate tracking to the URL (this is how Rewardful works)
        console.log("Using Rewardful for tracking");
        
        // Push the conversion event to Rewardful's queue for tracking
        window._rwq.push(['trackVisit']);
      } else {
        console.log("Rewardful not available, proceeding directly");
      }
      
      // Open the Stripe link in a new tab
      window.open(stripeLinkWithoutReferral, "_blank");
      
      toast({
        title: "Opening checkout",
        description: "Taking you to Stripe's secure checkout page",
      });
    } catch (error) {
      console.error("Error processing purchase:", error);
      // Fallback - direct link if there's any error
      window.open(stripeLinkWithoutReferral, "_blank");
    }
  };
  
  return <section id="pricing" className="py-16 md:py-32">
      <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Pricing Plans for Every Epoxy Business</h2>
          <p className="text-muted-foreground text-xl mt-4 max-w-[800px] mx-auto">Download the app and get to making magic.</p>
        </div>

        {/* Free Trial Banner */}
        <div className="mb-12 p-6 md:p-8 bg-primary/10 border border-primary/30 rounded-xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Try PreModel For Free</h3>
          <p className="text-lg mb-4">Download the app now and experience how it can transform your sales process at your next appointment!</p>
          <Button 
            size="lg" 
            onClick={() => window.open("https://apps.apple.com/us/app/premodel-ai/id6744342396", "_blank")} 
            className="text-lg h-auto py-4 px-8"
          >
            <Download className="mr-2 h-5 w-5" />
            Start Free Trial
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => <Card key={plan.name} className={cn("flex flex-col border", plan.popular ? "border-primary/50 shadow-lg shadow-primary/20" : "border-primary/10")}>
              {plan.popular && <div className="bg-primary text-primary-foreground text-sm font-medium py-1 px-4 rounded-b-md mx-auto">
                  Most Popular
                </div>}
              
              <CardHeader className={cn(plan.popular ? "pt-6" : "")}>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {plan.price}<span className="ml-2 text-xl font-medium text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="mt-2 text-base">
                  {plan.preModels}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>)}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-6 pb-8">
                <Button 
                  onClick={() => handleStripePurchase(plan.stripeLink)} 
                  className={cn("w-full py-6 text-lg", 
                    plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        {/* Download button section with free trial messaging */}
        <div className="text-center mt-16 pt-8 border-t border-border/30">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">Not ready to commit? Try PreModel risk-free!</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of PreModel with our free trial. See how it can transform your sales process
            at your very next appointment.
          </p>
          
          <Button size="lg" onClick={() => window.open("https://apps.apple.com/us/app/premodel-ai/id6744342396", "_blank")} className="text-xl px-12 py-8 h-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Apple className="mr-3 h-6 w-6" />
            Download the App & Start Free Trial
          </Button>
        </div>
      </div>
    </section>;
};
