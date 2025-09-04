import { useEffect, useCallback } from 'react';

// Hook para otimizações de performance
export const usePerformance = () => {
  // Otimização de imagens
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }, []);

  // Prefetch de rotas
  const prefetchRoutes = useCallback(() => {
    const routes = ['/sobre', '/eventos', '/publicacoes', '/contato'];
    
    routes.forEach((route) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, []);

  // Otimização de scroll
  const optimizeScroll = useCallback(() => {
    let ticking = false;
    
    const updateScroll = () => {
      // Implementar otimizações de scroll aqui
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, []);

  // Monitoramento de performance
  const monitorPerformance = useCallback(() => {
    if ('performance' in window) {
      // Monitorar Core Web Vitals
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
              }
              if (entry.entryType === 'first-input') {
                console.log('FID:', entry.processingStart - entry.startTime);
              }
            }
          });
          
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        } catch (e) {
          console.warn('PerformanceObserver não suportado');
        }
      }

      // Monitorar tempo de carregamento
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log('Tempo total de carregamento:', navigation.loadEventEnd - navigation.navigationStart);
          console.log('Tempo até DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.navigationStart);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Aplicar otimizações quando o componente montar
    optimizeImages();
    prefetchRoutes();
    
    const cleanupScroll = optimizeScroll();
    monitorPerformance();

    return () => {
      cleanupScroll();
    };
  }, [optimizeImages, prefetchRoutes, optimizeScroll, monitorPerformance]);

  return {
    optimizeImages,
    prefetchRoutes,
    optimizeScroll,
    monitorPerformance,
  };
};

export default usePerformance;
