
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

  return (
    <div className="flex items-center">
      <img 
        src="/lovable-uploads/0e0c4236-92f2-4b96-890e-34ebccf6dff4.png" 
        alt="PreModel.AI Logo" 
        className={`${sizeClasses[size]}`} 
      />
    </div>
  );
};
