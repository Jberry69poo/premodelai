
import { useState, useEffect } from "react";
import { CustomNavbar } from "@/components/CustomNavbar";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { PromptInput } from "@/components/PromptInput";
import { ImageComparison } from "@/components/ImageComparison";
import { LoadingState } from "@/components/LoadingState";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uploadImage, generateImage, saveGeneratedImage } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

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
  };

  const handlePromptSubmit = async (promptText: string) => {
    if (!selectedImage || !selectedFile) return;
    
    setPrompt(promptText);
    setIsLoading(true);
    setProgressValue(0);
    setProgressText("Uploading your image...");
    
    try {
      // Step 1: Upload the image to Supabase Storage
      setProgressValue(10);
      const imageUrl = await uploadImage(selectedFile);
      
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }
      
      // Step 2: Generate the new image using OpenAI
      setProgressValue(30);
      setProgressText("Generating your visualization...");
      
      const result = await generateImage(promptText, imageUrl);
      
      if (!result || !result.generatedImageUrl) {
        throw new Error("Failed to generate image");
      }
      
      setProgressValue(90);
      setProgressText("Finalizing your result...");
      
      // Step 3: Set the generated image
      setGeneratedImage(result.generatedImageUrl);
      
      // Step 4: Save to database if user is logged in
      if (user) {
        await saveGeneratedImage(
          user.id,
          imageUrl,
          result.generatedImageUrl,
          promptText
        );
      } else {
        toast({
          description: "Sign in to save your generated images",
          variant: "default"
        });
      }
      
      toast({
        title: "Image generated successfully!",
        description: "Your visualization is ready to view.",
      });
      
      setActiveTab("result");
      setProgressValue(100);
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error instanceof Error 
          ? error.message 
          : "There was an error generating your image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
                </div>
              </TabsContent>
              
              <TabsContent value="result">
                {isLoading ? (
                  <LoadingState progressValue={progressValue} progressText={progressText} />
                ) : (
                  generatedImage && selectedImage && (
                    <ImageComparison 
                      originalImage={selectedImage} 
                      generatedImage={generatedImage}
                      prompt={prompt}
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
