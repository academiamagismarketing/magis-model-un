// Configuração de Performance e Otimizações
export const performanceConfig = {
  // Configurações de CDN
  cdn: {
    enabled: true,
    baseUrl: 'https://cdn.academiamagis.com.br',
    domains: [
      'https://cdn1.academiamagis.com.br',
      'https://cdn2.academiamagis.com.br',
      'https://cdn3.academiamagis.com.br'
    ],
    // Assets que devem ser servidos via CDN
    assets: {
      images: '/assets/images',
      fonts: '/assets/fonts',
      css: '/assets/css',
      js: '/assets/js',
      media: '/assets/media'
    }
  },

  // Configurações de compressão
  compression: {
    gzip: {
      enabled: true,
      level: 6, // 0-9, 6 é um bom equilíbrio
      threshold: 1024, // Mínimo de bytes para comprimir
    },
    brotli: {
      enabled: true,
      level: 6, // 0-11, 6 é um bom equilíbrio
      threshold: 1024,
    }
  },

  // Configurações de cache
  cache: {
    // Cache do navegador
    browser: {
      static: {
        maxAge: 31536000, // 1 ano
        immutable: true,
      },
      dynamic: {
        maxAge: 86400, // 1 dia
        staleWhileRevalidate: 604800, // 1 semana
      }
    },
    // Cache do servidor
    server: {
      memory: {
        max: 100, // MB
        ttl: 3600000, // 1 hora
      },
      redis: {
        enabled: false,
        host: 'localhost',
        port: 6379,
        ttl: 3600, // 1 hora
      }
    }
  },

  // Configurações de imagens
  images: {
    formats: ['webp', 'avif', 'jpg', 'png'],
    quality: {
      webp: 80,
      avif: 75,
      jpg: 85,
      png: 90
    },
    sizes: {
      thumbnail: 150,
      small: 300,
      medium: 600,
      large: 1200,
      xlarge: 1920
    },
    lazyLoading: {
      enabled: true,
      threshold: 0.1,
      rootMargin: '50px'
    }
  },

  // Configurações de JavaScript
  javascript: {
    // Scripts críticos (carregamento síncrono)
    critical: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    // Scripts não críticos (carregamento assíncrono)
    nonCritical: [
      'analytics',
      'chat',
      'social-media'
    ],
    // Configurações de bundle
    bundle: {
      maxSize: 250, // KB
      chunks: {
        vendor: ['react', 'react-dom'],
        ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        utils: ['lucide-react', 'date-fns'],
        charts: ['recharts', 'd3']
      }
    }
  },

  // Configurações de CSS
  css: {
    // CSS crítico inline
    critical: {
      enabled: true,
      maxSize: 14, // KB
      selectors: [
        '.navbar',
        '.hero-section',
        '.btn-primary',
        '.container'
      ]
    },
    // Otimizações de CSS
    optimization: {
      minify: true,
      autoprefixer: true,
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          colormin: true,
          minifyFontValues: true,
          minifySelectors: true
        }]
      }
    }
  },

  // Configurações de fontes
  fonts: {
    preload: {
      enabled: true,
      fonts: [
        {
          family: 'Montserrat',
          weight: 400,
          style: 'normal',
          display: 'swap'
        },
        {
          family: 'SIFONN_PRO',
          weight: 400,
          style: 'normal',
          display: 'swap'
        }
      ]
    },
    // Fallback de fontes
    fallbacks: {
      'Montserrat': 'Arial, sans-serif',
      'SIFONN_PRO': 'Georgia, serif'
    }
  },

  // Configurações de monitoramento
  monitoring: {
    // Core Web Vitals
    coreWebVitals: {
      lcp: 2500, // ms
      fid: 100,  // ms
      cls: 0.1
    },
    // Métricas de performance
    performance: {
      fcp: 1800,  // ms
      tti: 3800,  // ms
      tbt: 200    // ms
    },
    // Alertas
    alerts: {
      enabled: true,
      thresholds: {
        lcp: 4000,
        fid: 300,
        cls: 0.25
      }
    }
  },

  // Configurações de Service Worker
  serviceWorker: {
    enabled: true,
    scope: '/',
    // Estratégias de cache
    strategies: {
      // Cache First para assets estáticos
      static: {
        strategy: 'CacheFirst',
        cacheName: 'static-assets',
        maxEntries: 100,
        maxAgeSeconds: 31536000 // 1 ano
      },
      // Network First para API calls
      api: {
        strategy: 'NetworkFirst',
        cacheName: 'api-cache',
        maxEntries: 50,
        maxAgeSeconds: 300 // 5 minutos
      },
      // Stale While Revalidate para páginas
      pages: {
        strategy: 'StaleWhileRevalidate',
        cacheName: 'pages-cache',
        maxEntries: 20,
        maxAgeSeconds: 86400 // 1 dia
      }
    }
  },

  // Configurações de HTTP/2
  http2: {
    enabled: true,
    push: {
      enabled: true,
      resources: [
        '/assets/css/index.css',
        '/assets/js/vendor.js',
        '/Montserrat-Regular.ttf'
      ]
    }
  }
};

// Funções de otimização
export const performanceUtils = {
  // Gerar URL de CDN
  getCdnUrl: (path: string, format?: string): string => {
    if (!performanceConfig.cdn.enabled) return path;
    
    const cdnDomain = performanceConfig.cdn.domains[
      Math.floor(Math.random() * performanceConfig.cdn.domains.length)
    ];
    
    if (format && path.includes('.')) {
      const ext = path.split('.').pop();
      if (ext && performanceConfig.images.formats.includes(ext)) {
        return `${cdnDomain}${path}?format=${format}`;
      }
    }
    
    return `${cdnDomain}${path}`;
  },

  // Verificar se o navegador suporta formatos modernos
  supportsModernFormats: (): { webp: boolean; avif: boolean } => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    return {
      webp: canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
      avif: canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
    };
  },

  // Lazy load de imagens
  lazyLoadImages: (): void => {
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
  },

  // Preload de recursos críticos
  preloadCriticalResources: (): void => {
    const resources = [
      { href: '/assets/css/index.css', as: 'style' },
      { href: '/Montserrat-Regular.ttf', as: 'font', type: 'font/ttf' },
      { href: '/assets/js/vendor.js', as: 'script' }
    ];

    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      document.head.appendChild(link);
    });
  }
};

export default performanceConfig;
