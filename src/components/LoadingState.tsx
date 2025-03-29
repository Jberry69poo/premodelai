
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingStateProps {
  progressValue?: number;
  progressText?: string;
}

export const LoadingState = ({ 
  progressValue = 50, 
  progressText = "Our AI is working to transform your image. This may take up to 30 seconds..."
}: LoadingStateProps) => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center p-12 space-y-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-medium">Creating your visualization</h3>
        <p className="text-muted-foreground">
          {progressText}
        </p>
      </div>
      
      <div className="w-full max-w-md mt-4">
        <Progress value={progressValue} className="h-2" />
      </div>
    </div>
  );
};
