import { useEffect, useState } from 'react';

/**
 * Hook para otimizações específicas de mobile
 * Melhora performance em dispositivos móveis
 */
export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Detectar se é mobile
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // Detectar conexão lenta
    const checkConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const slowConnection = connection.effectiveType === 'slow-2g' || 
                              connection.effectiveType === '2g' ||
                              connection.saveData === true;
        setIsSlowConnection(slowConnection);
      }
    };

    checkMobile();
    checkConnection();

    // Listener para mudanças de tamanho
    window.addEventListener('resize', checkMobile);
    
    // Listener para mudanças de conexão
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', checkConnection);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener('change', checkConnection);
      }
    };
  }, []);

  // Preload de recursos críticos para mobile
  const preloadCriticalResources = () => {
    if (isMobile) {
      // Preload de fontes críticas
      const fontPreload = document.createElement('link');
      fontPreload.rel = 'preload';
      fontPreload.href = '/assets/fonts/SIFONN_PRO.otf';
      fontPreload.as = 'font';
      fontPreload.type = 'font/otf';
      fontPreload.crossOrigin = 'anonymous';
      document.head.appendChild(fontPreload);

      // Preload de imagem hero
      const imagePreload = document.createElement('link');
      imagePreload.rel = 'preload';
      imagePreload.href = '/assets/hero-diplomatic.jpg';
      imagePreload.as = 'image';
      imagePreload.setAttribute('fetchpriority', 'high');
      document.head.appendChild(imagePreload);
    }
  };

  // Otimizar carregamento de imagens para conexões lentas
  const optimizeForSlowConnection = () => {
    if (isSlowConnection) {
      // Reduzir qualidade de imagens
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.src.includes('?')) {
          img.src = img.src.replace(/quality=\d+/, 'quality=60');
        } else {
          img.src += '?quality=60';
        }
      });
    }
  };

  // Lazy load de componentes não críticos
  const lazyLoadNonCriticalComponents = () => {
    if (isMobile) {
      // Adiar carregamento de componentes não críticos
      setTimeout(() => {
        // Carregar componentes secundários após 2 segundos
        const nonCriticalElements = document.querySelectorAll('[data-lazy-load]');
        nonCriticalElements.forEach(element => {
          element.classList.add('loaded');
        });
      }, 2000);
    }
  };

  // Otimizar animações para mobile
  const optimizeAnimations = () => {
    if (isMobile || isSlowConnection) {
      // Reduzir animações em dispositivos móveis ou conexões lentas
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
      document.documentElement.style.setProperty('--transition-duration', '0.2s');
    }
  };

  // Aplicar otimizações
  useEffect(() => {
    preloadCriticalResources();
    optimizeForSlowConnection();
    lazyLoadNonCriticalComponents();
    optimizeAnimations();
  }, [isMobile, isSlowConnection]);

  return {
    isMobile,
    isSlowConnection,
    preloadCriticalResources,
    optimizeForSlowConnection,
    lazyLoadNonCriticalComponents,
    optimizeAnimations,
  };
};

/**
 * Hook para otimizar renderização em mobile
 */
export const useMobileRenderOptimization = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Usar requestIdleCallback para renderizar quando o navegador estiver livre
    const scheduleRender = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setShouldRender(true);
        });
      } else {
        // Fallback para navegadores que não suportam requestIdleCallback
        setTimeout(() => {
          setShouldRender(true);
        }, 100);
      }
    };

    scheduleRender();
  }, []);

  return shouldRender;
};

/**
 * Hook para otimizar carregamento de dados
 */
export const useMobileDataOptimization = () => {
  const [isDataOptimized, setIsDataOptimized] = useState(false);

  useEffect(() => {
    // Verificar se o usuário tem economia de dados ativada
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.saveData) {
        setIsDataOptimized(true);
      }
    }

    // Verificar se é uma conexão lenta
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const slowConnection = connection.effectiveType === 'slow-2g' || 
                            connection.effectiveType === '2g';
      if (slowConnection) {
        setIsDataOptimized(true);
      }
    }
  }, []);

  // Função para obter configurações otimizadas
  const getOptimizedConfig = (defaultConfig: any) => {
    if (isDataOptimized) {
      return {
        ...defaultConfig,
        quality: Math.min(defaultConfig.quality || 80, 60),
        lazy: true,
        preload: false,
        animations: false,
      };
    }
    return defaultConfig;
  };

  return {
    isDataOptimized,
    getOptimizedConfig,
  };
};
