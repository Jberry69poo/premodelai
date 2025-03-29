
import { Loader2, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface LoadingStateProps {
  progressValue?: number;
  progressText?: string;
  steps?: ProcessStep[];
}

export const LoadingState = ({ 
  progressValue = 50, 
  progressText = "Our AI is working to transform your image. This may take up to 30 seconds...",
  steps = []
}: LoadingStateProps) => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center p-6 space-y-6">
      {steps.length === 0 ? (
        <>
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
        </>
      ) : (
        <>
          <div className="text-center space-y-2 mb-2">
            <h3 className="text-xl font-medium">Creating your visualization</h3>
            <p className="text-muted-foreground text-sm">
              We're working through these steps to create your image
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <Progress value={progressValue} className="h-2 mb-6" />
            
            <div className="space-y-4">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-all",
                    step.isActive && !step.isCompleted && "bg-primary/5 border border-primary/20",
                    step.isCompleted && "opacity-80"
                  )}
                >
                  <div className="mt-0.5">
                    {step.isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <div className={cn(
                        "h-5 w-5 rounded-full border-2",
                        step.isActive ? "border-primary animate-pulse" : "border-muted"
                      )}>
                        {step.isActive && (
                          <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                            <span className="block h-2 w-2 rounded-full bg-primary" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className={cn(
                      "font-medium text-sm",
                      step.isActive && !step.isCompleted && "text-primary"
                    )}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
