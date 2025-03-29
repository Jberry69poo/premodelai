
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageComparisonProps {
  originalImage: string;
  generatedImage: string | null;
  prompt: string;
  onStartNew: () => void; // New prop to handle creating a new image
}

export const ImageComparison = ({ 
  originalImage, 
  generatedImage,
  prompt,
  onStartNew
}: ImageComparisonProps) => {
  const { toast } = useToast();
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `mockingbird-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Image downloaded!",
      description: "The generated image has been downloaded to your device.",
    });
  };

  const handleShare = () => {
    if (!generatedImage) return;
    
    // Mock share functionality (would use Web Share API in production)
    toast({
      title: "Share feature",
      description: "The sharing feature will be available soon!",
    });
  };

  if (!generatedImage) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Result</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-secondary/60"
            onClick={() => setShowOriginal(!showOriginal)}
          >
            Show {showOriginal ? "After" : "Before"}
          </Button>
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden border border-border aspect-video">
        <img
          src={showOriginal ? originalImage : generatedImage}
          alt={showOriginal ? "Original image" : "Generated image"}
          className="w-full h-full object-cover transition-opacity"
        />
        {!showOriginal && (
          <div className="absolute bottom-3 left-3 right-3 bg-background/80 backdrop-blur-sm p-3 rounded-md">
            <p className="text-sm line-clamp-2">
              <span className="font-medium">Prompt:</span> {prompt}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between gap-2">
        <Button 
          variant="outline" 
          className="bg-secondary/60"
          onClick={onStartNew}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-secondary/60"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button 
            className="bg-primary text-primary-foreground"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
