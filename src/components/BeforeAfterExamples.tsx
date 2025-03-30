
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
  const [activeCategory, setActiveCategory] = useState<Category>("exterior");

  return (
    <div className="w-full">
      <Tabs defaultValue="exterior" onValueChange={(value) => setActiveCategory(value as Category)}>
        <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
          <TabsTrigger value="exterior">Exterior Remodeling</TabsTrigger>
          <TabsTrigger value="painting">Painting</TabsTrigger>
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
