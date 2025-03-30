
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Camera, 
  MessageSquareText, 
  ImageIcon, 
  ArrowRight, 
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { PromptInput } from "@/components/PromptInput";
import { ImageComparison } from "@/components/ImageComparison";

export function MockingbirdFlow() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/lovable-uploads/19e02c58-4397-44bc-9d7d-b449c6496c0b.png");
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedImage("/lovable-uploads/19e02c58-4397-44bc-9d7d-b449c6496c0b.png");
    setActiveStep(2);
  };

  const handlePromptSubmit = (userPrompt: string) => {
    setPrompt(userPrompt);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setGeneratedImage("/lovable-uploads/18ac9548-10f5-4903-bada-a04dc21df965.png");
      setIsLoading(false);
      setActiveStep(3);
    }, 800);
  };

  const handleStartNew = () => {
    setSelectedImage(null);
    setPrompt("");
    setGeneratedImage(null);
    setActiveStep(1);
  };

  const handleRegenerate = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setGeneratedImage("/lovable-uploads/18ac9548-10f5-4903-bada-a04dc21df965.png");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Step indicators */}
      <div className="hidden md:flex justify-center items-center gap-4 mb-12">
        <StepIndicator 
          number={1} 
          title="Snap a Photo" 
          icon={<Camera className="h-5 w-5" />} 
          active={activeStep >= 1} 
          complete={activeStep > 1}
        />
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <StepIndicator 
          number={2} 
          title="Describe Changes" 
          icon={<MessageSquareText className="h-5 w-5" />} 
          active={activeStep >= 2} 
          complete={activeStep > 2}
        />
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <StepIndicator 
          number={3} 
          title="View Result" 
          icon={<ImageIcon className="h-5 w-5" />} 
          active={activeStep >= 3} 
          complete={activeStep > 3}
        />
      </div>

      {/* Application mockup */}
      <div className="bg-background rounded-xl shadow-xl border overflow-hidden">
        {/* App header */}
        <div className="bg-card px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm font-medium">MockingBird</div>
          <div className="w-20"></div>
        </div>

        {/* App content */}
        <div className="grid md:grid-cols-3 divide-x">
          {/* Left panel - Photo upload */}
          <div className="p-6 bg-background">
            <h3 className="text-lg font-medium mb-4">1. Upload Photo</h3>
            <ImageUpload 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              isLoading={isLoading}
            />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Take a photo or upload an image of the area you want to visualize changes for
              </p>
            </div>
          </div>

          {/* Middle panel - Prompt input */}
          <div className="p-6 bg-background">
            <h3 className="text-lg font-medium mb-4">2. Describe the Change</h3>
            <PromptInput
              onSubmit={handlePromptSubmit}
              isLoading={isLoading}
              isImageSelected={!!selectedImage}
            />
          </div>

          {/* Right panel - Results */}
          <div className="p-6 bg-background">
            <h3 className="text-lg font-medium mb-4">3. Results</h3>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 animate-pulse">
                <div className="mb-4">
                  <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">Creating visualization...</p>
              </div>
            ) : (
              generatedImage ? (
                <ImageComparison
                  originalImage={selectedImage}
                  generatedImage={generatedImage}
                  prompt={prompt}
                  onStartNew={handleStartNew}
                  onRegenerate={handleRegenerate}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Upload a photo and describe your changes<br />to see the results here
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Features callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        <FeatureCard 
          icon={<Camera className="h-5 w-5 text-primary" />}
          title="Snap a Photo" 
          description="Use your smartphone to take a picture of any space you want to visualize"
        />
        <FeatureCard 
          icon={<MessageSquareText className="h-5 w-5 text-primary" />}
          title="Describe Changes" 
          description="Tell MockingBird what changes you want to make with simple descriptions"
        />
        <FeatureCard 
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
          title="Share Results" 
          description="Download or share the visualization with your clients in seconds"
        />
      </div>
    </div>
  );
}

function StepIndicator({ 
  number, 
  title, 
  icon, 
  active,
  complete
}: { 
  number: number; 
  title: string; 
  icon: React.ReactNode; 
  active: boolean;
  complete?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${active ? "opacity-100" : "opacity-50"}`}>
      <div className={`h-10 w-10 rounded-full ${complete ? "bg-green-500" : active ? "bg-primary" : "bg-muted"} text-white flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <Card className="p-6 bg-card/60 border shadow-sm hover:shadow transition-all">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
}
