
import React from "react";

interface MockingBirdIconProps {
  className?: string;
}

export const MockingBirdIcon: React.FC<MockingBirdIconProps> = ({ className = "h-6 w-6" }) => {
  return (
    <img 
      src="/lovable-uploads/512db5f9-bb7b-4e94-8096-626ab81c7d62.png" 
      alt="MockingBird Logo" 
      className={className}
    />
  );
};
