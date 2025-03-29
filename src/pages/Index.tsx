
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
import { generateImageWithExternalAPI, saveMockup } from "@/lib/imageService";
import { uploadImage } from "@/lib/supabase";
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
  const [error, setError] = useState<string | null>(null);

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
    
    try {
      // Upload the image to Supabase for persistence
      let imageUrl;
      try {
        imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
          throw new Error("Failed to upload image: No URL returned");
        }
        setProgressValue(30);
        setProgressText("Image uploaded successfully, generating visualization...");
        console.log("Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }
      
      let generatedUrl;
      try {
        // Use the external API to generate the image
        generatedUrl = await generateImageWithExternalAPI(selectedFile, promptText);
        if (!generatedUrl) {
          throw new Error("No image URL returned from generation service");
        }
        setProgressValue(90);
        setProgressText("Visualization created successfully, finalizing...");
        console.log("Image generated successfully:", generatedUrl);
      } catch (generationError) {
        console.error("Image generation failed:", generationError);
        throw new Error(`Failed to generate image: ${generationError.message}`);
      }
      
      setGeneratedImage(generatedUrl);
      
      // Save the mockup to Supabase
      if (imageUrl) {
        try {
          await saveMockup(
            user?.id,
            imageUrl,
            generatedUrl,
            promptText
          );
          console.log("Mockup saved to database");
        } catch (saveError) {
          console.error("Failed to save mockup to database:", saveError);
          toast({
            variant: "default",
            title: "Image generated successfully",
            description: "But we couldn't save it to your history.",
          });
        }
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
                      <p className="font-medium">Error: {error}</p>
                    </div>
                  )}
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
