/**
 * Utilitários para otimização de imagens
 * Gerencia conversão de formatos e redimensionamento
 */

export interface ImageOptimizationConfig {
  quality: number;
  formats: ('avif' | 'webp' | 'jpeg' | 'png')[];
  sizes: number[];
  maxWidth: number;
  maxHeight: number;
}

export const defaultImageConfig: ImageOptimizationConfig = {
  quality: 80,
  formats: ['avif', 'webp', 'jpeg'],
  sizes: [320, 640, 768, 1024, 1280, 1920],
  maxWidth: 1920,
  maxHeight: 1080,
};

/**
 * Configurações específicas para diferentes tipos de imagem
 */
export const imageConfigs = {
  hero: {
    quality: 85,
    formats: ['avif', 'webp', 'jpeg'] as const,
    sizes: [768, 1024, 1280, 1920] as const,
    maxWidth: 1920,
    maxHeight: 1080,
  },
  logo: {
    quality: 90,
    formats: ['avif', 'webp', 'png'] as const,
    sizes: [64, 128, 256] as const,
    maxWidth: 512,
    maxHeight: 512,
  },
  patrocinador: {
    quality: 85,
    formats: ['avif', 'webp', 'png'] as const,
    sizes: [64, 128, 256] as const,
    maxWidth: 512,
    maxHeight: 512,
  },
  gallery: {
    quality: 80,
    formats: ['avif', 'webp', 'jpeg'] as const,
    sizes: [320, 640, 768, 1024] as const,
    maxWidth: 1024,
    maxHeight: 768,
  },
};

/**
 * Gerar srcSet para diferentes tamanhos
 */
export const generateSrcSet = (
  baseSrc: string,
  sizes: number[],
  format: string = 'webp'
): string => {
  return sizes
    .map(size => `${baseSrc}?w=${size}&f=${format} ${size}w`)
    .join(', ');
};

/**
 * Gerar múltiplos srcSets para picture element
 */
export const generatePictureSrcSets = (
  baseSrc: string,
  config: ImageOptimizationConfig
) => {
  const result: Record<string, string> = {};
  
  config.formats.forEach(format => {
    result[format] = generateSrcSet(baseSrc, config.sizes, format);
  });
  
  return result;
};

/**
 * Calcular dimensões otimizadas mantendo aspect ratio
 */
export const calculateOptimalDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
) => {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = originalWidth;
  let height = originalHeight;

  // Reduzir largura se necessário
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  // Reduzir altura se necessário
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};

/**
 * Gerar blur placeholder base64
 */
export const generateBlurPlaceholder = (
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string => {
  // Criar um canvas para gerar o placeholder
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  canvas.width = width;
  canvas.height = height;

  // Preencher com cor sólida
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Detectar se é uma imagem externa (URL)
 */
export const isExternalImage = (src: string): boolean => {
  return src.startsWith('http://') || src.startsWith('https://');
};

/**
 * Gerar URL otimizada para imagens externas (Supabase)
 */
export const optimizeExternalImageUrl = (
  url: string,
  width?: number,
  height?: number,
  quality: number = 80
): string => {
  if (!isExternalImage(url)) return url;

  const urlObj = new URL(url);
  
  // Parâmetros de otimização para Supabase Storage
  const params = new URLSearchParams();
  
  if (width) params.set('width', width.toString());
  if (height) params.set('height', height.toString());
  params.set('quality', quality.toString());
  params.set('format', 'webp');
  
  // Adicionar parâmetros à URL
  urlObj.search = params.toString();
  
  return urlObj.toString();
};

/**
 * Hook para preload de imagens críticas
 */
export const preloadCriticalImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.setAttribute('fetchpriority', 'high');
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload: ${url}`));
      
      document.head.appendChild(link);
    });
  });

  return Promise.all(promises);
};

/**
 * Configurações de lazy loading
 */
export const lazyLoadingConfig = {
  rootMargin: '50px',
  threshold: 0.1,
  placeholder: {
    width: 10,
    height: 10,
    color: '#f3f4f6',
  },
};

/**
 * Formatos de imagem suportados pelo navegador
 */
export const getSupportedFormats = (): string[] => {
  const formats = ['jpeg', 'png'];
  
  // Verificar suporte a WebP
  const webpSupported = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
  
  if (webpSupported) formats.unshift('webp');
  
  // Verificar suporte a AVIF
  const avifSupported = document.createElement('canvas')
    .toDataURL('image/avif')
    .indexOf('data:image/avif') === 0;
  
  if (avifSupported) formats.unshift('avif');
  
  return formats;
};
