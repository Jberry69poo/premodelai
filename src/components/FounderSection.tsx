
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, UserRound, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const FounderSection = () => {
  return (
    <section id="founder-section" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/5 to-background px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Meet The Founder</h2>
          <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
            The man, the myth, the MockingBird mastermind
          </p>
        </div>
        
        <Card className="bg-card/40 backdrop-blur-sm border-primary/10 overflow-hidden max-w-5xl mx-auto shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="col-span-1 lg:col-span-5 lg:border-r border-border/30">
              <div className="h-full">
                <div className="relative h-full aspect-[3/4] lg:aspect-auto">
                  <img 
                    src="/public/lovable-uploads/941b059e-c694-4231-93e3-139a11c60564.png" 
                    alt="Josh Berry, Founder of MockingBird" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 lg:hidden">
                    <div className="flex items-center gap-2 text-white">
                      <UserRound className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-lg">Josh Berry</span>
                    </div>
                    <p className="text-sm text-white/80">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="col-span-1 lg:col-span-7 p-6 md:p-8">
              <div className="hidden lg:flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <UserRound className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Josh Berry</h3>
                  <p className="text-muted-foreground">Founder & CEO</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4 text-lg">
                <p>
                  Hello, I am by all accounts a big giant ogre who likes farting and drinking tequila sodas 
                  (watching my figure). I am building MockingBird because I am a greedy capitalist pig who wants 
                  sales people to have more tools in their tool belt to close more deals.
                </p>
                
                <p>
                  Obviously being able to show customers their dream outcome during the sales process will 
                  close more deals. If you disagree you're a fucking idiot.
                </p>
                
                <p>
                  I love the beach and I love women who want nothing to do with me.
                </p>
                
                <Separator className="my-6 bg-border/50" />
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Get In Touch</h4>
                    <p>
                      The only way to become a MockingBird user is to text or call my personal cell phone. 
                      If you feel like shooting the shit drop me a line. We can talk about basketball or traveling or 
                      software. I don't really give a shit which one you pick.
                    </p>
                    <p className="mt-3">
                      I look forward to blabbing with you either way. I love you so much.
                    </p>
                    <p className="font-semibold text-xl mt-4">- JB</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Phone className="mr-2 h-5 w-5" />
                      Call: 443-742-2100
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Text: 443-742-2100
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
