
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PreModelLogo } from "@/components/PreModelLogo";

export function BeforeAfterExamples() {
  return (
    <div className="w-full">
      <div className="space-y-8">
        <div>
          {/* Single before/after example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Before image */}
            <div>
              <div className="relative rounded-lg overflow-hidden aspect-[4/3] border shadow-lg">
                <div className="absolute top-3 left-3 bg-black/80 text-white text-sm px-4 py-2 rounded font-medium shadow-md backdrop-blur-sm z-10">
                  Before
                </div>
                <img 
                  src="/lovable-uploads/254298a2-9cdb-4928-a92c-f3127bb3902f.png" 
                  alt="Before garage floor transformation" 
                  className="object-cover w-full h-full" 
                  loading="lazy" 
                />
              </div>
            </div>
            
            {/* After image */}
            <div>
              <div className="relative rounded-lg overflow-hidden aspect-[4/3] border shadow-lg">
                <div className="absolute top-3 left-3 text-white text-sm rounded font-medium shadow-md backdrop-blur-sm z-10 flex items-center bg-transparent px-0 py-0 my-0 mx-0">
                  <PreModelLogo size="sm" showText={false} />
                </div>
                <img 
                  src="/lovable-uploads/013a1078-5fca-4674-b267-8343a9989431.png" 
                  alt="After garage floor transformation" 
                  className="object-cover w-full h-full" 
                  loading="lazy" 
                />
              </div>
            </div>
          </div>
          
          {/* Prompt card */}
          <div className="mt-6 mb-16">
            <div className="relative bg-black/5 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden p-6">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/20"></div>
              <div className="flex items-center mb-3">
                <span className="inline-flex px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-bold">
                  USER PROMPT
                </span>
              </div>
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                "Transform my standard concrete garage floor into a premium speckled epoxy finish in gray tones that is durable, easy to clean, and enhances the overall appearance of the space"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
