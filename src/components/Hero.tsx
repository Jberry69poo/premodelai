
import { Button } from "@/components/ui/button";
import { PreModelLogo } from "@/components/PreModelLogo";
import { ArrowRight, Eye, Zap, Building, Layers, PaintBucket, Apple, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const staggerChildren = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/90 to-primary/5 pt-32 pb-12 md:pt-40 md:pb-16 px-4 min-h-[80vh] flex items-center">
      {/* Background Elements */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-[10%] h-[50rem] w-[50rem] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute -bottom-20 -left-20 h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-[120px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />
      </div>

      <div className="container max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Main heading with animated reveal */}
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter max-w-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-primary" initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>The App Epoxy Pros Need to Close More Deals</motion.h1>
          
          {/* Free Trial Banner */}
          <motion.div className="mt-4 px-6 py-2 bg-primary/20 rounded-full" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          delay: 0.8
        }}>
            <span className="text-lg md:text-xl font-medium text-primary-foreground">Try it free at your next sales appointment!</span>
          </motion.div>
          
          {/* Subheading */}
          <motion.p className="mt-6 md:mt-8 text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto" variants={fadeIn} initial="hidden" animate="visible">PreModel creates visualizations of the finished project before the work even starts.</motion.p>

          {/* Value props */}
          <motion.div className="mt-10 md:mt-16 flex flex-col md:flex-row justify-center md:gap-x-16 gap-y-6" variants={staggerChildren} initial="hidden" animate="visible">
            <motion.div variants={fadeIn} className="flex items-center gap-3 justify-center">
              <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary/20">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <span className="text-lg md:text-xl font-medium">Results in 2 Minutes</span>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex items-center gap-3 justify-center">
              <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary/20">
                <Building className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <span className="text-lg md:text-xl font-medium">2-3x Close Rates</span>
            </motion.div>
          </motion.div>

          {/* CTA section with app logo, download button, and free trial messaging */}
          <motion.div className="mt-10 md:mt-16 flex flex-col items-center justify-center gap-5" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }}>
            {/* Reduced logo size to match button height */}
            <PreModelLogo size="md" showText={false} />
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                variant="default" 
                size="lg" 
                className="text-lg px-8 py-7 bg-primary hover:bg-primary/90" 
                onClick={() => window.open("https://apps.apple.com/us/app/premodel-ai/id6744342396", "_blank")}
              >
                <span className="flex items-center">
                  Start Free Trial
                  <Download className="ml-3 h-5 w-5 md:h-6 md:w-6" />
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-7 border-primary/30 text-primary hover:bg-primary/10" 
                onClick={() => scrollToSection("pricing")}
              >
                <span className="flex items-center">
                  View Pricing
                  <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6" />
                </span>
              </Button>
            </div>
            
            {/* Removed the "Try it at your next appointment" text */}
          </motion.div>
          
          {/* Social Proof */}
          <motion.div className="mt-16 md:mt-20 border-t border-border/30 pt-8 md:pt-10 w-full" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 1.2
        }}>
            <div className="mt-6 flex flex-wrap justify-center gap-x-10 md:gap-x-16 gap-y-6 opacity-70">
              <div className="h-8 md:h-10 w-20 md:w-32 rounded-md bg-primary/20"></div>
              <div className="h-8 md:h-10 w-24 md:w-36 rounded-md bg-primary/20"></div>
              <div className="h-8 md:h-10 w-18 md:w-28 rounded-md bg-primary/20"></div>
              <div className="h-8 md:h-10 w-28 md:w-40 rounded-md bg-primary/20"></div>
              <div className="h-8 md:h-10 w-20 md:w-32 rounded-md bg-primary/20"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
