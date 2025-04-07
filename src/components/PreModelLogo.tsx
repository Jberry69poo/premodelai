
import { motion } from "framer-motion";

interface PreModelLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const PreModelLogo = ({
  size = "md",
  showText = true
}: PreModelLogoProps) => {
  // Define the size classes with extremely large dimensions
  const sizeClasses = {
    sm: "h-24 w-auto", // Doubled from h-12
    md: "h-32 w-auto", // Doubled from h-16
    lg: "h-48 w-auto", // Doubled from h-24
    xl: "h-64 w-auto"  // Doubled from h-32
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
