
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

  const examples = [
    "Change the roof to dark red shingles",
    "Update the exterior paint to navy blue",
    "Add stone veneer to the front facade",
    "Replace the windows with black framed ones"
  ];

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Textarea
          placeholder={isImageSelected ? "Describe the changes you want to make..." : "Please upload an image first"}
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
          <p className="text-xs text-muted-foreground">Example prompts:</p>
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
