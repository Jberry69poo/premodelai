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
    sm: "h-8 w-auto",
    // Increased height, width auto to maintain aspect ratio
    md: "h-12 w-auto",
    lg: "h-18 w-auto",
    xl: "h-24 w-auto"
  };

  // Define the text size classes
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl"
  };
  return <div className="flex items-center gap-2">
      <div className="relative">
        <img src="/lovable-uploads/a467188d-2dd0-4ac4-bed1-967adeb16893.png" alt="PreModel.AI Logo" className={`${sizeClasses[size]} object-contain`} // Added object-contain
      />
        
        {/* Subtle glow effect */}
        <motion.div className={`absolute inset-0 rounded-md blur-lg opacity-30 ${sizeClasses[size]}`} style={{
        background: "radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)"
      }} animate={{
        scale: [1, 1.05, 1],
        opacity: [0.2, 0.3, 0.2]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </div>
      
      {showText && <div className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          
        </div>}
    </div>;
};