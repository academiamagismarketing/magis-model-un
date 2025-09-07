import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  width?: number;
  height?: number;
  blur?: boolean;
}

/**
 * Hook para otimização de imagens
 * Gerencia cache, preload e otimização de imagens
 */
export const useImageOptimization = () => {
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map());
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  // Preload de imagens críticas
  const preloadImage = (src: string, priority: boolean = false): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (preloadedImages.has(src)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      
      if (priority) {
        link.setAttribute('fetchpriority', 'high');
      }

      link.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(src));
        resolve();
      };

      link.onerror = () => {
        reject(new Error(`Failed to preload image: ${src}`));
      };

      document.head.appendChild(link);
    });
  };

  // Gerar URL otimizada para imagens
  const getOptimizedImageUrl = (
    src: string, 
    options: ImageOptimizationOptions = {}
  ): string => {
    const {
      quality = 80,
      format = 'auto',
      width,
      height,
    } = options;

    // Para imagens externas (Supabase), retornar original
    if (src.startsWith('http')) {
      return src;
    }

    // Para imagens locais, aplicar otimizações
    const baseName = src.replace(/\.[^/.]+$/, '');
    const extension = src.split('.').pop();

    // Determinar formato baseado no suporte do navegador
    if (format === 'auto') {
      // Verificar suporte a AVIF
      if (typeof window !== 'undefined' && 'avif' in new Image()) {
        return `${baseName}.avif`;
      }
      // Verificar suporte a WebP
      if (typeof window !== 'undefined' && 'webp' in new Image()) {
        return `${baseName}.webp`;
      }
    } else if (format === 'avif') {
      return `${baseName}.avif`;
    } else if (format === 'webp') {
      return `${baseName}.webp`;
    }

    return src;
  };

  // Gerar múltiplas URLs para picture element
  const getResponsiveImageUrls = (src: string, sizes: number[] = []) => {
    const baseName = src.replace(/\.[^/.]+$/, '');
    
    return {
      avif: sizes.map(size => `${baseName}-${size}w.avif ${size}w`).join(', '),
      webp: sizes.map(size => `${baseName}-${size}w.webp ${size}w`).join(', '),
      fallback: sizes.map(size => `${baseName}-${size}w.jpg ${size}w`).join(', '),
    };
  };

  // Cache de imagens
  const cacheImage = (key: string, url: string) => {
    setImageCache(prev => new Map(prev).set(key, url));
  };

  const getCachedImage = (key: string): string | undefined => {
    return imageCache.get(key);
  };

  // Otimizar dimensões baseado no viewport
  const getOptimalDimensions = (
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ) => {
    const aspectRatio = originalWidth / originalHeight;
    
    let width = originalWidth;
    let height = originalHeight;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return {
      width: Math.round(width),
      height: Math.round(height),
    };
  };

  // Gerar blur placeholder
  const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '';

    canvas.width = width;
    canvas.height = height;

    // Criar gradiente simples para placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL('image/jpeg', 0.1);
  };

  return {
    preloadImage,
    getOptimizedImageUrl,
    getResponsiveImageUrls,
    cacheImage,
    getCachedImage,
    getOptimalDimensions,
    generateBlurDataURL,
    preloadedImages,
    imageCache,
  };
};

/**
 * Hook para detectar suporte a formatos de imagem
 */
export const useImageFormatSupport = () => {
  const [support, setSupport] = useState({
    avif: false,
    webp: false,
  });

  useEffect(() => {
    const checkSupport = async () => {
      // Verificar suporte a AVIF
      const avifSupported = await new Promise<boolean>((resolve) => {
        const avif = new Image();
        avif.onload = avif.onerror = () => resolve(avif.height === 2);
        avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEAwgMgkfAAAADHEAAAAA';
      });

      // Verificar suporte a WebP
      const webpSupported = await new Promise<boolean>((resolve) => {
        const webp = new Image();
        webp.onload = webp.onerror = () => resolve(webp.height === 2);
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      });

      setSupport({
        avif: avifSupported,
        webp: webpSupported,
      });
    };

    checkSupport();
  }, []);

  return support;
};
