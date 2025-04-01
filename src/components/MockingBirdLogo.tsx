
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

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Animated logo background */}
        <motion.div 
          className={`absolute inset-0 rounded-full blur-lg ${sizeClasses[size]}`}
          style={{ 
            background: "radial-gradient(circle, rgba(138,58,226,0.8) 0%, rgba(86,91,245,0.6) 100%)" 
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Logo container */}
        <div className={`relative ${sizeClasses[size]} bg-gradient-to-b from-indigo-600 to-purple-700 rounded-full p-0.5 shadow-lg shadow-primary/20 border border-primary/30`}>
          <div className="w-full h-full bg-background/90 rounded-full flex items-center justify-center overflow-hidden">
            {/* Mechanical Bird Logo */}
            <motion.svg 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              {/* Background perch */}
              <motion.path
                d="M20 75 L80 75 Q85 75 85 70 L85 65 Q85 60 80 60 L20 60 Q15 60 15 65 L15 70 Q15 75 20 75 Z"
                fill="url(#perchGradient)"
                stroke="#6B21A8"
                strokeWidth="1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />
              
              {/* Mechanical gear decorations */}
              <motion.circle
                cx="25"
                cy="63"
                r="3"
                fill="url(#gearGradient)"
                stroke="#6B21A8"
                strokeWidth="0.5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.circle
                cx="75"
                cy="63"
                r="3"
                fill="url(#gearGradient)"
                stroke="#6B21A8"
                strokeWidth="0.5"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Bird body */}
              <motion.path
                d="M50 55 Q55 53 58 45 Q64 40 62 34 Q60 30 56 30 Q52 30 50 33 Q48 30 44 30 Q40 30 38 34 Q36 40 42 45 Q45 53 50 55 Z"
                fill="url(#bodyGradient)"
                stroke="#7C3AED"
                strokeWidth="1.2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              
              {/* Bird head */}
              <motion.path
                d="M50 33 Q52 25 56 24 Q60 23 62 28 Q63 32 60 34 Q56 36 50 33 Z"
                fill="url(#headGradient)"
                stroke="#7C3AED"
                strokeWidth="1.2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              
              {/* Bird eye */}
              <motion.circle
                cx="58"
                cy="28"
                r="1.5"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              
              <motion.circle
                cx="58"
                cy="28"
                r="0.7"
                fill="#111111"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              
              {/* Beak */}
              <motion.path
                d="M62 28 L68 29 L64 32 L62 28 Z"
                fill="#FF8A00"
                stroke="#7C3AED"
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              
              {/* Left wing */}
              <motion.path
                d="M44 30 Q38 24 28 26 Q20 28 18 35 Q17 42 25 45 Q34 47 42 45"
                fill="url(#wingGradient)"
                stroke="#7C3AED"
                strokeWidth="1"
                initial={{ rotate: 15, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              
              {/* Right wing */}
              <motion.path
                d="M56 30 Q62 24 72 26 Q80 28 82 35 Q83 42 75 45 Q66 47 58 45"
                fill="url(#wingGradient)"
                stroke="#7C3AED"
                strokeWidth="1"
                initial={{ rotate: -15, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              
              {/* Wing details - mechanical pattern left */}
              <motion.path
                d="M30 28 L42 33 M28 32 L40 35 M26 36 L38 38"
                stroke="#9F7AEA"
                strokeWidth="0.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 1.2, delay: 0.7 }}
              />
              
              {/* Wing details - mechanical pattern right */}
              <motion.path
                d="M70 28 L58 33 M72 32 L60 35 M74 36 L62 38"
                stroke="#9F7AEA"
                strokeWidth="0.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 1.2, delay: 0.7 }}
              />
              
              {/* Gear decorations on wings */}
              <motion.circle
                cx="28"
                cy="30"
                r="2"
                fill="url(#smallGearGradient)"
                stroke="#6B21A8"
                strokeWidth="0.5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.circle
                cx="72"
                cy="30"
                r="2"
                fill="url(#smallGearGradient)"
                stroke="#6B21A8"
                strokeWidth="0.5"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Tail feathers */}
              <motion.path
                d="M50 55 Q48 60 45 62 M50 55 Q50 61 50 65 M50 55 Q52 60 55 62"
                stroke="#9F7AEA"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
              
              {/* Bird legs */}
              <motion.path
                d="M45 55 L40 63 M55 55 L60 63"
                stroke="#9F7AEA"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              
              {/* Bird feet */}
              <motion.path
                d="M40 63 L38 63 M40 63 L40 65 M40 63 L42 63"
                stroke="#9F7AEA"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
              
              <motion.path
                d="M60 63 L58 63 M60 63 L60 65 M60 63 L62 63"
                stroke="#9F7AEA"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
              
              {/* Decorative glow */}
              <motion.path
                d="M50 26 L50 22"
                stroke="white"
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              {/* Gradients */}
              <defs>
                <linearGradient id="bodyGradient" x1="38" y1="30" x2="62" y2="55" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9F7AEA" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                
                <linearGradient id="headGradient" x1="50" y1="24" x2="62" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
                
                <linearGradient id="wingGradient" x1="18" y1="26" x2="82" y2="45" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C4B5FD" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
                
                <linearGradient id="perchGradient" x1="15" y1="60" x2="85" y2="75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6B21A8" />
                  <stop offset="1" stopColor="#4C1D95" />
                </linearGradient>
                
                <linearGradient id="gearGradient" x1="22" y1="60" x2="28" y2="66" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9F7AEA" />
                  <stop offset="1" stopColor="#6D28D9" />
                </linearGradient>
                
                <linearGradient id="smallGearGradient" x1="26" y1="28" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9F7AEA" />
                  <stop offset="1" stopColor="#6D28D9" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
        </div>
        
        {/* Spark effects */}
        <motion.span 
          className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-blue-400"
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
          className="absolute bottom-0 -left-0.5 h-1 w-1 rounded-full bg-purple-400"
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
