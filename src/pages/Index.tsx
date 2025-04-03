
import { CustomNavbar } from "@/components/CustomNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfterExamples } from "@/components/BeforeAfterExamples";
import { ArrowRight, CameraIcon, MessageSquareText, ImageIcon } from "lucide-react";
import { Hero } from "@/components/Hero";
import { FounderSection } from "@/components/FounderSection";
import { useEffect } from "react";

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

  return <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      
      <main className="flex-1">
        <Hero />

        <section id="how-it-works" className="py-12 md:py-24 bg-card/30 px-4">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">How PreModel Works</h2>
              <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
                From photo to visualization in minutes, not weeks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-6 md:mt-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 md:p-5 rounded-full mb-3 md:mb-4">
                  <CameraIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">1. Snap a Photo</h3>
                <p className="text-muted-foreground">
                  Take a picture or upload an existing photo of the space you want to renovate. 
                  Works with kitchens, bathrooms, exteriors, landscaping, and more.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-10 hidden md:block">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-4 md:p-5 rounded-full mb-3 md:mb-4">
                  <MessageSquareText className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">2. Describe Your Vision</h3>
                <p className="text-muted-foreground">
                  Explain what changes you want to make in plain English. For example: 
                  "Paint the walls light blue, add white trim, and install hardwood flooring."
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-0 top-10 hidden md:block">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="bg-primary/10 p-4 md:p-5 rounded-full mb-3 md:mb-4">
                  <ImageIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">3. Get Visualizations</h3>
                <p className="text-muted-foreground">PreModel AI instantly generates photorealistic visualizations of your space with the changes applied. Show your potential customers their dream home and close the deal.</p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-10 text-center">
              <Button onClick={() => scrollToSection("founder-section")} className="bg-primary text-primary-foreground">
                Contact Josh
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section id="examples" className="py-12 md:py-24 px-4">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Before & After Examples</h2>
              <p className="text-muted-foreground md:text-lg mt-2 max-w-[700px] mx-auto">
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
