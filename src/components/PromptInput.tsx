
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Wand2, Info, Lightbulb } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  isImageSelected: boolean;
}

export const PromptInput = ({ onSubmit, isLoading, isImageSelected }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Examples that focus on very specific edits for realistic photo modifications
  const examples = [
    "change the shutters from blue to dark gray",
    "replace the white front door with a rich mahogany door",
    "change the roof to gray Spanish tile",
    "add black wrought iron railing to the front steps"
  ];

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Textarea
          placeholder={isImageSelected ? "Describe ONE specific change you want to make to this photo..." : "Please upload an image first"}
          className="min-h-24 resize-none bg-secondary/60 backdrop-blur-sm"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isImageSelected || isLoading}
        />
        <Button
          className="absolute bottom-2 right-2 bg-primary text-primary-foreground"
          size="sm"
          onClick={handleSubmit}
          disabled={!prompt.trim() || !isImageSelected || isLoading}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </div>
      
      {isImageSelected && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              For best results, describe a <span className="font-medium">single specific exterior change</span> to the home, 
              such as a color modification or material replacement. Be specific about colors and materials.
            </p>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Tips for best results:</p>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Specify exact colors (e.g., "navy blue" instead of just "blue")</li>
              <li>• Mention materials (e.g., "cedar shingles" instead of just "shingles")</li>
              <li>• Focus on one change at a time for highest quality results</li>
              <li>• Be clear about which part of the house you want to modify</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-secondary/60"
                onClick={() => setPrompt(example)}
                disabled={isLoading}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
