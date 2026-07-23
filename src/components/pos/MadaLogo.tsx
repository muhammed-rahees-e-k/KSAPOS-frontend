import React from 'react';

interface MadaLogoProps {
  className?: string;
  lightText?: boolean;
}

export const MadaLogo: React.FC<MadaLogoProps> = ({ className = 'h-5 w-auto', lightText = true }) => {
  const textColor = lightText ? '#FFFFFF' : '#000000';

  return (
    <svg 
      viewBox="0 0 120 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Blue Top Bar */}
      <rect x="0" y="4" width="36" height="14" rx="1.5" fill="#0096D6" />
      {/* Green Bottom Bar */}
      <rect x="0" y="22" width="36" height="14" rx="1.5" fill="#7AB800" />
      
      {/* Arabic مدى Text */}
      <text 
        x="44" 
        y="16" 
        fill={textColor} 
        fontSize="15" 
        fontWeight="900" 
        fontFamily="sans-serif"
        letterSpacing="-0.5"
      >
        مدى
      </text>
      
      {/* English mada Text */}
      <text 
        x="44" 
        y="33" 
        fill={textColor} 
        fontSize="15" 
        fontWeight="900" 
        fontFamily="sans-serif"
        letterSpacing="-0.5"
      >
        mada
      </text>
    </svg>
  );
};
