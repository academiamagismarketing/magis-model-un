import React from 'react';

interface SimpleLogoProps {
  type?: 'imagotipo' | 'logo-preta' | 'tipografica' | 'logo_magis' | 'logo_magis_optimized';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SimpleLogo: React.FC<SimpleLogoProps> = ({ 
  type = 'logo_magis_optimized', 
  size = 'md', 
  className = '' 
}) => {
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return 'w-16 h-16';
      case 'lg':
        return 'w-32 h-32';
      default:
        return 'w-24 h-24';
    }
  };

  const getImagePath = () => {
    switch (type) {
      case 'imagotipo':
        return '/src/assets/logo/IMAGOTIPO - ACADEMIA MAGIS.png';
      case 'tipografica':
        return '/src/assets/logo/TIPOGRAFICA - ACADEMIA MAGIS.png';
      case 'logo-preta':
        return '/src/assets/logo/LOGO PRETA - ACADEMIA MAGIS.svg';
      case 'logo_magis':
        return '/src/assets/logo/logo_magis.svg';
      default:
        return '/src/assets/logo/logo_magis_optimized.svg';
    }
  };

  const sizes = getSizes();
  const imagePath = getImagePath();

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={imagePath} 
        alt={`Logo Academia Magis - ${type}`} 
        className={`${sizes} object-contain`}
      />
    </div>
  );
};

export default SimpleLogo;