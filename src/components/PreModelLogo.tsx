
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
      <div className="relative">
        {/* SVG logo based on the provided image */}
        <svg 
          className={`${sizeClasses[size]}`}
          viewBox="0 0 300 100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect 
            x="6" 
            y="6" 
            width="288" 
            height="88" 
            rx="44" 
            fill="white" 
            stroke="black" 
            strokeWidth="6"
          />
          <text 
            x="150" 
            y="65" 
            fontFamily="Arial, sans-serif" 
            fontSize="42" 
            fontWeight="bold" 
            textAnchor="middle" 
            fill="black"
          >
            PreModel.AI
          </text>
        </svg>
        
        {/* Glow effect for an enhanced look */}
        <motion.div 
          className={`absolute inset-0 rounded-full blur-lg opacity-50 ${sizeClasses[size]}`} 
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0.4) 100%)"
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-foreground"
          >
            PreModel.AI
          </motion.span>
        </div>
      )}
    </div>
  );
};
