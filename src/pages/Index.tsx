
import { useState, useEffect } from "react";
import { CustomNavbar } from "@/components/CustomNavbar";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { PromptInput } from "@/components/PromptInput";
import { ImageComparison } from "@/components/ImageComparison";
import { LoadingState, ProcessStep } from "@/components/LoadingState";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateImageWithExternalAPI, saveMockup } from "@/lib/imageService";
import { uploadImage } from "@/lib/imageService";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const DEFAULT_STEPS: ProcessStep[] = [
  {
    id: "upload",
    title: "Preparing your image",
    description: "Uploading your image and preparing it for processing",
    isActive: false,
    isCompleted: false
  },
  {
    id: "enhance",
    title: "Enhancing your prompt",
    description: "Our AI is analyzing your request to optimize results",
    isActive: false,
    isCompleted: false
  },
  {
    id: "generate",
    title: "Generating visualization",
    description: "Creating your image based on the specified changes",
    isActive: false,
    isCompleted: false
  },
  {
    id: "finalize",
    title: "Finalizing result",
    description: "Applying finishing touches and preparing display",
    isActive: false,
    isCompleted: false
  }
];

const Index = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [progressValue, setProgressValue] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [apiRetries, setApiRetries] = useState(0);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(DEFAULT_STEPS);

  const updateStep = (stepId: string, updates: Partial<ProcessStep>) => {
    setProcessSteps(currentSteps => 
      currentSteps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    );
  };
  
  const resetSteps = () => {
    setProcessSteps(DEFAULT_STEPS);
  };

  const handleImageSelect = async (file: File | null) => {
    if (!file) {
      setSelectedImage(null);
      setSelectedFile(null);
      return;
    }
    
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setGeneratedImage(null);
    setError(null);
    resetSteps();
  };

  const handlePromptSubmit = async (promptText: string) => {
    if (!selectedImage || !selectedFile) {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please upload an image first.",
      });
      return;
    }
    
    setPrompt(promptText);
    setIsLoading(true);
    setProgressValue(10);
    setProgressText("Processing your request...");
    setError(null);
    resetSteps();
    
    try {
      // Step 1: Upload image
      updateStep("upload", { isActive: true });
      setProgressValue(20);
      setProgressText("Uploading your image...");
      console.log("Beginning the image generation process");
      
      // Wait a moment to show the first step animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStep("upload", { isCompleted: true, isActive: false });
      
      // Step 2: Enhance prompt
      updateStep("enhance", { isActive: true });
      setProgressValue(35);
      setProgressText("Enhancing your prompt with AI...");
      
      // Wait a moment to show the second step animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateStep("enhance", { isCompleted: true, isActive: false });
      
      // Step 3: Generate image
      updateStep("generate", { isActive: true });
      setProgressValue(50);
      setProgressText("Generating your visualization...");
      
      console.log("Calling image generation with prompt:", promptText);
      const generatedUrl = await generateImageWithExternalAPI(selectedFile, promptText);
      
      updateStep("generate", { isCompleted: true, isActive: false });
      
      // Step 4: Finalize
      updateStep("finalize", { isActive: true });
      setProgressValue(85);
      setProgressText("Finalizing your visualization...");
      
      console.log("Image generated successfully:", generatedUrl);
      
      // Wait a moment to show the final step animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStep("finalize", { isCompleted: true, isActive: false });
      
      setGeneratedImage(generatedUrl);
      setApiRetries(0); // Reset retries on success
      
      const imageUrl = await uploadImage(selectedFile);
      
      if (imageUrl) {
        await saveMockup(
          user?.id,
          imageUrl,
          generatedUrl,
          promptText
        );
        console.log("Mockup saved to database");
      }
      
      toast({
        title: "Success!",
        description: "Your visualization is ready to view.",
      });
      
      setActiveTab("result");
      setProgressValue(100);
    } catch (error) {
      console.error("Error in handlePromptSubmit:", error);
      setError(error.message || "An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error.message || "There was an error generating your image. Please try again with a more specific change description.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (prompt && selectedFile) {
      if (apiRetries > 2) {
        toast({
          variant: "destructive",
          title: "Too many attempts",
          description: "The service may be temporarily unavailable. Please try again later.",
        });
        return;
      }
      setApiRetries(apiRetries + 1);
      handlePromptSubmit(prompt);
    }
  };

  const handleStartNew = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setGeneratedImage(null);
    setPrompt("");
    setError(null);
    setActiveTab("create");
    setApiRetries(0);
    resetSteps();
    
    toast({
      title: "Starting new creation",
      description: "Upload a new image to begin.",
      variant: "default"
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      
      <main className="flex-1">
        {!generatedImage && !isLoading && <Hero />}
        
        <div className="container px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="result" disabled={!generatedImage}>Result</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight">Upload an image</h2>
                  <p className="text-muted-foreground">
                    Start by uploading a photo of the home you want to modify.
                  </p>
                  <ImageUpload 
                    onImageSelect={handleImageSelect} 
                    selectedImage={selectedImage}
                    isLoading={isLoading}
                  />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight">Describe the changes</h2>
                  <p className="text-muted-foreground">
                    Tell us what modifications you want to make to the image.
                  </p>
                  <PromptInput 
                    onSubmit={handlePromptSubmit} 
                    isLoading={isLoading}
                    isImageSelected={!!selectedImage}
                  />
                  
                  {error && (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5" />
                        <p className="font-medium">Error</p>
                      </div>
                      <p>{error}</p>
                      {(error.includes("timed out") || error.includes("unavailable") || error.includes("Load failed")) && (
                        <div className="mt-3">
                          <p className="text-sm mb-2">The external image generation service appears to be unavailable at the moment. You can:</p>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Try again in a few minutes</li>
                            <li>Try a different prompt</li>
                            <li>Check your internet connection</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="result">
                {isLoading ? (
                  <LoadingState 
                    progressValue={progressValue} 
                    progressText={progressText}
                    steps={processSteps}
                  />
                ) : (
                  generatedImage && selectedImage && (
                    <ImageComparison 
                      originalImage={selectedImage} 
                      generatedImage={generatedImage}
                      prompt={prompt}
                      onStartNew={handleStartNew}
                      onRegenerate={handleRegenerate}
                    />
                  )
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
