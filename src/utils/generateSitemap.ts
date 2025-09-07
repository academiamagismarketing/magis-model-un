/**
 * Utilitário para gerar sitemap dinâmico
 * Baseado nas rotas do site e conteúdo do banco de dados
 */

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  mobile?: boolean;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultPriority: number;
  defaultChangefreq: 'weekly' | 'monthly' | 'daily';
}

const defaultConfig: SitemapConfig = {
  baseUrl: 'https://academiamagis.com',
  defaultPriority: 0.5,
  defaultChangefreq: 'weekly',
};

/**
 * Páginas estáticas do site
 */
const staticPages: SitemapUrl[] = [
  {
    loc: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
    mobile: true,
  },
  {
    loc: '/sobre',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
    mobile: true,
  },
  {
    loc: '/eventos',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
    mobile: true,
  },
  {
    loc: '/produtos',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8,
    mobile: true,
  },
  {
    loc: '/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.7,
    mobile: true,
  },
  {
    loc: '/contato',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6,
    mobile: true,
  },
  {
    loc: '/equipe/diretoria',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5,
    mobile: true,
  },
  {
    loc: '/equipe/voluntarios',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5,
    mobile: true,
  },
  {
    loc: '/equipe/mentores',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5,
    mobile: true,
  },
  {
    loc: '/link',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.4,
    mobile: true,
  },
];

/**
 * Gerar URLs para eventos
 */
export const generateEventUrls = (events: any[]): SitemapUrl[] => {
  return events.map(event => ({
    loc: `/eventos/${event.slug || event.id}`,
    lastmod: event.updated_at ? new Date(event.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    changefreq: 'monthly' as const,
    priority: 0.7,
    mobile: true,
  }));
};

/**
 * Gerar URLs para produtos
 */
export const generateProductUrls = (products: any[]): SitemapUrl[] => {
  return products.map(product => ({
    loc: `/produtos/${product.slug || product.id}`,
    lastmod: product.updated_at ? new Date(product.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    changefreq: 'monthly' as const,
    priority: 0.6,
    mobile: true,
  }));
};

/**
 * Gerar URLs para posts do blog
 */
export const generateBlogUrls = (posts: any[]): SitemapUrl[] => {
  return posts.map(post => ({
    loc: `/blog/${post.slug || post.id}`,
    lastmod: post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    changefreq: 'monthly' as const,
    priority: 0.6,
    mobile: true,
  }));
};

/**
 * Gerar URLs para categorias
 */
export const generateCategoryUrls = (categories: string[]): SitemapUrl[] => {
  return categories.map(category => ({
    loc: `/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly' as const,
    priority: 0.5,
    mobile: true,
  }));
};

/**
 * Gerar URLs para tags
 */
export const generateTagUrls = (tags: string[]): SitemapUrl[] => {
  return tags.map(tag => ({
    loc: `/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly' as const,
    priority: 0.4,
    mobile: true,
  }));
};

/**
 * Gerar sitemap XML
 */
export const generateSitemapXML = (
  events: any[] = [],
  products: any[] = [],
  blogPosts: any[] = [],
  categories: string[] = [],
  tags: string[] = [],
  config: SitemapConfig = defaultConfig
): string => {
  const allUrls: SitemapUrl[] = [
    ...staticPages,
    ...generateEventUrls(events),
    ...generateProductUrls(products),
    ...generateBlogUrls(blogPosts),
    ...generateCategoryUrls(categories),
    ...generateTagUrls(tags),
  ];

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  const xmlFooter = `</urlset>`;

  const urlEntries = allUrls.map(url => {
    const mobileTag = url.mobile ? '\n    <mobile:mobile/>' : '';
    return `  <url>
    <loc>${config.baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${mobileTag}
  </url>`;
  }).join('\n');

  return `${xmlHeader}\n${urlEntries}\n${xmlFooter}`;
};

/**
 * Salvar sitemap no servidor
 */
export const saveSitemap = async (
  sitemapContent: string,
  path: string = '/sitemap.xml'
): Promise<void> => {
  try {
    // Em um ambiente real, você salvaria o arquivo no servidor
    // Aqui é apenas um exemplo de como seria implementado
    console.log('Sitemap gerado:', sitemapContent.length, 'caracteres');
    console.log('Caminho:', path);
  } catch (error) {
    console.error('Erro ao salvar sitemap:', error);
  }
};

/**
 * Atualizar sitemap automaticamente
 */
export const updateSitemap = async (
  events: any[] = [],
  products: any[] = [],
  blogPosts: any[] = [],
  categories: string[] = ['simulacoes', 'workshops', 'congressos'],
  tags: string[] = ['mun', 'diplomacia', 'onu', 'estudantes']
): Promise<string> => {
  const sitemapXML = generateSitemapXML(events, products, blogPosts, categories, tags);
  await saveSitemap(sitemapXML);
  return sitemapXML;
};

/**
 * Validar sitemap
 */
export const validateSitemap = (sitemapXML: string): boolean => {
  try {
    // Validação básica do XML
    const parser = new DOMParser();
    const doc = parser.parseFromString(sitemapXML, 'application/xml');
    const parseError = doc.querySelector('parsererror');
    
    if (parseError) {
      console.error('Erro de parsing XML:', parseError.textContent);
      return false;
    }

    // Verificar se tem pelo menos uma URL
    const urls = doc.querySelectorAll('url');
    if (urls.length === 0) {
      console.error('Sitemap não contém URLs');
      return false;
    }

    console.log(`Sitemap válido com ${urls.length} URLs`);
    return true;
  } catch (error) {
    console.error('Erro ao validar sitemap:', error);
    return false;
  }
};
