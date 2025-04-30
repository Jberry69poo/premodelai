
import { useState } from "react";
import { PreModelLogo } from "@/components/PreModelLogo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Example data for better organization
const beforeAfterExamples = [
  {
    id: 1,
    title: "Amber Epoxy Garage Floor",
    beforeImage: "/lovable-uploads/da974d50-3da6-4a4d-ad70-563295eb53f4.png",
    afterImage: "/lovable-uploads/aaf5d6f9-0e32-45d3-8080-6359883d01b3.png",
    beforeAlt: "Before garage floor transformation",
    afterAlt: "After garage floor transformation",
    prompt: "Transform my concrete garage floor with a rich, glossy amber epoxy finish that enhances the space and is durable enough to handle vehicle traffic"
  },
  {
    id: 2,
    title: "Gray Speckled Epoxy Garage Floor",
    beforeImage: "/lovable-uploads/254298a2-9cdb-4928-a92c-f3127bb3902f.png",
    afterImage: "/lovable-uploads/013a1078-5fca-4674-b267-8343a9989431.png",
    beforeAlt: "Before gray speckled garage floor",
    afterAlt: "After gray speckled garage floor",
    prompt: "Transform my standard concrete garage floor into a premium speckled epoxy finish in gray tones that is durable, easy to clean, and enhances the overall appearance of the space"
  }
];

export function BeforeAfterExamples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExample = beforeAfterExamples[activeIndex];

  return (
    <div className="w-full">
      <div className="space-y-10">
        {/* Title & Indicators */}
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center">
            {activeExample.title}
          </h3>
          <div className="flex gap-2">
            {beforeAfterExamples.map((example, index) => (
              <button 
                key={example.id}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`View ${example.title}`}
              />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <div className="relative">
            <CarouselContent>
              {/* Before image */}
              <CarouselItem>
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] border shadow-lg">
                  <div className="absolute top-3 left-3 bg-black/80 text-white text-sm px-4 py-2 rounded font-medium shadow-md backdrop-blur-sm z-10">
                    Before
                  </div>
                  <img 
                    src={activeExample.beforeImage} 
                    alt={activeExample.beforeAlt} 
                    className="object-cover w-full h-full" 
                    loading="lazy" 
                  />
                </div>
              </CarouselItem>
              
              {/* After image */}
              <CarouselItem>
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] border shadow-lg">
                  <div className="absolute top-3 left-3 text-white text-sm rounded font-medium shadow-md backdrop-blur-sm z-10 flex items-center bg-transparent px-0 py-0 my-0 mx-0">
                    <PreModelLogo size="sm" showText={false} />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 text-black/80 text-sm px-3 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                    PreModel.AI
                  </div>
                  <img 
                    src={activeExample.afterImage} 
                    alt={activeExample.afterAlt} 
                    className="object-cover w-full h-full" 
                    loading="lazy" 
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious className="absolute left-2 sm:left-4" />
            <CarouselNext className="absolute right-2 sm:right-4" />
          </div>
        </Carousel>
        
        {/* Prompt card */}
        <div className="mt-6">
          <div className="relative bg-black/5 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden p-6">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary/20"></div>
            <div className="flex items-center mb-3">
              <span className="inline-flex px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-bold">
                USER PROMPT
              </span>
            </div>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              "{activeExample.prompt}"
            </p>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveIndex(prev => prev === 0 ? beforeAfterExamples.length - 1 : prev - 1)}
            className="px-6"
          >
            Previous Example
          </Button>
          <Button 
            variant="default"
            onClick={() => setActiveIndex(prev => (prev + 1) % beforeAfterExamples.length)}
            className="px-6"
          >
            Next Example
          </Button>
        </div>
      </div>
    </div>
  );
}
