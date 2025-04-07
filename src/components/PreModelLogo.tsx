
import { motion } from "framer-motion";

interface PreModelLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const PreModelLogo = ({
  size = "md",
  showText = true
}: PreModelLogoProps) => {
  // Define the size classes
  const sizeClasses = {
    sm: "h-6 w-auto",
    md: "h-8 w-auto",
    lg: "h-12 w-auto",
    xl: "h-16 w-auto"
  };

  // Define the text size classes
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl"
  };

  return (
    <div className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/ce802d77-ce4e-414f-bfcc-3ebff9112b78.png" 
        alt="PreModel.AI Logo" 
        className={`${sizeClasses[size]}`}
      />
      
      {showText === false ? null : (
        <div className={`font-bold ${textSizeClasses[size]} tracking-tight hidden`}>
          <span className="text-foreground">PreModel.AI</span>
        </div>
      )}
    </div>
  );
};
