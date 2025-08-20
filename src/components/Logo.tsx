import React from 'react';
import LogoIcon from './LogoIcon';
import SimpleLogo from './SimpleLogo';

interface LogoProps {
  variant?: 'default' | 'colorful' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  logoType?: 'icon' | 'imagotipo' | 'logo-preta' | 'logo-preta-png' | 'tipografica' | 'logo_magis' | 'logo_magis_optimized';
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md', 
  showText = true,
  className = '',
  logoType = 'logo-preta-png'
}) => {
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return {
          icon: 'w-6 h-6',
          text: 'text-lg',
          container: 'gap-2'
        };
      case 'lg':
        return {
          icon: 'w-12 h-12',
          text: 'text-4xl',
          container: 'gap-4'
        };
      default:
        return {
          icon: 'w-8 h-8',
          text: 'text-2xl',
          container: 'gap-3'
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'white':
        return 'text-white';
      case 'colorful':
        return 'text-foreground';
      default:
        return 'text-primary';
    }
  };

  const sizes = getSizes();
  const textColor = getTextColor();

  // Se for uma das logos completas, usamos o componente SimpleLogo
  if (logoType !== 'icon') {
    return (
      <div className={`flex items-center ${className}`}>
        <SimpleLogo 
          type={logoType as any}
          size={size}
        />
      </div>
    );
  }

  // Para o ícone, mantemos o comportamento original
  return (
    <div className={`flex items-center ${sizes.container} ${className}`}>
      <LogoIcon 
        className={sizes.icon} 
        variant={variant}
      />
      {showText && (
        <div className={`font-display font-bold ${sizes.text} ${textColor}`}>
          ACADEMIA <span className="text-gradient-primary">MAGIS</span>
        </div>
      )}
    </div>
  );
};

export default Logo;