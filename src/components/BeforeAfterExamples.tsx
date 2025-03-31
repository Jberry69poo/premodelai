
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { responsiveWidth } from "@/lib/utils";

type Category = "painting" | "exterior" | "lighting" | "roofing" | "bathroom" | "flooring";

interface ExampleImage {
  before: string;
  after: string;
  description: string;
}

const examplesByCategory: Record<Category, ExampleImage[]> = {
  painting: [
    {
      before: "/lovable-uploads/19e02c58-4397-44bc-9d7d-b449c6496c0b.png",
      after: "/lovable-uploads/18ac9548-10f5-4903-bada-a04dc21df965.png",
      description: "Transformed this living room by changing white walls to sophisticated navy blue, creating a dramatic modern space."
    }
  ],
  exterior: [
    {
      before: "/lovable-uploads/046973f7-e283-412e-8561-190f30c598bc.png",
      after: "/lovable-uploads/29ac98f1-8c98-4c46-8307-367478a7e6c5.png",
      description: "Enhanced this home's curb appeal by replacing the plain concrete driveway with a decorative stone pattern with green pavers, adding visual interest and elegance."
    }
  ],
  lighting: [
    {
      before: "/lovable-uploads/2f377b23-3987-4bb3-812c-5fd632fb301b.png",
      after: "/lovable-uploads/264ac72a-feab-441c-be3f-b850fb19b534.png",
      description: "Transformed this elegant home with warm holiday lighting outlining the roof, illuminated palm trees, and festive wreaths on the gates for a magical nighttime display."
    }
  ],
  roofing: [
    {
      before: "/lovable-uploads/547a69e5-4ff9-4f5a-a069-2d50de625f03.png",
      after: "/lovable-uploads/d8655611-3067-467d-b950-4eb817feb350.png",
      description: "Modernized this brick colonial home by replacing the aging tan shingles with contemporary charcoal gray architectural roofing, adding contrast and enhancing the home's overall appearance."
    }
  ],
  bathroom: [
    {
      before: "/lovable-uploads/d06a1ddf-ee7c-47b0-9cd6-88c08d1f11bc.png",
      after: "/lovable-uploads/eca719e2-97e0-4719-9085-3626dcef15bf.png",
      description: "Completely renovated this bathroom by replacing the basic tub/shower combo with a modern walk-in shower featuring designer black and white hexagon tile flooring, black fixtures, and glass enclosure."
    }
  ],
  flooring: [
    {
      before: "/lovable-uploads/050a5e67-c885-4dfc-ac5a-b0db52af5e11.png",
      after: "/lovable-uploads/5bfce9ae-348b-43c7-a3f6-010f0d2ab1c8.png",
      description: "Completely transformed this living space by replacing outdated terra cotta tile with modern gray wood-look plank flooring, creating a more contemporary aesthetic while maintaining the open, airy feel."
    }
  ]
};

export function BeforeAfterExamples() {
  const [activeCategory, setActiveCategory] = useState<Category>("exterior");
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <Tabs defaultValue="exterior" onValueChange={(value) => setActiveCategory(value as Category)}>
        <div className="overflow-x-auto pb-3">
          <TabsList className="flex w-max min-w-full justify-start gap-1 px-1 py-1.5 md:justify-center md:flex-wrap">
            <TabsTrigger value="exterior" className="text-xs sm:text-sm whitespace-nowrap">Exterior</TabsTrigger>
            <TabsTrigger value="painting" className="text-xs sm:text-sm whitespace-nowrap">Painting</TabsTrigger>
            <TabsTrigger value="lighting" className="text-xs sm:text-sm whitespace-nowrap">Lighting</TabsTrigger>
            <TabsTrigger value="roofing" className="text-xs sm:text-sm whitespace-nowrap">Roofing</TabsTrigger>
            <TabsTrigger value="bathroom" className="text-xs sm:text-sm whitespace-nowrap">Bathroom</TabsTrigger>
            <TabsTrigger value="flooring" className="text-xs sm:text-sm whitespace-nowrap">Flooring</TabsTrigger>
          </TabsList>
        </div>
        
        {Object.entries(examplesByCategory).map(([category, examples]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            {examples.map((example, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
                        Before
                      </div>
                      <img 
                        src={example.before} 
                        alt={`Before ${category}`} 
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                      <div className="absolute top-2 left-2 bg-primary/70 text-white text-xs px-2 py-1 rounded z-10">
                        After
                      </div>
                      <img 
                        src={example.after} 
                        alt={`After ${category}`} 
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                
                <Card className="p-3 sm:p-4 bg-card/60">
                  <p className="text-xs sm:text-sm italic">
                    "{example.description}"
                  </p>
                </Card>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
