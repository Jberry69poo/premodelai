
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Category = "painting" | "exterior" | "lighting" | "roofing" | "bathroom";

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
      before: "/placeholder.svg",
      after: "/placeholder.svg",
      description: "Updated the home exterior with new siding and architectural details."
    }
  ],
  lighting: [
    {
      before: "/placeholder.svg",
      after: "/placeholder.svg",
      description: "Enhanced the home's appearance with strategic holiday lighting installation."
    }
  ],
  roofing: [
    {
      before: "/placeholder.svg",
      after: "/placeholder.svg",
      description: "Replaced old asphalt shingles with stylish architectural ones that enhance curb appeal."
    }
  ],
  bathroom: [
    {
      before: "/placeholder.svg",
      after: "/placeholder.svg",
      description: "Completely renovated the bathroom with new fixtures, tile, and modern design."
    }
  ]
};

export function BeforeAfterExamples() {
  const [activeCategory, setActiveCategory] = useState<Category>("painting");

  return (
    <div className="w-full">
      <Tabs defaultValue="painting" onValueChange={(value) => setActiveCategory(value as Category)}>
        <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
          <TabsTrigger value="painting">Painting</TabsTrigger>
          <TabsTrigger value="exterior">Exterior Remodeling</TabsTrigger>
          <TabsTrigger value="lighting">Holiday Lighting</TabsTrigger>
          <TabsTrigger value="roofing">Roofing</TabsTrigger>
          <TabsTrigger value="bathroom">Bathroom Remodeling</TabsTrigger>
        </TabsList>
        
        {Object.entries(examplesByCategory).map(([category, examples]) => (
          <TabsContent key={category} value={category} className="space-y-8">
            {examples.map((example, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">Before</div>
                    <img 
                      src={example.before} 
                      alt={`Before ${category}`} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                    <div className="absolute top-2 left-2 bg-primary/70 text-white text-xs px-2 py-1 rounded z-10">After (MockingBird)</div>
                    <img 
                      src={example.after} 
                      alt={`After ${category}`} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {examples.map((example, index) => (
              <Card key={`description-${index}`} className="p-4 bg-card/60">
                <p className="text-sm italic">
                  "{example.description}"
                </p>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
