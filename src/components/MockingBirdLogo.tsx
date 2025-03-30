
import { motion } from "framer-motion";

interface MockingBirdLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const MockingBirdLogo = ({ size = "md", showText = true }: MockingBirdLogoProps) => {
  // Define the size classes
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-14 w-14"
  };

  // Define the text size classes
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl"
  };

  // Animation for the sparkle effect
  const sparkle = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Animated glowing background */}
        <motion.div 
          className={`absolute inset-0 bg-primary/40 rounded-full blur-md ${sizeClasses[size]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Logo icon with hexagonal shape */}
        <div className={`relative ${sizeClasses[size]} bg-background p-1 rounded-full border-2 border-primary flex items-center justify-center`}>
          {/* Improved tech-looking mockingbird silhouette SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary">
            {/* Body */}
            <path 
              d="M12 5L16 3L19 5L21 8L19 11L16 12L14 15L12 18L10 15L8 12L5 11L3 8L5 5L8 3L12 5Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Beak */}
            <path 
              d="M12 5L13 3L12 1L11 3L12 5Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Wings */}
            <path 
              d="M16 12L20 14L19 17L17 19L15 20" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            <path 
              d="M8 12L4 14L5 17L7 19L9 20" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Tech details */}
            <path 
              d="M12 5L12 3" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            <circle 
              cx="19" 
              cy="5" 
              r="1" 
              fill="currentColor" 
            />
            
            <circle 
              cx="5" 
              cy="5" 
              r="1" 
              fill="currentColor" 
            />
            
            <path 
              d="M12 18L12 21" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          
          {/* Small animated sparkles */}
          <motion.span 
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
            variants={sparkle}
            animate="animate"
          />
          
          <motion.span 
            className="absolute bottom-0 right-1 h-1.5 w-1.5 rounded-full bg-primary"
            variants={sparkle}
            animate="animate"
            transition={{
              delay: 0.5
            }}
          />
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          <span>Mocking</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary-foreground">Bird</span>
        </div>
      )}
    </div>
  );
};
