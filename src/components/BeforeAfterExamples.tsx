
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
                  src="/lovable-uploads/da974d50-3da6-4a4d-ad70-563295eb53f4.png" 
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
                <div className="absolute bottom-3 right-3 bg-white/90 text-black/80 text-sm px-3 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                  PreModel.AI
                </div>
                <img 
                  src="/lovable-uploads/aaf5d6f9-0e32-45d3-8080-6359883d01b3.png" 
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
                "Transform my concrete garage floor with a rich, glossy amber epoxy finish that enhances the space and is durable enough to handle vehicle traffic"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
