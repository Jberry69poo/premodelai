
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ImageUpload";
import { PromptInput } from "@/components/PromptInput";
import { ImageComparison } from "@/components/ImageComparison";
import { 
  Camera, 
  MessageSquareText, 
  ImageIcon, 
  ArrowRight, 
  CheckCircle
} from "lucide-react";

export function MockingbirdFlow() {
  return (
    <div className="space-y-16">
      {/* Step indicators */}
      <div className="hidden md:flex justify-center items-center gap-4 mb-8">
        <StepIndicator number={1} title="Snap a Photo" icon={<Camera className="h-5 w-5" />} active={true} />
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <StepIndicator number={2} title="Describe Changes" icon={<MessageSquareText className="h-5 w-5" />} active={true} />
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <StepIndicator number={3} title="Get Results" icon={<ImageIcon className="h-5 w-5" />} active={true} />
      </div>

      {/* Interactive app demo */}
      <Tabs defaultValue="upload" className="w-full">
        <div className="md:hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">
              <div className="flex flex-col items-center">
                <span className="text-xs">Step 1</span>
                <span>Upload</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="prompt">
              <div className="flex flex-col items-center">
                <span className="text-xs">Step 2</span>
                <span>Describe</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="result">
              <div className="flex flex-col items-center">
                <span className="text-xs">Step 3</span>
                <span>Result</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <TabsContent value="upload" className="mt-0">
            <AppScreenCard title="Step 1: Upload a Photo">
              <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black/80 p-3">
                <div className="h-full rounded flex flex-col">
                  <div className="flex-grow">
                    <ImageUpload 
                      onImageSelect={() => {}} 
                      selectedImage="/lovable-uploads/19e02c58-4397-44bc-9d7d-b449c6496c0b.png" 
                      isLoading={false}
                    />
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-center text-white/70">
                      Take a photo or upload an existing one from your gallery
                    </p>
                  </div>
                </div>
              </div>
            </AppScreenCard>
          </TabsContent>

          <TabsContent value="prompt" className="mt-0">
            <AppScreenCard title="Step 2: Describe the Change">
              <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black/80 p-3">
                <div className="h-full rounded flex flex-col">
                  <div className="h-1/2 mb-4">
                    <div className="relative h-full rounded-lg overflow-hidden border border-muted">
                      <img 
                        src="/lovable-uploads/19e02c58-4397-44bc-9d7d-b449c6496c0b.png" 
                        alt="Selected home" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
                      <p className="text-sm mb-2 font-medium">Describe what to change:</p>
                      <div className="text-xs p-2 bg-muted/50 rounded-md">
                        Change the white walls to a sophisticated navy blue color
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-center text-white/70">
                      Be specific about the changes you want to visualize
                    </p>
                  </div>
                </div>
              </div>
            </AppScreenCard>
          </TabsContent>

          <TabsContent value="result" className="mt-0">
            <AppScreenCard title="Step 3: Show Your Client">
              <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black/80 p-3">
                <div className="h-full rounded flex flex-col">
                  <div className="flex-1">
                    <div className="h-full rounded-lg overflow-hidden border border-muted">
                      <img 
                        src="/lovable-uploads/18ac9548-10f5-4903-bada-a04dc21df965.png" 
                        alt="Generated result" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2 text-primary bg-primary/10 py-2 px-3 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs font-medium">Result ready to share</span>
                    </div>
                  </div>
                </div>
              </div>
            </AppScreenCard>
          </TabsContent>
        </div>
      </Tabs>

      {/* Features callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          title="Photorealistic Quality" 
          description="Our AI generates high-fidelity visualizations that look just like professional photos"
        />
        <FeatureCard 
          title="Fast Generation" 
          description="Get results in under a minute - perfect for showing clients during consultations"
        />
        <FeatureCard 
          title="Unlimited Variations" 
          description="Try different colors, materials and designs until you find the perfect look"
        />
      </div>
    </div>
  );
}

function StepIndicator({ 
  number, 
  title, 
  icon, 
  active 
}: { 
  number: number; 
  title: string; 
  icon: React.ReactNode; 
  active: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${active ? "opacity-100" : "opacity-50"}`}>
      <div className={`h-10 w-10 rounded-full ${active ? "bg-primary" : "bg-muted"} text-white flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
}

function AppScreenCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-medium mb-4 text-center md:text-left">{title}</h3>
      <div className="flex-1 flex justify-center items-center bg-gradient-to-b from-muted/30 to-muted/10 rounded-xl p-4 shadow-md">
        {children}
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="p-6 bg-card/60 border shadow-sm hover:shadow transition-all">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
}
