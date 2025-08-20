import React from 'react';

interface LogoIconProps {
  className?: string;
  variant?: 'default' | 'colorful' | 'white';
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = "w-8 h-8", variant = 'default' }) => {
  const getColors = () => {
    switch (variant) {
      case 'colorful':
        return {
          column: '#333333',
          swoosh: 'url(#brandGradient)'
        };
      case 'white':
        return {
          column: '#ffffff',
          swoosh: '#ffffff'
        };
      default:
        return {
          column: 'currentColor',
          swoosh: 'currentColor'
        };
    }
  };

  const colors = getColors();

  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(25, 95%, 53%)" />
          <stop offset="50%" stopColor="hsl(8, 86%, 59%)" />
          <stop offset="100%" stopColor="hsl(207, 90%, 54%)" />
        </linearGradient>
      </defs>
      
      {/* Classical Columns */}
      <g fill={colors.column}>
        {/* Column Base */}
        <rect x="15" y="75" width="70" height="8" rx="2"/>
        
        {/* Column Capitals */}
        <rect x="12" y="20" width="76" height="6" rx="3"/>
        <rect x="14" y="26" width="72" height="4" rx="2"/>
        
        {/* Column Shafts */}
        <rect x="20" y="30" width="8" height="45"/>
        <rect x="32" y="30" width="8" height="45"/>
        <rect x="44" y="30" width="8" height="45"/>
        <rect x="56" y="30" width="8" height="45"/>
        <rect x="68" y="30" width="8" height="45"/>
      </g>
      
      {/* Nike-style Swoosh */}
      <path
        d="M10 85 Q25 70 45 75 Q65 80 90 70"
        stroke={colors.swoosh}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LogoIcon;