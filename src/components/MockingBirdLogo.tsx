
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
    xl: "h-16 w-16"
  };

  // Define the text size classes
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl"
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Animated glowing background */}
        <motion.div 
          className={`absolute inset-0 rounded-full blur-xl ${sizeClasses[size]}`}
          style={{ 
            background: "radial-gradient(circle, rgba(138,58,226,1) 0%, rgba(86,91,245,0.8) 100%)" 
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Logo container */}
        <div className={`relative ${sizeClasses[size]} bg-gradient-to-br from-indigo-600 via-primary to-purple-700 p-0.5 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/30`}>
          <div className="w-full h-full bg-background/90 rounded-full p-1 backdrop-blur-sm flex items-center justify-center">
            {/* Tech-inspired bird logo */}
            <motion.svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full"
              initial={{ opacity: 0, rotateY: -30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Geometric body with cool tech effect */}
              <motion.path 
                d="M12 3L18 7L18 15L12 19L6 15V7L12 3Z" 
                stroke="url(#techGradient)" 
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="url(#meshGradient)"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Wings */}
              <motion.path 
                d="M18 10L21 7V14L18 12" 
                stroke="url(#wingGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              
              <motion.path 
                d="M6 10L3 7V14L6 12" 
                stroke="url(#wingGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              
              {/* Tech details - circuit lines */}
              <motion.path 
                d="M12 3V1M12 19V21M9 4L8 2.5M15 4L16 2.5" 
                stroke="url(#detailGradient)" 
                strokeWidth="1" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              
              {/* Head/beak */}
              <motion.path 
                d="M12 7L13.5 8.5L12 10L10.5 8.5L12 7Z" 
                fill="url(#beakGradient)"
                stroke="url(#detailGradient)" 
                strokeWidth="1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              
              {/* Eye with glow effect */}
              <motion.circle 
                cx="12" 
                cy="8.5" 
                r="0.5" 
                fill="#ffffff" 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              
              {/* Circuit board pattern */}
              <motion.path 
                d="M10 12H8V14H10M14 12H16V14H14M12 14V16" 
                stroke="url(#circuitGradient)" 
                strokeWidth="0.75" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
              
              {/* Animated energy particles */}
              <motion.circle 
                cx="18" 
                cy="7" 
                r="0.5" 
                fill="#ffffff"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              
              <motion.circle 
                cx="6" 
                cy="7" 
                r="0.5" 
                fill="#ffffff"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 0.7
                }}
              />
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="techGradient" x1="6" y1="3" x2="18" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
                
                <linearGradient id="detailGradient" x1="12" y1="1" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                
                <linearGradient id="wingGradient" x1="3" y1="7" x2="21" y2="14" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#9333EA" />
                </linearGradient>
                
                <linearGradient id="beakGradient" x1="10.5" y1="7" x2="13.5" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F472B6" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
                
                <linearGradient id="circuitGradient" x1="8" y1="12" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38BDF8" />
                  <stop offset="1" stopColor="#818CF8" />
                </linearGradient>
                
                <radialGradient id="meshGradient" cx="12" cy="11" r="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#312E81" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#1E1B4B" stopOpacity="0.2" />
                </radialGradient>
              </defs>
            </motion.svg>
            
            {/* Animated pulse around logo */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-primary/40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
        
        {/* Spark effects */}
        <motion.span 
          className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.span 
          className="absolute bottom-0 -left-0.5 h-1.5 w-1.5 rounded-full bg-purple-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-200"
          >
            Mocking
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground"
          >
            Bird
          </motion.span>
        </div>
      )}
    </div>
  );
};
