import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Apple } from "lucide-react";
import { cn } from "@/lib/utils";

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

export const Pricing = () => {
  const plans: PricingPlan[] = [{
    name: "Solo",
    price: "$89",
    preModels: "50 Renders/mo",
    description: "Perfect for independent epoxy contractors looking to grow their business.",
    features: ["50 Renders per month", "Unlimited user logins", "Standard image resolution", "Client sharing capabilities", "Email support"],
    cta: "Get Started",
    stripeLink: "https://buy.stripe.com/7sI28U5WNcUo7VC9B9"
  }, {
    name: "Team",
    price: "$329",
    preModels: "350 Renders/mo",
    description: "Ideal for growing epoxy businesses with multiple team members.",
    features: ["350 Renders per month", "Unlimited sales rep accounts", "High-resolution images", "Priority customer support"],
    cta: "Get Started",
    popular: true,
    stripeLink: "https://buy.stripe.com/6oE3cYbh7f2w1xe6oY"
  }, {
    name: "Growth",
    price: "$699",
    preModels: "1250 Renders/mo",
    description: "For established epoxy flooring companies with high volume needs.",
    features: ["1250 Renders per month", "Unlimited user accounts", "Maximum resolution images", "Dedicated account manager"],
    cta: "Get Started",
    stripeLink: "https://buy.stripe.com/fZe6paetj6w07VCcNn"
  }];
  
  return <section id="pricing" className="py-16 md:py-32">
      <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Pricing Plans for Every Epoxy Business</h2>
          <p className="text-muted-foreground text-xl mt-4 max-w-[800px] mx-auto">Download the app, enter your company code (You will receive minutes after purchasing) and get to making magic.</p>
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
                <Button onClick={() => {
              if (plan.stripeLink) {
                window.open(plan.stripeLink, "_blank");
              } else {
                window.location.href = "mailto:sales@premodel.ai";
              }
            }} className={cn("w-full py-6 text-lg", plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")}>
                  {plan.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        {/* Download button section */}
        <div className="text-center mt-16 pt-8 border-t border-border/30">
          <Button size="lg" onClick={() => window.open("https://apps.apple.com/us/app/premodel-ai/id6744342396", "_blank")} className="text-xl px-12 py-8 h-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Apple className="mr-3 h-6 w-6" />
            Download the App to Onboard Your Team
          </Button>
          
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              
              
            </div>
            
          </div>
        </div>
      </div>
    </section>;
};
