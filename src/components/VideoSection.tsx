
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const VideoSection = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Updated YouTube URL to the new shorts video
  const youtubeUrl = "https://www.youtube.com/embed/tyLY-FlOLIk?playsinline=1&rel=0&modestbranding=1";
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="how-it-works">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How PreModel Works
          </h2>
          
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{ 
              repeat: 3, 
              repeatType: "reverse", 
              duration: 1 
            }}
          >
            <ArrowDown className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          </motion.div>
        </div>
        
        <div className="mx-auto max-w-3xl relative rounded-xl shadow-lg overflow-hidden">
          {/* Use a more appropriate aspect ratio for YouTube shorts */}
          <AspectRatio ratio={isMobile ? 9/16 : 16/9} className="bg-secondary/20">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
            )}
            
            {hasError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <p className="text-muted-foreground mb-2">Video could not be loaded</p>
                <button 
                  onClick={() => {setHasError(false); setIsLoading(true);}}
                  className="text-primary hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <iframe 
                className="absolute inset-0 w-full h-full"
                src={youtubeUrl}
                title="How PreModel Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => {setHasError(true); setIsLoading(false);}}
              ></iframe>
            )}
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};
