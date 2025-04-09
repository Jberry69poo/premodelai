
import { CustomNavbar } from "@/components/CustomNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfterExamples } from "@/components/BeforeAfterExamples";
import { ArrowRight, CameraIcon, MessageSquareText, ImageIcon } from "lucide-react";
import { Hero } from "@/components/Hero";
import { FounderSection } from "@/components/FounderSection";
import { useEffect } from "react";
import { PreModelLogo } from "@/components/PreModelLogo";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  
  // Add "Meet Josh" link to the navigation
  useEffect(() => {
    const addMeetJoshLink = () => {
      const navbarLinks = document.querySelector('.navbar-links');
      if (navbarLinks) {
        // Check if the link already exists
        if (!document.querySelector('[data-nav-link="meet-josh"]')) {
          const meetJoshLink = document.createElement('li');
          meetJoshLink.innerHTML = '<a href="#founder-section" class="text-sm font-medium transition-colors hover:text-primary" data-nav-link="meet-josh">Meet Josh</a>';
          meetJoshLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('founder-section');
          });
          navbarLinks.appendChild(meetJoshLink);
        }
      }
    };
    
    // Add the link on load and after any dynamic navbar changes
    addMeetJoshLink();
    
    // Set up an observer to detect when the navbar might be loaded/modified
    const observer = new MutationObserver(() => {
      addMeetJoshLink();
    });
    
    const navbar = document.querySelector('nav');
    if (navbar) {
      observer.observe(navbar, { childList: true, subtree: true });
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <CustomNavbar />
      
      <main className="flex-1">
        <Hero />

        <section id="how-it-works" className="py-16 md:py-32 bg-card/30">
          <div className="container max-w-[1400px] mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center justify-center">
                How <span className="mx-3"><PreModelLogo size="md" showText={false} /></span> Works
              </h2>
              <p className="text-muted-foreground text-xl mt-4 max-w-[800px] mx-auto">
                From photo to visualization in minutes, not weeks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mt-10 md:mt-16">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-6 md:p-8 rounded-full mb-5 md:mb-6">
                  <CameraIcon className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">1. Snap a Photo</h3>
                <p className="text-muted-foreground text-lg">
                  Take a picture or upload an existing photo of the space you want to renovate. 
                  Works with kitchens, bathrooms, exteriors, landscaping, and more.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-12 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-6 md:p-8 rounded-full mb-5 md:mb-6">
                  <MessageSquareText className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">2. Describe Your Vision</h3>
                <p className="text-muted-foreground text-lg">
                  Explain what changes you want to make in plain English. For example: 
                  "Paint the walls light blue, add white trim, and install hardwood flooring."
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-12 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-6 md:p-8 rounded-full mb-5 md:mb-6">
                  <ImageIcon className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">3. Get Visualizations</h3>
                <p className="text-muted-foreground text-lg">PreModel AI instantly generates photorealistic visualizations of your space with the changes applied. Show your potential customers their dream home and close the deal.</p>
              </div>
            </div>
            
            <div className="mt-12 md:mt-20 text-center">
              <Button onClick={() => scrollToSection("founder-section")} className="bg-primary text-primary-foreground text-lg px-8 py-6 rounded-md">
                Contact Josh
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section id="examples" className="py-16 md:py-32">
          <div className="container max-w-[1400px] mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Before & After Examples</h2>
              <p className="text-muted-foreground text-xl mt-4 max-w-[800px] mx-auto">
                See the transformative power of PreModel visualizations
              </p>
            </div>
            
            <BeforeAfterExamples />
          </div>
        </section>

        <FounderSection />
      </main>
      
      <Footer />
    </div>;
};

export default Index;
