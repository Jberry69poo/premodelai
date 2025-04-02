import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, ArrowRight, Twitter, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export const FounderSection = () => {
  return <section id="founder-section" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/5 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Meet The Idiot Founder</h2>
          
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="rounded-xl overflow-hidden border-4 border-primary/20 shadow-lg shadow-primary/10 mb-6 w-48 h-48 md:w-56 md:h-56">
              <img alt="Josh Berry, Founder of MockingBird" className="w-full h-full object-cover" src="/lovable-uploads/4be4c66e-951a-40ac-aca3-d9bee552ec6a.jpg" />
            </div>
            
            <div className="text-center mt-2">
              <h3 className="text-2xl font-bold">Josh Berry</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            
            <div className="flex gap-4 mt-4">
              
              
            </div>
            
            <Card className="w-full mt-6 bg-card/40 backdrop-blur-sm border-primary/10">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold text-lg mb-2">Get In Touch</h4>
                <div className="space-y-3">
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Phone className="mr-2 h-4 w-4" />
                    Call: 443-742-2100
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Text: 443-742-2100
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-8">
            <Card className="bg-card/40 backdrop-blur-sm border-primary/10 overflow-hidden shadow-lg">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  <p className="text-lg">Hello, My name is Josh. I am by all accounts a big giant ogre who likes farting and drinking tequila sodas (watching my figure). I am building MockingBird because I am a greedy capitalist pig who wants to help sales people close more deals.</p>
                  
                  <p className="text-lg">
                    Obviously being able to show customers their dream outcome during the sales process will 
                    close more deals. If you disagree you're a fucking idiot.
                  </p>
                </div>
                
                <Separator className="my-4 bg-border/50" />
                
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    
                    
                  </div>
                  
                  <div className="flex items-start gap-2">
                    
                    <p>
                      If you feel like shooting the shit drop me a line. We can talk about basketball or traveling or 
                      software. I don't really give a shit which one you pick.
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4 bg-border/50" />
                
                <div>
                  <p className="italic text-2xl">
                    "The only way to become a MockingBird user is to text or call my personal cell phone. 
                    I look forward to blabbing with you either way. I love you so much."
                  </p>
                  <p className="font-bold text-xl mt-4">- JB</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};