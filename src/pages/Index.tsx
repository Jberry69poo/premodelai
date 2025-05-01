
import { CustomNavbar } from "@/components/CustomNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfterExamples } from "@/components/BeforeAfterExamples";
import { ArrowRight, PaintBucket, Layers, CheckSquare, Smartphone, Clock } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PreModelLogo } from "@/components/PreModelLogo";
import { Pricing } from "@/components/Pricing";
import { VideoSection } from "@/components/VideoSection";

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
        
        {/* Video Section - How PreModel Works */}
        <VideoSection />
        
        {/* Examples Section */}
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
        
        <Pricing />
      </main>
      
      <Footer />
    </div>;
};

export default Index;
