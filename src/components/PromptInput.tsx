
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Wand2 } from "lucide-react";

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
    "change the roof to dark gray slate tiles",
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
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            For best results, describe a <span className="font-medium">single specific change</span> while keeping everything else exactly the same:
          </p>
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
