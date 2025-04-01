import { Button } from "@/components/ui/button";
import { MockingBirdLogo } from "@/components/MockingBirdLogo";
import { ArrowRight, Eye, Zap, Building, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
export const Hero = () => {
  const isMobile = useIsMobile();
  const scrollToSignup = () => {
    document.getElementById("beta-signup")?.scrollIntoView({
      behavior: "smooth"
    });
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
  return <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/90 to-primary/5 pt-24 pb-16 md:pt-32 md:pb-24 px-4">
      {/* Background Elements */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-[10%] h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[100px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />
      </div>

      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Logo animates in */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5
        }} className="mb-6 md:mb-10">
            <MockingBirdLogo size={isMobile ? "md" : "xl"} showText={false} />
          </motion.div>
          
          {/* Main heading with animated reveal */}
          <motion.h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter max-w-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-primary" initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            The next big thing in Home Service Sales
          </motion.h1>
          
          {/* Subheading */}
          <motion.p className="mt-4 md:mt-6 text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto" variants={fadeIn} initial="hidden" animate="visible">MockingBird Shows clients exactly what their renovated space will look like before you even start the work.</motion.p>

          {/* Value props */}
          <motion.div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-center md:gap-x-12 gap-y-4" variants={staggerChildren} initial="hidden" animate="visible">
            <motion.div variants={fadeIn} className="flex items-center gap-2 justify-center">
              <div className="flex items-center justify-center w-8 md:w-10 h-8 md:h-10 rounded-full bg-primary/20">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <span className="text-base md:text-lg font-medium">Results in 2 Minutes</span>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex items-center gap-2 justify-center">
              <div className="flex items-center justify-center w-8 md:w-10 h-8 md:h-10 rounded-full bg-primary/20">
                <Building className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <span className="text-base md:text-lg font-medium">2-3x Close Rates</span>
            </motion.div>
          </motion.div>

          {/* CTA section */}
          <motion.div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }}>
            <Button size={isMobile ? "default" : "lg"} className={`${isMobile ? 'text-base px-5 py-2' : 'text-lg px-8 py-6'} bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group`} onClick={scrollToSignup}>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 -translate-x-full group-hover:animate-shimmer"></span>
              <span className="relative z-10 flex items-center">
                Join Free Beta
                <Rocket className="ml-2 h-4 w-4 md:h-5 md:w-5 animate-pulse" />
              </span>
            </Button>
            
            <Button variant="outline" size={isMobile ? "default" : "lg"} className={`${isMobile ? 'text-base px-5 py-2' : 'text-lg px-8 py-6'} border-primary/30 hover:bg-primary/10`} onClick={() => document.querySelector('.examples-section')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              <span className="flex items-center">
                See Examples
                <Eye className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </span>
            </Button>
          </motion.div>
          
          {/* Social Proof */}
          <motion.div className="mt-12 md:mt-16 border-t border-border/30 pt-6 md:pt-8 w-full" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 1.2
        }}>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              TRUSTED BY HOME IMPROVEMENT PROFESSIONALS ACROSS NORTH AMERICA
            </p>
            
            <div className="mt-4 flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-4 opacity-70">
              {/* You can replace these with actual company logos */}
              <div className="h-6 md:h-8 w-16 md:w-24 rounded-md bg-primary/20"></div>
              <div className="h-6 md:h-8 w-20 md:w-28 rounded-md bg-primary/20"></div>
              <div className="h-6 md:h-8 w-14 md:w-20 rounded-md bg-primary/20"></div>
              <div className="h-6 md:h-8 w-24 md:w-32 rounded-md bg-primary/20"></div>
              <div className="h-6 md:h-8 w-16 md:w-24 rounded-md bg-primary/20"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI3MHB4IiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzExMTIxMyI+PHBhdGggZD0iTTEyODAgMEw2NDAgNzAgMCAwdjE0MGgxMjgwVjB6IiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTEyODAgMGwtNjQwIDcwLTY0MC03MHY3MGgxMjgwVjB6Ii8+PC9nPjwvc3ZnPg==')] bg-bottom bg-no-repeat"></div>
    </section>;
};