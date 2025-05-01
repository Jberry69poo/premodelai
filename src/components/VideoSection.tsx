
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const VideoSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
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
        
        <div className="mx-auto max-w-3xl aspect-[9/16] md:aspect-video relative">
          <iframe 
            className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/DIZQxDNHUKc"
            title="How PreModel Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};
