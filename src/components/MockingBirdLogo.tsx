
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
            {/* Advanced Bird logo */}
            <motion.svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full"
              initial={{ opacity: 0, rotateY: -30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Bird Wings Spread */}
              <motion.path 
                d="M4 11C6 9 9 10 10 12C11 14 12 15 14 15C14 15 14 13 12 12C10 11 13 6 20 9"
                stroke="url(#wingGradient)" 
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.1 }}
              />
              
              {/* Bird Body */}
              <motion.path 
                d="M10 12C10 8 13 7 15 8C17 9 18 12 17 15C16 18 14 19 12 19C10 19 9 18 8 16"
                stroke="url(#bodyGradient)" 
                strokeWidth="1.8"
                strokeLinejoin="round"
                fill="url(#bodyFillGradient)"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 0.8 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Bird Head */}
              <motion.path 
                d="M15 8C15.5 7.5 16.5 6.5 18 7C19.5 7.5 19.5 9 19 10C18.5 11 17 11.5 16 11C15 10.5 14.5 9 15 8Z"
                stroke="url(#headGradient)" 
                strokeWidth="1.5"
                fill="url(#headFillGradient)"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 0.9 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              
              {/* Bird Eye */}
              <motion.circle 
                cx="17.5" 
                cy="8.5" 
                r="0.6" 
                fill="#ffffff" 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              
              {/* Beak */}
              <motion.path 
                d="M18 9L19.5 9.5L18.5 10.5L17 10L18 9Z" 
                fill="url(#beakGradient)"
                stroke="#6c2e9c" 
                strokeWidth="0.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              
              {/* Tail Feathers */}
              <motion.path 
                d="M8 16C7 17 5 19 3 17M8 16C7.5 17.5 6 20 4.5 18.5M8 16C8 17.5 7 20.5 6 19"
                stroke="url(#tailGradient)" 
                strokeWidth="1.2" 
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.6, staggerChildren: 0.2 }}
              />
              
              {/* Decorative crest feathers */}
              <motion.path 
                d="M15 8C15.5 7 16 5 17 4M15.5 7.5C16 6.5 17 5 17.5 4.5M16 7C16.5 6 17.5 5 18 4.5"
                stroke="url(#crestGradient)" 
                strokeWidth="0.8" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9, staggerChildren: 0.15 }}
              />
              
              {/* Tech details and highlights */}
              <motion.path 
                d="M14 15C14.5 15.5 15 17 15 18M12 19C12.5 19.5 13 20 13 21M10 12C10.5 13 10 14 9 14.5"
                stroke="url(#detailGradient)" 
                strokeWidth="0.7" 
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
              
              {/* Animated energy particles */}
              <motion.circle 
                cx="18" 
                cy="7" 
                r="0.4" 
                fill="#ffffff"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-1, -2, -1]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 0.8
                }}
              />
              
              <motion.circle 
                cx="16" 
                cy="6" 
                r="0.3" 
                fill="#ffffff"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-0.5, -1.5, -0.5]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 0.7
                }}
              />
              
              <motion.circle 
                cx="7" 
                cy="15" 
                r="0.3" 
                fill="#ffffff"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1.1,
                  delay: 1.3
                }}
              />
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="wingGradient" x1="4" y1="9" x2="20" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#4F46E5" />
                </linearGradient>
                
                <linearGradient id="bodyGradient" x1="8" y1="12" x2="17" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                
                <linearGradient id="headGradient" x1="14" y1="7" x2="19" y2="11" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#6D28D9" />
                </linearGradient>
                
                <linearGradient id="tailGradient" x1="3" y1="16" x2="8" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                
                <linearGradient id="beakGradient" x1="17" y1="9" x2="19.5" y2="10.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFAA00" />
                  <stop offset="1" stopColor="#FF7700" />
                </linearGradient>
                
                <linearGradient id="crestGradient" x1="15" y1="4" x2="18" y2="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C4B5FD" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
                
                <linearGradient id="detailGradient" x1="9" y1="12" x2="15" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818CF8" />
                  <stop offset="1" stopColor="#4F46E5" />
                </linearGradient>
                
                <radialGradient id="bodyFillGradient" cx="13" cy="13" r="5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4C1D95" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#2E1065" stopOpacity="0.2" />
                </radialGradient>
                
                <radialGradient id="headFillGradient" cx="17" cy="9" r="2" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5B21B6" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#4C1D95" stopOpacity="0.3" />
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
