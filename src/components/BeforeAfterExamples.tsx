import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { responsiveWidth } from "@/lib/utils";
import { PreModelLogo } from "@/components/PreModelLogo";
type Category = "painting" | "exterior" | "lighting" | "roofing" | "bathroom" | "flooring" | "landscaping" | "kitchen";
interface ExampleImage {
  before: string;
  after: string;
  prompt: string; // Renamed from description to prompt
}
const examplesByCategory: Record<Category, ExampleImage[]> = {
  painting: [{
    before: "/lovable-uploads/50ac2ced-7a22-427c-b40c-f6bb9b58befe.png",
    after: "/lovable-uploads/0c75e39d-c2e9-4bef-9381-a242ce901b6f.png",
    prompt: "Transform the white bedroom walls to a calming sage green color with panel molding details"
  }],
  exterior: [{
    before: "/lovable-uploads/046973f7-e283-412e-8561-190f30c598bc.png",
    after: "/lovable-uploads/29ac98f1-8c98-4c46-8307-367478a7e6c5.png",
    prompt: "Replace the plain concrete driveway with a decorative stone pattern and artificial turf in a diamond pattern"
  }],
  lighting: [{
    before: "/lovable-uploads/2f377b23-3987-4bb3-812c-5fd632fb301b.png",
    after: "/lovable-uploads/264ac72a-feab-441c-be3f-b850fb19b534.png",
    prompt: "Add warm holiday lighting along the roof line, illuminate the palm trees, and add festive wreaths on the gates"
  }],
  roofing: [{
    before: "/lovable-uploads/547a69e5-4ff9-4f5a-a069-2d50de625f03.png",
    after: "/lovable-uploads/d8655611-3067-467d-b950-4eb817feb350.png",
    prompt: "Replace the tan shingles with contemporary charcoal gray architectural roofing"
  }],
  bathroom: [{
    before: "/lovable-uploads/d06a1ddf-ee7c-47b0-9cd6-88c08d1f11bc.png",
    after: "/lovable-uploads/eca719e2-97e0-4719-9085-3626dcef15bf.png",
    prompt: "Replace the basic tub/shower combo with a modern walk-in shower with black and white hexagon tile flooring and glass enclosure"
  }],
  flooring: [{
    before: "/lovable-uploads/050a5e67-c885-4dfc-ac5a-b0db52af5e11.png",
    after: "/lovable-uploads/5bfce9ae-348b-43c7-a3f6-010f0d2ab1c8.png",
    prompt: "Replace the terra cotta tile flooring with modern gray wood-look plank flooring"
  }],
  landscaping: [{
    before: "/lovable-uploads/74685434-27c8-4086-9968-2cc4b44b825a.png",
    after: "/lovable-uploads/7afdb8a0-2559-4da6-99ac-a66a544623a5.png",
    prompt: "Transform the sparse front yard with vibrant flower beds featuring pink, purple, and orange blooms, add lush green lawn, and enhance with colorful potted plants by the entrance"
  }],
  kitchen: [{
    before: "/lovable-uploads/242491e5-163e-4171-99c0-432a9b7c39bf.png",
    after: "/lovable-uploads/7f162b44-55b8-4854-8a33-34e3c5e6e1f7.png",
    prompt: "Transform the dark wood kitchen cabinets to bright white shaker style cabinets with gold hardware, keep the same granite countertops, and update the stainless steel appliances"
  }]
};
export function BeforeAfterExamples() {
  const [activeCategory, setActiveCategory] = useState<Category>("painting");
  const isMobile = useIsMobile();
  return <div className="w-full">
      <Tabs defaultValue="painting" onValueChange={value => setActiveCategory(value as Category)}>
        <div className="overflow-x-auto pb-3">
          <TabsList className="flex w-max min-w-full justify-start gap-1 px-1 py-1.5 md:justify-center md:flex-wrap">
            <TabsTrigger value="painting" className="text-xs sm:text-sm whitespace-nowrap">Painting</TabsTrigger>
            <TabsTrigger value="exterior" className="text-xs sm:text-sm whitespace-nowrap">Exterior</TabsTrigger>
            <TabsTrigger value="lighting" className="text-xs sm:text-sm whitespace-nowrap">Lighting</TabsTrigger>
            <TabsTrigger value="roofing" className="text-xs sm:text-sm whitespace-nowrap">Roofing</TabsTrigger>
            <TabsTrigger value="bathroom" className="text-xs sm:text-sm whitespace-nowrap">Bathroom</TabsTrigger>
            <TabsTrigger value="flooring" className="text-xs sm:text-sm whitespace-nowrap">Flooring</TabsTrigger>
            <TabsTrigger value="landscaping" className="text-xs sm:text-sm whitespace-nowrap">Landscaping</TabsTrigger>
            <TabsTrigger value="kitchen" className="text-xs sm:text-sm whitespace-nowrap">Kitchen</TabsTrigger>
          </TabsList>
        </div>
        
        {Object.entries(examplesByCategory).map(([category, examples]) => <TabsContent key={category} value={category} className="space-y-6">
            {examples.map((example, index) => <div key={index} className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                      <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-3 py-1.5 rounded font-medium shadow-md backdrop-blur-sm z-10">
                        Before
                      </div>
                      <img src={example.before} alt={`Before ${category}`} className="object-cover w-full h-full" loading="lazy" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden aspect-[4/3] border">
                      <div className="absolute top-2 left-2 text-white text-xs rounded font-medium shadow-md backdrop-blur-sm z-10 flex items-center bg-transparent px-0 py-0 my-0 mx-0">
                        <PreModelLogo size="sm" showText={false} />
                      </div>
                      <img src={example.after} alt={`After ${category}`} className="object-cover w-full h-full" loading="lazy" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 pb-8">
                  <Card className="shadow-sm border border-primary/30 bg-transparent mx-px py-0 px-[154px]">
                    <div className="p-3 sm:p-4 py-0 px-[2px] mx-0 my-[72px] bg-transparent">
                      <div className="inline-flex px-2 py-1 sm:px-2.5 sm:py-1.5 bg-primary/20 text-primary rounded-md text-xs font-bold self-start mb-2">
                        USER PROMPT
                      </div>
                      <div className="py-3">
                        <p className="text-sm text-foreground leading-relaxed text-center font-normal py-0 px-0 mx-0 my-0 md:text-xl">
                          "{example.prompt}"
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>)}
          </TabsContent>)}
      </Tabs>
    </div>;
}