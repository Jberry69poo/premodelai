
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, ArrowRight, Award, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const FounderSection = () => {
  const handlePhoneCall = () => {
    window.location.href = "tel:443-742-2100";
  };
  const handleTextMessage = () => {
    window.location.href = "sms:443-742-2100";
  };
  const stats = [{
    label: "Loyalty",
    value: "100%",
    description: "To PreModel users"
  }, {
    label: "Free Throw %",
    value: "91%",
    description: "Better than Shaq"
  }, {
    label: "User Satisfaction",
    value: "99%",
    description: "From beta users"
  }, {
    label: "Chance",
    value: "0%",
    description: "You don't want to try"
  }];
  return <section id="founder-section" className="py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-[20%] w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-[30%] w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Meet Our Founder
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse-subtle"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-background shadow-lg shadow-primary/20 w-64 h-64 md:w-80 md:h-80">
                <img alt="Josh Berry, Founder of PreModel" className="w-full h-full object-cover transition duration-300 group-hover:scale-105" src="/lovable-uploads/4be4c66e-951a-40ac-aca3-d9bee552ec6a.jpg" />
              </div>
            </div>
            
            <div className="text-center mt-2 mb-6">
              <h3 className="text-3xl font-bold">Josh Berry</h3>
              <p className="text-xl text-muted-foreground mt-1">Founder & CEO</p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mt-4 mb-8">
              {stats.map((stat, index) => <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden hover:shadow-md hover:-translate-y-1">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm font-medium">{stat.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </CardContent>
                </Card>)}
            </div>
            
            <Card className="w-full bg-card/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Star className="w-3.5 h-3.5 mr-1" />
                    <span>Direct Line</span>
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 h-auto" onClick={handlePhoneCall}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call: 443-742-2100
                  </Button>
                  <Button size="lg" variant="outline" className="w-full border-primary/30 hover:bg-primary/10 text-lg py-6 h-auto" onClick={handleTextMessage}>
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Text: 443-742-2100
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-7">
            <Card className="bg-card/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-lg h-full">
              <CardContent className="p-8 md:p-10 space-y-8 flex flex-col h-full">
                <div className="space-y-6 flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-1 w-16 bg-primary rounded-full"></div>
                    <Badge variant="outline" className="px-3 py-1.5 text-sm">
                      <Award className="w-4 h-4 mr-1.5 text-primary" />
                      Certified Ogre
                    </Badge>
                  </div>
                  
                  <p className="text-xl md:text-2xl font-medium leading-relaxed">
                    Hello, My name is Josh. I am by all accounts a big giant ogre who likes farting and drinking tequila 
                    sodas (watching my figure). I am building PreModel because I am a greedy capitalist pig who wants to 
                    help sales people close more deals.
                  </p>
                  
                  <p className="text-xl md:text-2xl font-medium leading-relaxed">
                    Obviously being able to show customers their dream outcome during the sales process will 
                    close more deals. If you disagree you're a fucking idiot.
                  </p>
                </div>
                
                <Separator className="my-6 bg-border/50" />
                
                <div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                    <p className="text-2xl md:text-3xl">
                      The only way to become a PreModel user is to text or call my personal cell phone. There is no sales 
                      funnel or any of that bullshit. Give me a call and lets talk about Lamar Jackson or software. 
                      I don't give a shit either way honestly. I love you so much.
                    </p>
                    <div className="flex items-center mt-6 gap-4">
                      
                      <div>
                        <p className="font-bold text-2xl">- JB</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
