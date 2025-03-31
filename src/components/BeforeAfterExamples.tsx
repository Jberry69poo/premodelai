
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
  prompt: string;  // Renamed from description to prompt
}

const examplesByCategory: Record<Category, ExampleImage[]> = {
  painting: [
    {
      before: "/lovable-uploads/19e02c58-4397-44bc-9d7d-b449c6496c0b.png",
      after: "/lovable-uploads/18ac9548-10f5-4903-bada-a04dc21df965.png",
      prompt: "Change the white walls to sophisticated navy blue for a dramatic modern look"
    }
  ],
  exterior: [
    {
      before: "/lovable-uploads/046973f7-e283-412e-8561-190f30c598bc.png",
      after: "/lovable-uploads/29ac98f1-8c98-4c46-8307-367478a7e6c5.png",
      prompt: "Replace the plain concrete driveway with a decorative stone pattern with green pavers"
    }
  ],
  lighting: [
    {
      before: "/lovable-uploads/2f377b23-3987-4bb3-812c-5fd632fb301b.png",
      after: "/lovable-uploads/264ac72a-feab-441c-be3f-b850fb19b534.png",
      prompt: "Add warm holiday lighting along the roof line, illuminate the palm trees, and add festive wreaths on the gates"
    }
  ],
  roofing: [
    {
      before: "/lovable-uploads/547a69e5-4ff9-4f5a-a069-2d50de625f03.png",
      after: "/lovable-uploads/d8655611-3067-467d-b950-4eb817feb350.png",
      prompt: "Replace the tan shingles with contemporary charcoal gray architectural roofing"
    }
  ],
  bathroom: [
    {
      before: "/lovable-uploads/d06a1ddf-ee7c-47b0-9cd6-88c08d1f11bc.png",
      after: "/lovable-uploads/eca719e2-97e0-4719-9085-3626dcef15bf.png",
      prompt: "Replace the basic tub/shower combo with a modern walk-in shower with black and white hexagon tile flooring and glass enclosure"
    }
  ],
  flooring: [
    {
      before: "/lovable-uploads/050a5e67-c885-4dfc-ac5a-b0db52af5e11.png",
      after: "/lovable-uploads/5bfce9ae-348b-43c7-a3f6-010f0d2ab1c8.png",
      prompt: "Replace the terra cotta tile flooring with modern gray wood-look plank flooring"
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
                      <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-3 py-1.5 rounded font-medium shadow-md backdrop-blur-sm z-10">
                        Before
                      </div>
                      <img 
                        src={example.before} 
                        alt={`Before ${category}`} 
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    {isMobile && (
                      <p className="text-xs text-muted-foreground">Tap image to enlarge</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                      <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-3 py-1.5 rounded font-medium shadow-md backdrop-blur-sm z-10">
                        After (MockingBird)
                      </div>
                      <img 
                        src={example.after} 
                        alt={`After ${category}`} 
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    {isMobile && (
                      <p className="text-xs text-muted-foreground">Tap image to enlarge</p>
                    )}
                  </div>
                </div>
                
                <Card className="p-4 bg-card/80 shadow-sm border-border/80">
                  <p className="text-xs md:text-sm text-foreground font-medium flex items-center">
                    <span className="inline-flex px-2 py-1 mr-2 bg-primary/10 text-primary rounded text-xs font-bold">USER PROMPT</span>
                    "{example.prompt}"
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
