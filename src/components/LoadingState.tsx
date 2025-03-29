
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center p-12 space-y-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-medium">Creating your visualization</h3>
        <p className="text-muted-foreground">
          Our AI is working to transform your image. This may take up to 30 seconds...
        </p>
      </div>
      
      <div className="w-64 h-1.5 bg-secondary rounded-full overflow-hidden mt-4">
        <div className="h-full bg-primary rounded-full animate-pulse-subtle w-full" />
      </div>
    </div>
  );
};
