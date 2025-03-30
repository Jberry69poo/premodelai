
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
            {/* Bird logo */}
            <motion.svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full"
              initial={{ opacity: 0, rotateY: -30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Bird body */}
              <motion.path 
                d="M12 19C8 19 5 16 5 12C5 8 8 5 12 5C16 5 19 8 19 12C19 13 18.5 14 18 15L21 18L19 19L17 17C15.5 18 13.5 19 12 19Z"
                stroke="url(#birdBodyGradient)" 
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="url(#birdFillGradient)"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Bird head */}
              <motion.path 
                d="M12 5C13 5 14 5.5 14.5 6L17 3L18 5L15.5 7C16 8 16 9 16 10"
                stroke="url(#birdHeadGradient)" 
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              
              {/* Bird wings */}
              <motion.path 
                d="M5 12C5 12 7 14 9 11M19 12C19 12 17 14 15 11"
                stroke="url(#wingGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              
              {/* Bird tail feathers */}
              <motion.path 
                d="M12 19C12 19 11 21 10 22M12 19C12 19 12 21 12 22M12 19C12 19 13 21 14 22"
                stroke="url(#tailGradient)" 
                strokeWidth="1" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              
              {/* Beak */}
              <motion.path 
                d="M14.5 6L15.5 7L14 8L13 7L14.5 6Z" 
                fill="url(#beakGradient)"
                stroke="url(#detailGradient)" 
                strokeWidth="1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              
              {/* Eye */}
              <motion.circle 
                cx="14" 
                cy="6.5" 
                r="0.5" 
                fill="#ffffff" 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              
              {/* Tech details - circuit lines */}
              <motion.path 
                d="M8 12H7M12 14V15M16 12H17" 
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
                <linearGradient id="birdBodyGradient" x1="5" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
                
                <linearGradient id="birdHeadGradient" x1="12" y1="3" x2="18" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                
                <linearGradient id="wingGradient" x1="5" y1="11" x2="19" y2="14" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#9333EA" />
                </linearGradient>
                
                <linearGradient id="tailGradient" x1="10" y1="19" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA" />
                  <stop offset="1" stopColor="#C084FC" />
                </linearGradient>
                
                <linearGradient id="beakGradient" x1="13" y1="6" x2="15.5" y2="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F472B6" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
                
                <linearGradient id="detailGradient" x1="12" y1="1" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                
                <linearGradient id="circuitGradient" x1="7" y1="12" x2="17" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38BDF8" />
                  <stop offset="1" stopColor="#818CF8" />
                </linearGradient>
                
                <radialGradient id="birdFillGradient" cx="12" cy="12" r="7" gradientUnits="userSpaceOnUse">
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
