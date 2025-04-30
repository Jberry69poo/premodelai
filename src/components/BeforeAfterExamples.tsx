
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
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink 
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  const handlePrevious = () => {
    setActiveIndex(prev => (prev === 0 ? beforeAfterExamples.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % beforeAfterExamples.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Title & Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">
          {activeExample.title}
        </h3>
        <Pagination>
          <PaginationContent>
            {beforeAfterExamples.map((example, index) => (
              <PaginationItem key={example.id}>
                <PaginationLink 
                  onClick={() => setActiveIndex(index)} 
                  isActive={index === activeIndex}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>

      {/* Before/After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Before image */}
        <Card className="overflow-hidden">
          <div className="relative">
            <div className="absolute top-3 left-3 bg-black/70 text-white text-sm font-medium px-3 py-1 rounded-md z-10">
              Before
            </div>
            <div className="aspect-[4/3]">
              <img 
                src={activeExample.beforeImage} 
                alt={activeExample.beforeAlt} 
                className="object-cover w-full h-full" 
                loading="lazy" 
              />
            </div>
          </div>
        </Card>
        
        {/* After image */}
        <Card className="overflow-hidden">
          <div className="relative">
            <div className="absolute top-3 left-3 z-10">
              <PreModelLogo size="sm" showText={false} />
            </div>
            <div className="absolute bottom-3 right-3 bg-white/90 text-black/80 text-sm px-3 py-1 rounded-full font-medium">
              PreModel.AI
            </div>
            <div className="aspect-[4/3]">
              <img 
                src={activeExample.afterImage} 
                alt={activeExample.afterAlt} 
                className="object-cover w-full h-full" 
                loading="lazy" 
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Prompt card */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center mb-3">
            <span className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-bold">
              USER PROMPT
            </span>
          </div>
          <p className="text-base md:text-lg text-foreground">
            "{activeExample.prompt}"
          </p>
        </CardContent>
      </Card>
      
      {/* Navigation buttons */}
      <div className="flex justify-center gap-4">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Previous Example
        </Button>
        <Button 
          variant="default"
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          Next Example
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
