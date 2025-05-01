import { useState } from "react";
import { PreModelLogo } from "@/components/PreModelLogo";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight, Clock, DollarSign, CheckSquare } from "lucide-react";

// Example data for better organization
const beforeAfterExamples = [{
  id: 1,
  title: "Amber Epoxy Garage Floor",
  beforeImage: "/lovable-uploads/da974d50-3da6-4a4d-ad70-563295eb53f4.png",
  afterImage: "/lovable-uploads/aaf5d6f9-0e32-45d3-8080-6359883d01b3.png",
  beforeAlt: "Before garage floor transformation",
  afterAlt: "After garage floor transformation"
}, {
  id: 2,
  title: "Gray Speckled Epoxy Garage Floor",
  beforeImage: "/lovable-uploads/254298a2-9cdb-4928-a92c-f3127bb3902f.png",
  afterImage: "/lovable-uploads/013a1078-5fca-4674-b267-8343a9989431.png",
  beforeAlt: "Before gray speckled garage floor",
  afterAlt: "After gray speckled garage floor"
}, {
  id: 3,
  title: "Tan Flake Epoxy Garage Floor",
  beforeImage: "/lovable-uploads/985ef332-a875-43f5-bc54-28028eb078ed.png",
  afterImage: "/lovable-uploads/59d135cf-4ca2-477d-b8e4-8eb04678e9cd.png",
  beforeAlt: "Before tan flake epoxy garage floor",
  afterAlt: "After tan flake epoxy garage floor with organized storage"
}, {
  id: 4,
  title: "Light Gray Epoxy Floor",
  beforeImage: "/lovable-uploads/d0531a73-ff16-470d-b399-738dbcb5c977.png",
  afterImage: "/lovable-uploads/a68ad189-39ba-4f82-a9ee-ef57f49e529b.png",
  beforeAlt: "Before light gray epoxy floor installation",
  afterAlt: "After light gray epoxy floor installation"
}];
export function BeforeAfterExamples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExample = beforeAfterExamples[activeIndex];
  const handlePrevious = () => {
    setActiveIndex(prev => prev === 0 ? beforeAfterExamples.length - 1 : prev - 1);
  };
  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % beforeAfterExamples.length);
  };
  return <div className="w-full max-w-5xl mx-auto">
      {/* Title & Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">
          {activeExample.title}
        </h3>
        <Pagination>
          <PaginationContent>
            {beforeAfterExamples.map((example, index) => <PaginationItem key={example.id}>
                <PaginationLink onClick={() => setActiveIndex(index)} isActive={index === activeIndex} className="cursor-pointer">
                  {index + 1}
                </PaginationLink>
              </PaginationItem>)}
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
            <div className="aspect-video w-full h-[300px] md:h-[350px]">
              <img src={activeExample.beforeImage} alt={activeExample.beforeAlt} className="object-cover w-full h-full" loading="lazy" />
            </div>
          </div>
        </Card>
        
        {/* After image */}
        <Card className="overflow-hidden">
          <div className="relative">
            <div className="absolute top-3 left-3 z-10">
              <PreModelLogo size="sm" showText={false} />
            </div>
            <div className="aspect-video w-full h-[300px] md:h-[350px]">
              <img src={activeExample.afterImage} alt={activeExample.afterAlt} className="object-cover w-full h-full" loading="lazy" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Business Impact Section */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg md:text-xl font-semibold text-primary">Real Business Impact</h4>
              <p className="text-base md:text-lg">These PreModels were created in under 90 seconds, Helping contractors close more than $2,500,000 worth of projects on the spot. When clients can visualize the transformation, You close more deals.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 md:mt-0">
              <div className="flex flex-col items-center text-center p-3">
                <div className="p-2 rounded-full bg-primary/20 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">90-Second Renders</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-3">
                <div className="p-2 rounded-full bg-primary/20 mb-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">$2M+ Closed Deals</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-3">
                <div className="p-2 rounded-full bg-primary/20 mb-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">2-3X Close Rates</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Previous Example
        </Button>
        <Button variant="default" onClick={handleNext} className="flex items-center gap-2">
          Next Example
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>;
}