import React, { useState, useRef, useEffect } from 'react';
import { 
  isExternalImage, 
  optimizeExternalImageUrl, 
  generateBlurPlaceholder,
  imageConfigs 
} from '../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Componente de imagem otimizada com suporte a:
 * - Lazy loading
 * - Múltiplos formatos (WebP, AVIF, fallback)
 * - Dimensões responsivas
 * - Placeholder blur
 * - Intersection Observer
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 80,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Gerar URLs para diferentes formatos
  const generateImageUrls = (baseSrc: string) => {
    if (isExternalImage(baseSrc)) {
      // Para imagens externas (Supabase), otimizar URL
      const optimizedUrl = optimizeExternalImageUrl(baseSrc, width, height, quality);
      return {
        avif: optimizedUrl,
        webp: optimizedUrl,
        fallback: baseSrc,
      };
    }

    // Para imagens locais, gerar URLs otimizadas
    const baseName = baseSrc.replace(/\.[^/.]+$/, '');
    const extension = baseSrc.split('.').pop();

    return {
      avif: `${baseName}.avif`,
      webp: `${baseName}.webp`,
      fallback: baseSrc,
    };
  };

  const imageUrls = generateImageUrls(src);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder blur
  const placeholderStyle = placeholder === 'blur' && blurDataURL ? {
    backgroundImage: `url(${blurDataURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px)',
  } : {};

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        ...placeholderStyle,
      }}
    >
      {isInView && (
        <picture>
          {/* AVIF - Melhor compressão */}
          <source
            srcSet={imageUrls.avif}
            type="image/avif"
            sizes={sizes}
          />
          
          {/* WebP - Boa compressão, amplo suporte */}
          <source
            srcSet={imageUrls.webp}
            type="image/webp"
            sizes={sizes}
          />
          
          {/* Fallback - Formato original */}
          <img
            src={imageUrls.fallback}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${hasError ? 'opacity-50' : ''}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </picture>
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Erro ao carregar imagem</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
