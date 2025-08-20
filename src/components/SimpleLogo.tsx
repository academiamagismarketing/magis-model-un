import React from 'react';
import imagotipoLogo from '@/assets/logo/IMAGOTIPO - ACADEMIA MAGIS.png';
import tipograficaLogo from '@/assets/logo/TIPOGRAFICA - ACADEMIA MAGIS.png';
import logoPretaSvg from '@/assets/logo/LOGO PRETA - ACADEMIA MAGIS.svg';
import logoPretaPng from '@/assets/logo/logo_preta.png';
import logoMagis from '@/assets/logo/logo_magis.svg';
import logoMagisOptimized from '@/assets/logo/logo_magis_optimized.svg';

interface SimpleLogoProps {
  type?: 'imagotipo' | 'logo-preta' | 'logo-preta-png' | 'tipografica' | 'logo_magis' | 'logo_magis_optimized';
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
        return 'w-10 h-10';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getImagePath = () => {
    switch (type) {
      case 'imagotipo':
        return imagotipoLogo;
      case 'tipografica':
        return tipograficaLogo;
      case 'logo-preta':
        return logoPretaSvg;
      case 'logo-preta-png':
        return logoPretaPng;
      case 'logo_magis':
        return logoMagis;
      default:
        return logoMagisOptimized;
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