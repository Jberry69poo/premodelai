
import { WandSparkles } from "lucide-react";

interface MockingBirdLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const MockingBirdLogo = ({ size = "md", showText = true }: MockingBirdLogoProps) => {
  // Define the size classes
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10"
  };

  // Define the text size classes
  const textSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <WandSparkles className={`${sizeClasses[size]} text-primary`} />
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary-foreground animate-pulse-subtle"></span>
      </div>
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]}`}>
          Mocking<span className="text-primary">Bird</span>
        </span>
      )}
    </div>
  );
};
