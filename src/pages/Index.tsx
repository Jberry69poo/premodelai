
import { CustomNavbar } from "@/components/CustomNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfterExamples } from "@/components/BeforeAfterExamples";
import { ArrowRight, PaintBucket, Layers, CheckSquare, Smartphone, Clock } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PreModelLogo } from "@/components/PreModelLogo";
import { Pricing } from "@/components/Pricing";
import { WhatIsPreModel } from "@/components/WhatIsPreModel";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  
  return <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <CustomNavbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Moved Examples right after Hero */}
        <section id="examples" className="py-16 md:py-24">
          <div className="container max-w-[1400px] mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Turn Photos Into Instant Sales Tools</h2>
              <p className="text-muted-foreground text-xl mt-4 max-w-[900px] mx-auto">
                Snap a photo, select a finish, and instantly get realistic visualizations that help customers see 
                the transformation and make decisions on the spot.
              </p>
            </div>
            
            <BeforeAfterExamples />
          </div>
        </section>
        
        <WhatIsPreModel />

        <section id="how-it-works" className="py-16 md:py-32 bg-card/30">
          <div className="container max-w-[1400px] mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center justify-center flex-wrap">
                <span>How</span> 
                <span className="mx-3 inline-flex items-center"><PreModelLogo size="md" showText={false} /></span> 
                <span>Works in Your Pocket</span>
              </h2>
              <p className="text-muted-foreground text-xl mt-4 max-w-[800px] mx-auto">
                Transform your epoxy flooring business with our simple mobile app that delivers results in under 2 minutes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mt-10 md:mt-16">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-6 md:p-8 rounded-full mb-5 md:mb-6">
                  <Smartphone className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">1. Snap & Upload</h3>
                <p className="text-muted-foreground text-lg">
                  Open the PreModel mobile app and take a photo of your client's concrete floor, or upload an existing image. Works for garages, basements, showrooms, and commercial spaces.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-12 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-6 md:p-8 rounded-full mb-5 md:mb-6">
                  <Layers className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">2. Select & Prompt</h3>
                <p className="text-muted-foreground text-lg">Write a custom prompt describing the exact look you want or upload a color sample photo. After this, PreModel gets to work.</p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-12 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-6 md:p-8 rounded-full mb-5 md:mb-6">
                  <Clock className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">3. Get Results in 2 Minutes</h3>
                <p className="text-muted-foreground text-lg">Show clients a photorealistic preview of their new epoxy floors in less than 2 minutes. When customers can visualize the results instantly, closing rates increase dramatically.</p>
              </div>
            </div>
            
            <div className="mt-12 md:mt-20 text-center">
              <Button onClick={() => window.location.href = "mailto:sales@premodel.ai"} className="bg-primary text-primary-foreground text-lg px-8 py-6 rounded-md">
                Download App Today
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 md:py-32 bg-card/30">
          <div className="container max-w-[1400px] mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Why Epoxy Contractors Choose PreModel</h2>
              <p className="text-muted-foreground text-xl mt-4 max-w-[800px] mx-auto">
                The competitive advantage that sets successful epoxy flooring companies apart
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background/80 p-8 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <CheckSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Higher Close Rates</h3>
                <p className="text-muted-foreground">Convert more consultations to signed contracts when clients can visualize their finished epoxy floors.</p>
              </div>
              
              <div className="bg-background/80 p-8 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Upsell Premium Finishes</h3>
                <p className="text-muted-foreground">Easily demonstrate the value of higher-end epoxy systems and decorative options with realistic visualizations.</p>
              </div>
              
              <div className="bg-background/80 p-8 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <PaintBucket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Eliminate Design Confusion</h3>
                <p className="text-muted-foreground">Reduce miscommunications by showing exactly how different epoxy colors and patterns will look in the actual space.</p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button onClick={() => window.location.href = "mailto:sales@premodel.ai"} className="bg-primary text-primary-foreground text-lg px-8 py-6 rounded-md">
                Schedule a Demo
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        <Pricing />
      </main>
      
      <Footer />
    </div>;
};

export default Index;
