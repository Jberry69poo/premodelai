
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Download, Info, RefreshCcw } from "lucide-react";
import { useState } from "react";

interface ImageComparisonProps {
  originalImage: string;
  generatedImage: string;
  prompt: string;
  enhancedPrompt: string;
  onStartNew: () => void;
}

export const ImageComparison = ({
  originalImage,
  generatedImage,
  prompt,
  enhancedPrompt,
  onStartNew,
}: ImageComparisonProps) => {
  const [position, setPosition] = useState(50);
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "mockingbird-edit.jpg";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Visualization Result</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onStartNew}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Start New
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          See how your changes would look in reality.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 font-medium">
            <span>Your Request:</span>
            <span className="text-muted-foreground">{prompt}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 gap-1 text-xs font-normal" 
            onClick={() => setShowAIPrompt(!showAIPrompt)}
          >
            <Info className="h-3 w-3" />
            {showAIPrompt ? "Hide AI Prompt" : "Show AI Prompt"}
          </Button>
        </div>

        {showAIPrompt && (
          <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">AI-Enhanced Prompt:</p>
            <p>{enhancedPrompt}</p>
          </div>
        )}
      </div>

      <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
              style={{ zIndex: 10 }}
            >
              <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <p className="absolute bottom-4 text-sm font-medium text-white">
                Click to view full-size images
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-6xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Original Photo</h3>
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full rounded-md object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Modified Photo</h3>
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full rounded-md object-cover"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative h-full w-full">
          <img
            src={originalImage}
            alt="Original"
            className="absolute h-full w-full object-cover"
          />
          <div
            className="absolute h-full overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              src={generatedImage}
              alt="Generated"
              className="h-full w-full object-cover"
              style={{ width: `${100 / (position / 100)}%` }}
            />
          </div>
          <div
            className="absolute top-0 bottom-0 w-1 cursor-ew-resize bg-white"
            style={{ left: `calc(${position}% - 2px)` }}
            onMouseDown={(e) => {
              const handleMouseMove = (e: MouseEvent) => {
                const container = e.currentTarget as HTMLDivElement;
                const rect = container.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setPosition((x / rect.width) * 100);
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
};
