// Configuração para monitoramento de métricas SEO
export const seoMonitoringConfig = {
  // Métricas Core Web Vitals
  coreWebVitals: {
    lcp: 2500, // Largest Contentful Paint (ms) - Meta: < 2.5s
    fid: 100,  // First Input Delay (ms) - Meta: < 100ms
    cls: 0.1,  // Cumulative Layout Shift - Meta: < 0.1
  },

  // Métricas de Performance
  performance: {
    fcp: 1800,  // First Contentful Paint (ms) - Meta: < 1.8s
    tti: 3800,  // Time to Interactive (ms) - Meta: < 3.8s
    tbt: 200,   // Total Blocking Time (ms) - Meta: < 200ms
  },

  // Métricas de SEO
  seo: {
    titleLength: { min: 30, max: 60 },
    descriptionLength: { min: 120, max: 160 },
    headingStructure: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    imageAlt: true,
    internalLinks: { min: 3 },
    externalLinks: { max: 10 },
  },

  // Métricas de Acessibilidade
  accessibility: {
    colorContrast: 4.5, // WCAG AA standard
    keyboardNavigation: true,
    screenReader: true,
    focusIndicators: true,
  },

  // Métricas de Mobile
  mobile: {
    viewport: true,
    touchTargets: { min: 44 }, // pixels
    fontScaling: true,
    responsiveImages: true,
  },

  // URLs para monitoramento
  urls: {
    home: '/',
    sobre: '/sobre',
    eventos: '/eventos',
    publicacoes: '/publicacoes',
    contato: '/contato',
    equipe: '/equipe',
  },

  // Palavras-chave principais para monitoramento
  keywords: [
    'simulações acadêmicas',
    'mentorias educacionais',
    'MUN',
    'Modelo das Nações Unidas',
    'diplomacia',
    'relações internacionais',
    'academia MAGIS',
    'workshops',
    'liderança acadêmica',
    'simulações ONU',
    'conferências acadêmicas',
    'eventos MUN',
    'diplomacia acadêmica',
    'negociação internacional',
    'política internacional',
    'geopolítica',
    'direito internacional',
    'organizações internacionais',
    'desenvolvimento de liderança',
    'habilidades diplomáticas'
  ],

  // Competidores para análise
  competitors: [
    'https://www.un.org/en/mun',
    'https://www.hmun.org',
    'https://www.nmun.org',
    'https://www.ymun.org',
    'https://www.bmun.org'
  ],

  // Ferramentas de monitoramento recomendadas
  tools: {
    google: [
      'Google Search Console',
      'Google Analytics 4',
      'Google PageSpeed Insights',
      'Google Mobile-Friendly Test'
    ],
    thirdParty: [
      'SEMrush',
      'Ahrefs',
      'Moz',
      'Screaming Frog',
      'GTmetrix',
      'Lighthouse'
    ]
  },

  // Checklist de SEO técnico
  technicalChecklist: [
    'Sitemap XML configurado',
    'Robots.txt otimizado',
    'Meta tags implementadas',
    'Schema.org markup',
    'Open Graph tags',
    'Twitter Cards',
    'Canonical URLs',
    'Breadcrumbs implementados',
    'URLs amigáveis',
    'HTTPS configurado',
    'Compressão GZIP',
    'Cache configurado',
    'CDN implementado',
    'Lazy loading de imagens',
    'Minificação de CSS/JS'
  ],

  // Métricas de conteúdo
  contentMetrics: {
    minWords: 300,
    maxWords: 2500,
    readabilityScore: 60, // Flesch Reading Ease
    keywordDensity: { min: 0.5, max: 2.5 }, // %
    internalLinking: { min: 2, max: 10 },
    imageOptimization: {
      format: ['webp', 'avif'],
      compression: 80,
      lazyLoading: true
    }
  },

  // Configurações de relatórios
  reporting: {
    frequency: 'monthly',
    metrics: [
      'organic_traffic',
      'keyword_rankings',
      'page_speed',
      'core_web_vitals',
      'mobile_usability',
      'indexing_status',
      'backlinks',
      'social_shares'
    ],
    alerts: {
      performance: true,
      indexing: true,
      mobile: true,
      security: true
    }
  }
};

// Funções de monitoramento
export const seoMonitoring = {
  // Verificar Core Web Vitals
  checkCoreWebVitals: (metrics: any) => {
    const results = {
      lcp: metrics.lcp <= seoMonitoringConfig.coreWebVitals.lcp,
      fid: metrics.fid <= seoMonitoringConfig.coreWebVitals.fid,
      cls: metrics.cls <= seoMonitoringConfig.coreWebVitals.cls
    };
    
    return {
      ...results,
      score: Object.values(results).filter(Boolean).length / 3 * 100
    };
  },

  // Verificar métricas de SEO
  checkSeoMetrics: (pageData: any) => {
    const results = {
      titleLength: pageData.title.length >= seoMonitoringConfig.seo.titleLength.min && 
                   pageData.title.length <= seoMonitoringConfig.seo.titleLength.max,
      descriptionLength: pageData.description.length >= seoMonitoringConfig.seo.descriptionLength.min && 
                         pageData.description.length <= seoMonitoringConfig.seo.descriptionLength.max,
      hasH1: pageData.headings.includes('h1'),
      hasImages: pageData.images > 0,
      hasInternalLinks: pageData.internalLinks >= seoMonitoringConfig.seo.internalLinks.min
    };

    return {
      ...results,
      score: Object.values(results).filter(Boolean).length / Object.keys(results).length * 100
    };
  },

  // Gerar relatório de SEO
  generateReport: (data: any) => {
    const coreWebVitals = seoMonitoring.checkCoreWebVitals(data.performance);
    const seoMetrics = seoMonitoring.checkSeoMetrics(data.seo);
    
    return {
      timestamp: new Date().toISOString(),
      url: data.url,
      overallScore: (coreWebVitals.score + seoMetrics.score) / 2,
      coreWebVitals,
      seoMetrics,
      recommendations: seoMonitoring.generateRecommendations(coreWebVitals, seoMetrics)
    };
  },

  // Gerar recomendações
  generateRecommendations: (coreWebVitals: any, seoMetrics: any) => {
    const recommendations = [];

    if (coreWebVitals.score < 80) {
      recommendations.push('Otimizar Core Web Vitals para melhorar experiência do usuário');
    }

    if (seoMetrics.score < 80) {
      recommendations.push('Revisar e otimizar meta tags e estrutura de conteúdo');
    }

    if (!coreWebVitals.lcp) {
      recommendations.push('Otimizar LCP (Largest Contentful Paint) para < 2.5s');
    }

    if (!coreWebVitals.fid) {
      recommendations.push('Reduzir FID (First Input Delay) para < 100ms');
    }

    if (!coreWebVitals.cls) {
      recommendations.push('Minimizar CLS (Cumulative Layout Shift) para < 0.1');
    }

    return recommendations;
  }
};

export default seoMonitoringConfig;
