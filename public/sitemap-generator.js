/**
 * Gerador de Sitemap Dinâmico
 * Este script pode ser executado para atualizar o sitemap automaticamente
 */

// Configuração
const CONFIG = {
  baseUrl: 'https://academiamagis.com',
  sitemapPath: '/sitemap.xml',
  robotsPath: '/robots.txt',
};

// Páginas estáticas
const staticPages = [
  { loc: '/', priority: 1.0, changefreq: 'weekly' },
  { loc: '/sobre', priority: 0.8, changefreq: 'monthly' },
  { loc: '/eventos', priority: 0.9, changefreq: 'weekly' },
  { loc: '/produtos', priority: 0.8, changefreq: 'weekly' },
  { loc: '/blog', priority: 0.7, changefreq: 'weekly' },
  { loc: '/contato', priority: 0.6, changefreq: 'monthly' },
  { loc: '/equipe/diretoria', priority: 0.5, changefreq: 'monthly' },
  { loc: '/equipe/voluntarios', priority: 0.5, changefreq: 'monthly' },
  { loc: '/equipe/mentores', priority: 0.5, changefreq: 'monthly' },
  { loc: '/link', priority: 0.4, changefreq: 'monthly' },
];

// Categorias e tags
const categories = ['simulacoes', 'workshops', 'congressos'];
const tags = ['mun', 'diplomacia', 'onu', 'estudantes'];

/**
 * Gerar sitemap XML
 */
function generateSitemapXML() {
  const today = new Date().toISOString().split('T')[0];
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  const xmlFooter = `</urlset>`;

  // Páginas estáticas
  const staticUrls = staticPages.map(page => `  <url>
    <loc>${CONFIG.baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
  </url>`).join('\n');

  // Categorias
  const categoryUrls = categories.map(category => `  <url>
    <loc>${CONFIG.baseUrl}/categoria/${category}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
    <mobile:mobile/>
  </url>`).join('\n');

  // Tags
  const tagUrls = tags.map(tag => `  <url>
    <loc>${CONFIG.baseUrl}/tag/${tag}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
    <mobile:mobile/>
  </url>`).join('\n');

  // Páginas de exemplo para eventos, produtos e blog
  const exampleUrls = [
    // Eventos
    `  <url>
    <loc>${CONFIG.baseUrl}/eventos/mun-bh-2025</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <mobile:mobile/>
  </url>`,
    `  <url>
    <loc>${CONFIG.baseUrl}/eventos/workshop-diplomacia</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <mobile:mobile/>
  </url>`,
    // Produtos
    `  <url>
    <loc>${CONFIG.baseUrl}/produtos/pin-academia-magis</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
  </url>`,
    `  <url>
    <loc>${CONFIG.baseUrl}/produtos/kit-mun-completo</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
  </url>`,
    // Blog
    `  <url>
    <loc>${CONFIG.baseUrl}/blog/como-participar-de-uma-simulacao-mun</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
  </url>`,
    `  <url>
    <loc>${CONFIG.baseUrl}/blog/dicas-para-delegados-iniciantes</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
  </url>`,
    `  <url>
    <loc>${CONFIG.baseUrl}/blog/historia-das-simulacoes-onu</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
  </url>`,
  ].join('\n');

  return `${xmlHeader}\n${staticUrls}\n${categoryUrls}\n${tagUrls}\n${exampleUrls}\n${xmlFooter}`;
}

/**
 * Atualizar robots.txt
 */
function updateRobotsTxt() {
  const robotsContent = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

# Sitemap
Sitemap: ${CONFIG.baseUrl}${CONFIG.sitemapPath}`;

  return robotsContent;
}

/**
 * Executar geração do sitemap
 */
function generateSitemap() {
  try {
    const sitemapXML = generateSitemapXML();
    const robotsTxt = updateRobotsTxt();
    
    console.log('✅ Sitemap gerado com sucesso!');
    console.log(`📄 ${sitemapXML.split('<url>').length - 1} URLs incluídas`);
    console.log(`🔗 Base URL: ${CONFIG.baseUrl}`);
    console.log(`📅 Última atualização: ${new Date().toISOString()}`);
    
    return {
      sitemap: sitemapXML,
      robots: robotsTxt,
      urlCount: sitemapXML.split('<url>').length - 1,
      lastmod: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('❌ Erro ao gerar sitemap:', error);
    return null;
  }
}

// Exportar para uso em Node.js ou browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateSitemap,
    generateSitemapXML,
    updateRobotsTxt,
    CONFIG
  };
}

// Executar se chamado diretamente
if (typeof window === 'undefined' && require.main === module) {
  generateSitemap();
}
