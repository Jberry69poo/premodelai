
import { motion } from "framer-motion";
import { MockingBirdIcon } from "./MockingBirdIcon";

interface MockingBirdLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const MockingBirdLogo = ({
  size = "md",
  showText = true
}: MockingBirdLogoProps) => {
  // Define the size classes
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  // Define the text size classes
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl"
  };
  
  return <div className="flex items-center gap-3">
      <div className="relative">
        {/* Animated logo background */}
        <motion.div className={`absolute inset-0 rounded-full blur-lg ${sizeClasses[size]}`} style={{
        background: "radial-gradient(circle, rgba(138,58,226,0.8) 0%, rgba(86,91,245,0.6) 100%)"
      }} animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        
        {/* Logo container */}
        <MockingBirdIcon className={sizeClasses[size]} />
        
        {/* Spark effects */}
        <motion.span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-blue-400" animate={{
        scale: [1, 1.5, 1],
        opacity: [0.7, 1, 0.7]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        
        <motion.span className="absolute bottom-0 -left-0.5 h-1 w-1 rounded-full bg-purple-400" animate={{
        scale: [1, 1.5, 1],
        opacity: [0.7, 1, 0.7]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }} />
      </div>
      
      {showText && <div className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          <motion.span initial={{
        opacity: 0,
        x: -10
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.5
      }} className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-200">
            Mocking
          </motion.span>
          <motion.span initial={{
        opacity: 0,
        x: -5
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
            Bird
          </motion.span>
        </div>}
    </div>;
};
