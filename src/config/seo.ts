// ===== CONFIGURAÇÃO DE SEO PARA ACADEMIA MAGIS =====

export const seoConfig = {
  // Configurações básicas do site
  site: {
    name: 'Academia MAGIS',
    title: 'Academia MAGIS - Simulações & Mentorias Acadêmicas',
    description: 'Portal de referência nacional sobre simulações acadêmicas, mentorias educacionais e atividades MUN. Descubra como participar de simulações diplomáticas e desenvolver habilidades internacionais.',
    url: 'https://academiamagis.com.br',
    language: 'pt-BR',
    locale: 'pt_BR',
    type: 'website'
  },

  // Palavras-chave principais para ranqueamento
  keywords: {
    primary: [
      'simulações acadêmicas',
      'mentorias educacionais',
      'MUN',
      'Model United Nations',
      'diplomacia',
      'relações internacionais',
      'atividades extracurriculares',
      'educação superior',
      'simulações diplomáticas',
      'conferências acadêmicas'
    ],
    secondary: [
      'academia MAGIS',
      'simulações ONU',
      'mentorias universitárias',
      'programas educacionais',
      'desenvolvimento de liderança',
      'habilidades diplomáticas',
      'negociação internacional',
      'política externa',
      'cooperação internacional',
      'desenvolvimento sustentável'
    ],
    longTail: [
      'como participar de simulações acadêmicas',
      'mentorias para estudantes de relações internacionais',
      'MUN Brasil simulações',
      'simulações diplomáticas para jovens',
      'atividades extracurriculares universitárias',
      'desenvolvimento de habilidades diplomáticas',
      'simulações ONU no Brasil',
      'mentorias educacionais internacionais',
      'programas de liderança acadêmica',
      'simulações de política externa'
    ]
  },

  // Estrutura de URLs otimizada para SEO
  urls: {
    home: '/',
    about: '/sobre',
    services: '/servicos',
    publications: '/publicacoes',
    events: '/eventos',
    products: '/produtos',
    contact: '/contato',
    blog: '/publicacoes',
    categories: {
      mun: '/publicacoes?categoria=MUN',
      diplomacy: '/publicacoes?categoria=Diplomacia',
      international: '/publicacoes?categoria=Relações%20Internacionais',
      mentoring: '/publicacoes?categoria=Mentoria',
      simulations: '/publicacoes?categoria=Simulações'
    }
  },

  // Meta tags específicas para cada página
  pages: {
    home: {
      title: 'Academia MAGIS - Simulações & Mentorias Acadêmicas | Portal de Referência Nacional',
      description: 'Descubra como participar de simulações acadêmicas, mentorias educacionais e atividades MUN. Portal de referência nacional sobre diplomacia e relações internacionais.',
      keywords: 'simulações acadêmicas, mentorias educacionais, MUN, diplomacia, relações internacionais, academia MAGIS'
    },
    publications: {
      title: 'Publicações Acadêmicas | Simulações, Mentorias e MUN | Academia MAGIS',
      description: 'Artigos especializados sobre simulações acadêmicas, mentorias educacionais e atividades MUN. Conteúdo de autoridade para estudantes e educadores.',
      keywords: 'publicações acadêmicas, artigos MUN, simulações diplomáticas, mentorias educacionais, conteúdo acadêmico'
    },
    about: {
      title: 'Sobre a Academia MAGIS | Simulações e Mentorias Acadêmicas',
      description: 'Conheça a Academia MAGIS, instituição de referência em simulações acadêmicas e mentorias educacionais no Brasil.',
      keywords: 'sobre academia MAGIS, história, missão, valores, simulações acadêmicas'
    },
    contact: {
      title: 'Contato | Academia MAGIS - Simulações & Mentorias',
      description: 'Entre em contato com a Academia MAGIS para informações sobre simulações acadêmicas, mentorias e atividades MUN.',
      keywords: 'contato academia MAGIS, informações, simulações acadêmicas, mentorias'
    }
  },

  // Schema.org structured data
  schema: {
    organization: {
      "@type": "EducationalOrganization",
      "name": "Academia MAGIS",
      "description": "Instituição de referência em simulações acadêmicas e mentorias educacionais",
      "url": "https://academiamagis.com.br",
      "logo": "https://academiamagis.com.br/logo.png",
      "sameAs": [
        "https://www.facebook.com/academiamagis",
        "https://www.instagram.com/academiamagis",
        "https://www.linkedin.com/company/academiamagis"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BR",
        "addressLocality": "São Paulo",
        "addressRegion": "SP"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contato@academiamagis.com.br"
      },
      "areaServed": "BR",
      "serviceType": [
        "Simulações acadêmicas",
        "Mentorias educacionais",
        "Atividades MUN",
        "Programas de liderança"
      ]
    },
    website: {
      "@type": "WebSite",
      "name": "Academia MAGIS",
      "url": "https://academiamagis.com.br",
      "description": "Portal de referência nacional sobre simulações acadêmicas e mentorias educacionais",
      "publisher": {
        "@type": "Organization",
        "name": "Academia MAGIS"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://academiamagis.com.br/publicacoes?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },

  // Configurações de Open Graph
  openGraph: {
    siteName: 'Academia MAGIS',
    locale: 'pt_BR',
    type: 'website',
    images: {
      default: '/og-image.jpg',
      width: 1200,
      height: 630
    }
  },

  // Configurações de Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@academiamagis',
    creator: '@academiamagis'
  },

  // Configurações de performance
  performance: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ],
    dnsPrefetch: [
      'https://academiamagis.com.br',
      'https://fonts.googleapis.com'
    ]
  }
};

// Função para gerar meta tags dinâmicas
export const generateMetaTags = (page: keyof typeof seoConfig.pages, customData?: any) => {
  const baseMeta = seoConfig.pages[page];
  
  if (customData) {
    return {
      ...baseMeta,
      ...customData,
      title: customData.title ? `${customData.title} | ${seoConfig.site.name}` : baseMeta.title,
      description: customData.description || baseMeta.description,
      keywords: customData.keywords ? `${baseMeta.keywords}, ${customData.keywords}` : baseMeta.keywords
    };
  }
  
  return baseMeta;
};

// Função para gerar URLs canônicas
export const generateCanonicalUrl = (path: string) => {
  return `${seoConfig.site.url}${path}`;
};

// Função para gerar sitemap URLs
export const generateSitemapUrls = () => {
  const urls = [
    { url: seoConfig.urls.home, priority: 1.0, changefreq: 'daily' },
    { url: seoConfig.urls.about, priority: 0.8, changefreq: 'monthly' },
    { url: seoConfig.urls.publications, priority: 0.9, changefreq: 'daily' },
    { url: seoConfig.urls.events, priority: 0.8, changefreq: 'weekly' },
    { url: seoConfig.urls.contact, priority: 0.7, changefreq: 'monthly' }
  ];
  
  return urls;
};
