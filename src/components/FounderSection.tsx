
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const FounderSection = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-t from-background to-secondary/10 px-4">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-full md:w-2/5">
              <div className="rounded-lg overflow-hidden border-4 border-primary shadow-xl">
                <img 
                  src="/public/lovable-uploads/941b059e-c694-4231-93e3-139a11c60564.png" 
                  alt="Josh Berry, Founder of MockingBird" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-3/5 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Meet the Founder</h2>
              
              <p className="text-lg md:text-xl">
                Hello, I am by all accounts a big giant ogre who likes farting and drinking tequila sodas 
                (watching my figure). I am building MockingBird because I am a greedy capitalist pig who wants 
                sales people to have more tools in their tool belt to close more deals.
              </p>
              
              <p className="text-lg md:text-xl">
                Obviously being able to show customers their dream outcome during the sales process will 
                close more deals. If you disagree you're a fucking idiot.
              </p>
              
              <p className="text-lg md:text-xl">
                I love the beach and I love women who want nothing to do with me.
              </p>
              
              <p className="text-lg md:text-xl">
                The only way to become a MockingBird user is to text or call my personal cell phone (443-742-2100). 
                If you feel like shooting the shit drop me a line. We can talk about basketball or traveling or 
                software. I don't really give a shit which one you pick.
              </p>
              
              <p className="text-lg md:text-xl">
                I look forward to blabbing with you either way. I love you so much.
              </p>
              
              <p className="text-lg md:text-xl font-semibold mt-4">- JB</p>
              
              <div className="pt-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Phone className="mr-2 h-5 w-5" />
                  Call JB: 443-742-2100
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
